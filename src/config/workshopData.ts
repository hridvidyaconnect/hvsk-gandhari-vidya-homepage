// ========================================
// WORKSHOP DATES CONFIGURATION
// Edit this file to update workshop dates
// ========================================

// Google Sheets published CSV URL — loaded from environment variable
// Set VITE_GOOGLE_SHEETS_CSV_URL in .env locally or in GitHub Actions secrets
export const GOOGLE_SHEETS_CSV_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL || "";

// Testimonial videos — derived from the same spreadsheet, different tab
// Change this gid if the Testimonials tab is recreated
const TESTIMONIALS_SHEET_GID = "1663554594";

/**
 * Derives the CSV URL for the Testimonials sheet tab from the base URL
 * by replacing the `gid` query parameter.
 */
export function getTestimonialsSheetUrl(): string {
  if (!GOOGLE_SHEETS_CSV_URL) return "";
  const url = new URL(GOOGLE_SHEETS_CSV_URL);
  url.searchParams.set("gid", TESTIMONIALS_SHEET_GID);
  return url.toString();
}

export interface TestimonialVideo {
  title: string;
  embedUrl: string;
}

// Fallback data used when Google Sheets testimonials fetch fails
export const testimonialVideosFallback: TestimonialVideo[] = [
  {
    title: "Parents Testimonials - Batch Jan 2026",
    embedUrl: "https://www.youtube.com/embed/9kVnT0wkZ_0?si=At4vnp3sfFBdWSuv",
  },
  {
    title: "Gandhari Vidya Journey",
    embedUrl: "https://www.youtube.com/embed/3-1BLcP8YcY?si=jQBcX57yDkcTa2mw",
  },
];

/**
 * Represents a single monthly entry within a batch (one CMS row = one MonthEntry).
 */
export interface MonthEntry {
  month: string;
  dates: string;
  time: string;
  location: string;
  status: "Completed" | "Upcoming";
}

export interface WorkshopBatch {
  id: string;
  name: string;
  /**
   * Overall batch status:
   * - "Upcoming" if at least one month entry is Upcoming
   * - "Completed" if ALL month entries are Completed
   */
  status: "Completed" | "Upcoming";
  /** One entry per month row in the CMS */
  monthEntries: MonthEntry[];
  // Legacy flat fields kept for fallback data compatibility
  dates: string[];
  time: string;
  month: string;
  year: number;
}

// Fallback data used when Google Sheets fetch fails
export const workshopBatches: WorkshopBatch[] = [
  {
    id: "batch-gv06",
    name: "#GV06",
    status: "Completed",
    dates: [],
    time: "",
    month: "January",
    year: 2026,
    monthEntries: [
      {
        month: "January",
        dates: "Jan 3, 4, 10, 11, 17, 18",
        time: "4pm – 8pm",
        location: "Bengaluru",
        status: "Completed",
      },
    ],
  },
  {
    id: "batch-gv07",
    name: "#GV07",
    status: "Completed",
    dates: [],
    time: "",
    month: "February",
    year: 2026,
    monthEntries: [
      {
        month: "Jan – Feb",
        dates: "Jan 31, Feb 1, 7, 8, 14, 15",
        time: "3pm – 7pm",
        location: "Bengaluru",
        status: "Completed",
      },
    ],
  },
  {
    id: "batch-gv08",
    name: "#GV08",
    status: "Upcoming",
    dates: [],
    time: "",
    month: "August",
    year: 2026,
    monthEntries: [
      {
        month: "August",
        dates: "Aug 29, 30",
        time: "3pm – 7pm",
        location: "TBA",
        status: "Upcoming",
      },
      {
        month: "September",
        dates: "Sep 5, 6, 12, 13",
        time: "3pm – 7pm",
        location: "TBA",
        status: "Upcoming",
      },
    ],
  },
  {
    id: "batch-gv09",
    name: "#GV09",
    status: "Upcoming",
    dates: [],
    time: "",
    month: "September",
    year: 2026,
    monthEntries: [
      {
        month: "September",
        dates: "Sep 5, 6, 12, 13, 19, 20",
        time: "3pm – 7pm",
        location: "TBA",
        status: "Upcoming",
      },
    ],
  },
];

export const workshopDetails = {
  format: "Saturdays & Sundays | 3pm-7pm",
  ageGroup: "6–18 years (Now Extended upto 30 years)",
  duration: "6 sessions over 3 weekends",
  location:
    "The Shivaratnapuri Temple of Health, Pyramid, Rajarajeshwari Nagar, Bengaluru 560098",
};

export const formLinks = {
  enrollment: "https://forms.gle/7iohg6vasSWn486u5",
  // Add payment link here when ready
  payment: "#",
};