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

export interface WorkshopBatch {
  id: string;
  name: string;
  status: "Completed" | "Upcoming";
  dates: string[];
  time: string;
  month: string;
  year: number;
  subBatches?: {
    name: string;
    dates: string;
    location: string;
    status: "Completed" | "Upcoming";
  }[];
}

// Fallback data used when Google Sheets fetch fails
export const workshopBatches: WorkshopBatch[] = [
  {
    id: "batch-1",
    name: "Batch Jan 2026",
    status: "Completed",
    dates: [
      "Jan 3",
      "Jan 4",
      "Jan 10",
      "Jan 11",
      "Jan 17",
      "Jan 18",
      "Jan 24",
      "Jan 25",
    ],
    time: "",
    month: "January",
    year: 2026,
  },
  {
    id: "batch-2",
    name: "Batch Feb 2026",
    status: "Completed",
    dates: [
      "Jan 31",
      "Feb 1",
      "Feb 7",
      "Feb 8",
      "Feb 14",
      "Feb 15",
      "Feb 21",
      "Feb 22",
    ],
    time: "3:00 PM - 7:00 PM",
    month: "February",
    year: 2026,
  },
  {
    id: "batch-4",
    name: "Batch Apr 2026",
    status: "Upcoming",
    dates: [],
    time: "",
    month: "April",
    year: 2026,
    subBatches: [
      { name: "Batch 1", dates: "6th-11th", location: "Bengaluru", status: "Upcoming" },
      { name: "Batch 2", dates: "13th-18th", location: "Tamilnadu", status: "Upcoming" },
      { name: "Batch 3", dates: "20th-25th", location: "Bengaluru", status: "Upcoming" },
      { name: "Batch 4", dates: "27th-2nd", location: "TBA", status: "Upcoming" },
    ],
  },
  {
    id: "batch-5",
    name: "Batch May 2026",
    status: "Upcoming",
    dates: [],
    time: "",
    month: "May",
    year: 2026,
    subBatches: [
      { name: "Batch 1", dates: "5th-9th", location: "TBA", status: "Upcoming" },
      { name: "Batch 2", dates: "11th-16th", location: "TBA", status: "Upcoming" },
      { name: "Batch 3", dates: "18th-23rd", location: "TBA", status: "Upcoming" },
      { name: "Batch 4", dates: "25th-30th", location: "TBA", status: "Upcoming" },
    ],
  },
];

export const workshopDetails = {
  format: "Saturdays & Sundays | 4pm-8pm",
  ageGroup: "6–18 years (Now Extended till 25 years)",
  duration: "6 sessions over 3 weekends",
  location:
    "The Shivaratnapuri Temple of Health, Pyramid, Rajarajeshwari Nagar, Bengaluru 560098",
};

export const formLinks = {
  enrollment: "https://forms.gle/7iohg6vasSWn486u5",
  // Add payment link here when ready
  payment: "#",
};