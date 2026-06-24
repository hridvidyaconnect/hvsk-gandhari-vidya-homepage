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
 * Normalizes different forms of YouTube URLs into a valid embed URL.
 * Handles:
 * - Direct embed URLs: https://www.youtube.com/embed/xyz
 * - Watch URLs: https://www.youtube.com/watch?v=xyz
 * - Short URLs: https://youtu.be/xyz
 * - Full iframe strings: <iframe ... src="https://www.youtube.com/embed/xyz"...>
 */
function normalizeYouTubeUrl(input: string): string {
    const trimmed = input.trim();
    
    // Check if it's an iframe string
    if (trimmed.toLowerCase().startsWith('<iframe')) {
        const srcMatch = trimmed.match(/src=["']([^"']+)["']/);
        if (srcMatch && srcMatch[1]) {
            // Recursively normalize the extracted src URL
            return normalizeYouTubeUrl(srcMatch[1]);
        }
    }

    try {
        const url = new URL(trimmed);
        
        // Handle youtu.be/VIDEO_ID
        if (url.hostname === 'youtu.be') {
            const videoId = url.pathname.slice(1);
            return `https://www.youtube.com/embed/${videoId}${url.search}`;
        }
        
        // Handle youtube.com/watch?v=VIDEO_ID
        if (url.hostname.includes('youtube.com') && url.pathname === '/watch') {
            const videoId = url.searchParams.get('v');
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        
        // If it's already an embed URL or something else, return as is
        return trimmed;
    } catch (e) {
        // If parsing fails, return original input
        return trimmed;
    }
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
        const rawEmbedUrl = row[embedUrlIdx]?.trim();

        if (!title || !rawEmbedUrl) continue;

        const embedUrl = normalizeYouTubeUrl(rawEmbedUrl);

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

    // Also normalize the fallback data in case it contains un-normalized URLs
    const fallbackVideos = testimonialVideosFallback.map(video => ({
        ...video,
        embedUrl: normalizeYouTubeUrl(video.embedUrl)
    }));

    return {
        videos: query.data ?? fallbackVideos,
        isLoading: query.isLoading,
        error: query.error,
    };
}

