import { useQuery } from "@tanstack/react-query";
import {
    getTestimonialsSheetUrl,
    testimonialVideosFallback,
    type TestimonialVideo,
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
 * Fetches testimonial video data from a published Google Sheet CSV tab.
 * Expected columns: Title, Embed URL
 * Returns videos in the sheet's row order.
 */
async function fetchTestimonialVideos(): Promise<TestimonialVideo[]> {
    const testimonialsUrl = getTestimonialsSheetUrl();
    if (!testimonialsUrl) {
        // No URL configured — return fallback
        return testimonialVideosFallback;
    }

    const response = await fetch(testimonialsUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch testimonials sheet: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
        throw new Error("Testimonials sheet has no data rows");
    }

    // Find column indices from header row (case-insensitive)
    const headers = rows[0].map((h) => h.toLowerCase().trim());
    const titleIdx = headers.findIndex((h) => h === "title");
    const embedUrlIdx = headers.findIndex(
        (h) => h.includes("embed") && h.includes("url")
    );

    if (titleIdx === -1 || embedUrlIdx === -1) {
        throw new Error(
            "Required columns not found. Need: Title, Embed URL"
        );
    }

    const dataRows = rows.slice(1); // skip header
    const videos: TestimonialVideo[] = [];

    for (const row of dataRows) {
        const title = row[titleIdx]?.trim();
        const embedUrl = row[embedUrlIdx]?.trim();

        if (!title || !embedUrl) continue;

        videos.push({ title, embedUrl });
    }

    return videos;
}

/**
 * React Query hook that fetches testimonial video data from Google Sheets.
 * Falls back to hardcoded data on error or when no URL is configured.
 */
export function useTestimonialVideos() {
    const query = useQuery<TestimonialVideo[]>({
        queryKey: ["google-sheets-testimonials"],
        queryFn: fetchTestimonialVideos,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    });

    return {
        videos: query.data ?? testimonialVideosFallback,
        isLoading: query.isLoading,
        error: query.error,
    };
}
