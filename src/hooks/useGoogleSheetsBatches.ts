import { useQuery } from "@tanstack/react-query";
import {
    GOOGLE_SHEETS_CSV_URL,
    workshopBatches,
    type WorkshopBatch,
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
 * Fetches batch data from a published Google Sheet CSV and returns
 * the last 2 completed batches + first 2 upcoming batches.
 */
async function fetchBatchesFromSheet(): Promise<WorkshopBatch[]> {
    if (
        !GOOGLE_SHEETS_CSV_URL
    ) {
        // No URL configured — return fallback
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

    // Find column indices from header row (case-insensitive)
    const headers = rows[0].map((h) => h.toLowerCase().trim());
    const batchNumberIdx = headers.findIndex(
        (h) => h.includes("batch") && h.includes("number")
    );
    const dateIdx = headers.findIndex((h) => h === "date" || h === "dates");
    const placeIdx = headers.findIndex(
        (h) => h === "place" || h === "location"
    );
    const statusIdx = headers.findIndex(
        (h) => h.includes("batch") && h.includes("status")
    );

    if (batchNumberIdx === -1 || statusIdx === -1) {
        throw new Error(
            "Required columns not found. Need: Batch Number, Batch Status"
        );
    }

    // Group rows by batch name
    const batchMap = new Map<
        string,
        {
            name: string;
            subBatches: { name: string; dates: string; location: string; status: "Completed" | "Upcoming" }[];
        }
    >();

    const dataRows = rows.slice(1); // skip header
    for (const row of dataRows) {
        const batchName = row[batchNumberIdx]?.trim();
        const date = dateIdx !== -1 ? row[dateIdx]?.trim() : "";
        const place = placeIdx !== -1 ? row[placeIdx]?.trim() : "";
        const rawStatus = row[statusIdx]?.trim().toLowerCase();

        if (!batchName) continue;

        const status: "Completed" | "Upcoming" =
            rawStatus === "completed" ? "Completed" : "Upcoming";

        if (!batchMap.has(batchName)) {
            batchMap.set(batchName, {
                name: batchName,
                subBatches: [],
            });
        }

        const entry = batchMap.get(batchName)!;

        // Add sub-batch with its individual status
        if (date || place) {
            entry.subBatches.push({
                name: `Batch ${entry.subBatches.length + 1}`,
                dates: date,
                location: place || "TBA",
                status,
            });
        } else {
            // Row with no date/place — just a batch-level marker
            // Store as a zero-detail sub-batch to track status
            entry.subBatches.push({
                name: "",
                dates: "",
                location: "",
                status,
            });
        }
    }

    // Convert map to WorkshopBatch array
    const allBatches: WorkshopBatch[] = [];
    let idx = 0;
    for (const [, entry] of batchMap) {
        // Batch-level status: "Completed" only if ALL sub-batches are completed
        const allCompleted = entry.subBatches.length > 0 &&
            entry.subBatches.every((sb) => sb.status === "Completed");
        const batchStatus: "Completed" | "Upcoming" = allCompleted ? "Completed" : "Upcoming";

        // Filter out zero-detail marker sub-batches
        const realSubBatches = entry.subBatches.filter((sb) => sb.dates || sb.location);

        allBatches.push({
            id: `sheet-batch-${idx++}`,
            name: entry.name,
            status: batchStatus,
            dates: [],
            time: "",
            month: "",
            year: 0,
            subBatches: realSubBatches.length > 0 ? realSubBatches : undefined,
        });
    }

    // Filter: last 2 completed + first 2 upcoming
    const completed = allBatches.filter((b) => b.status === "Completed");
    const upcoming = allBatches.filter((b) => b.status === "Upcoming");

    const lastTwoCompleted = completed.slice(-2);
    const firstTwoUpcoming = upcoming.slice(0, 2);

    return [...lastTwoCompleted, ...firstTwoUpcoming];
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
