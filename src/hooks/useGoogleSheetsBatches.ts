import { useQuery } from "@tanstack/react-query";
import {
    GOOGLE_SHEETS_CSV_URL,
    workshopBatches,
    type WorkshopBatch,
    type MonthEntry,
} from "@/config/workshopData";

/**
 * Parses a CSV string into an array of string arrays.
 * Handles quoted fields containing commas.
 */
function parseCSV(csvText: string): string[][] {
    const lines = csvText.trim().split("\n");
    return lines.map((line) => {
        const fields: string[] = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === "," && !inQuotes) {
                fields.push(current.trim());
                current = "";
            } else {
                current += char;
            }
        }
        fields.push(current.trim());
        return fields;
    });
}

/**
 * Fetches batch data from a published Google Sheet CSV.
 *
 * Supported sheet columns (case-insensitive, flexible matching):
 *   Batch Number | Month (optional) | Date/Dates | Timings/Time | Place/Location | Batch Status/Status
 *
 * Sheet modes:
 *  - New format (one row per month): Month column present; each row = one MonthEntry.
 *  - Legacy format (one row per session date / no Month column): all rows for the same batch are
 *    collapsed into a single MonthEntry so the per-session-date rows don't each become a card.
 *
 * Batch-level status: Upcoming if ANY row is Upcoming; Completed only if ALL rows are Completed.
 *
 * Returns the last 2 completed batches + first 2 upcoming batches.
 */
async function fetchBatchesFromSheet(): Promise<WorkshopBatch[]> {
    if (!GOOGLE_SHEETS_CSV_URL) {
        return workshopBatches;
    }

    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
        throw new Error("Sheet has no data rows");
    }

    // ── Flexible column detection ─────────────────────────────────────────────
    const headers = rows[0].map((h) => h.toLowerCase().trim());

    // Batch Number: must contain "batch" and "number"
    const batchNumberIdx = headers.findIndex(
        (h) => h.includes("batch") && h.includes("number")
    );

    // Month: exact match
    const monthIdx = headers.findIndex((h) => h === "month");

    // Date/Dates
    const dateIdx = headers.findIndex((h) => h === "date" || h === "dates");

    // Time / Timings
    const timeIdx = headers.findIndex(
        (h) => h === "time" || h === "timings" || h === "timing"
    );

    // Place / Location
    const placeIdx = headers.findIndex(
        (h) => h === "place" || h === "location"
    );

    // Status: prefer "batch status", fall back to any column containing "status"
    let statusIdx = headers.findIndex(
        (h) => h.includes("batch") && h.includes("status")
    );
    if (statusIdx === -1) {
        statusIdx = headers.findIndex((h) => h.includes("status"));
    }

    if (batchNumberIdx === -1 || statusIdx === -1) {
        throw new Error(
            "Required columns not found. Need: Batch Number, and a Status column."
        );
    }

    // ── Sheet mode detection ──────────────────────────────────────────────────
    // If no "Month" column exists, the sheet uses the legacy one-row-per-date format.
    // In this mode we collapse all rows of the same batch into one MonthEntry.
    const hasMonthColumn = monthIdx !== -1;

    // ── Group rows by batch number ────────────────────────────────────────────
    const batchMap = new Map<
        string,
        {
            name: string;
            monthEntries: MonthEntry[];
            // Legacy mode: aggregate fields for the single collapsed entry
            legacyDates: string[];
            legacyTime: string;
            legacyLocation: string;
            legacyStatuses: ("Completed" | "Upcoming")[];
        }
    >();

    const dataRows = rows.slice(1);
    for (const row of dataRows) {
        const batchName = row[batchNumberIdx]?.trim();
        if (!batchName) continue;

        const month = hasMonthColumn && monthIdx !== -1 ? row[monthIdx]?.trim() ?? "" : "";
        const dates = dateIdx !== -1 ? row[dateIdx]?.trim() ?? "" : "";
        const time = timeIdx !== -1 ? row[timeIdx]?.trim() ?? "" : "";
        const location = placeIdx !== -1 ? row[placeIdx]?.trim() ?? "" : "";
        const rawStatus = row[statusIdx]?.trim().toLowerCase() ?? "";
        const status: "Completed" | "Upcoming" =
            rawStatus === "completed" ? "Completed" : "Upcoming";

        if (!batchMap.has(batchName)) {
            batchMap.set(batchName, {
                name: batchName,
                monthEntries: [],
                legacyDates: [],
                legacyTime: time,
                legacyLocation: location,
                legacyStatuses: [],
            });
        }

        const entry = batchMap.get(batchName)!;

        if (hasMonthColumn) {
            // New format: one row per month → one MonthEntry per row
            if (month || dates || time || location) {
                entry.monthEntries.push({
                    month,
                    dates,
                    time,
                    location: location || "TBA",
                    status,
                });
            }
        } else {
            // Legacy format: group rows by the month prefix in the date string
            // so each distinct month becomes its own MonthEntry.
            const MONTH_ABBREVS = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ];
            const detectMonth = (dateStr: string): string => {
                const upper = dateStr.toUpperCase();
                return MONTH_ABBREVS.find((m) => upper.startsWith(m.toUpperCase())) ?? "";
            };

            if (dates) {
                const detectedMonth = detectMonth(dates);
                // Find or create a bucket for this month
                let bucket = entry.monthEntries.find((e) => e.month === detectedMonth);
                if (!bucket) {
                    bucket = {
                        month: detectedMonth,
                        dates: "",
                        time: time || entry.legacyTime,
                        location: location || entry.legacyLocation || "TBA",
                        status,
                    };
                    entry.monthEntries.push(bucket);
                }
                bucket.dates = bucket.dates ? `${bucket.dates}, ${dates}` : dates;
                // Update status: if any row is Upcoming, bucket is Upcoming
                if (status === "Upcoming") bucket.status = "Upcoming";
            }
            if (time && !entry.legacyTime) entry.legacyTime = time;
            if (location && !entry.legacyLocation) entry.legacyLocation = location;
            entry.legacyStatuses.push(status);
        }
    }

    // ── Convert map to WorkshopBatch array ────────────────────────────────────
    const allBatches: WorkshopBatch[] = [];
    let idx = 0;

    for (const [, entry] of batchMap) {
        let monthEntries: MonthEntry[];

        if (hasMonthColumn) {
            monthEntries = entry.monthEntries;
        } else {
            // Use the month-grouped entries built during row processing.
            // If no dates were present at all, fall back to a single empty entry.
            if (entry.monthEntries.length > 0) {
                monthEntries = entry.monthEntries;
            } else {
                const legacyStatus: "Completed" | "Upcoming" =
                    entry.legacyStatuses.length > 0 &&
                    entry.legacyStatuses.every((s) => s === "Completed")
                        ? "Completed"
                        : "Upcoming";
                monthEntries = [
                    {
                        month: "",
                        dates: "",
                        time: entry.legacyTime,
                        location: entry.legacyLocation || "TBA",
                        status: legacyStatus,
                    },
                ];
            }
        }

        // Batch status: Upcoming if ANY entry is Upcoming; Completed only if ALL are Completed
        const batchStatus: "Completed" | "Upcoming" =
            monthEntries.length > 0 &&
            monthEntries.every((e) => e.status === "Completed")
                ? "Completed"
                : "Upcoming";

        allBatches.push({
            id: `sheet-batch-${idx++}`,
            name: entry.name,
            status: batchStatus,
            monthEntries,
            dates: [],
            time: "",
            month: "",
            year: 0,
        });
    }

    // ── Filter: last 2 completed + first 2 upcoming ───────────────────────────
    const completed = allBatches.filter((b) => b.status === "Completed");
    const upcoming = allBatches.filter((b) => b.status === "Upcoming");

    return [...completed.slice(-2), ...upcoming.slice(0, 2)];
}

/**
 * React Query hook that fetches batch data from Google Sheets.
 * Falls back to hardcoded data on error.
 */
export function useGoogleSheetsBatches() {
    const query = useQuery<WorkshopBatch[]>({
        queryKey: ["google-sheets-batches"],
        queryFn: fetchBatchesFromSheet,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    });

    return {
        batches: query.data ?? workshopBatches,
        isLoading: query.isLoading,
        error: query.error,
    };
}
