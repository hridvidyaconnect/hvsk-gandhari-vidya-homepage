// ========================================
// WORKSHOP DATES CONFIGURATION
// Edit this file to update workshop dates
// ========================================

export interface WorkshopBatch {
  id: string;
  name: string;
  dates: string[];
  time: string;
  month: string;
  year: number;
  subBatches?: {
    name: string;
    dates: string;
    location: string;
  }[];
}

export const workshopBatches: WorkshopBatch[] = [
  {
    id: "batch-1",
    name: "Batch Jan 2026",
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
    dates: [],
    time: "",
    month: "April",
    year: 2026,
    subBatches: [
      { name: "Batch 1", dates: "6th-11th", location: "Bengaluru" },
      { name: "Batch 2", dates: "13th-18th", location: "Tamilnadu" },
      { name: "Batch 3", dates: "20th-25th", location: "Bengaluru" },
      { name: "Batch 4", dates: "27th-2nd", location: "TBA" },
    ],
  },
  {
    id: "batch-5",
    name: "Batch May 2026",
    dates: [],
    time: "",
    month: "May",
    year: 2026,
    subBatches: [
      { name: "Batch 1", dates: "5th-9th", location: "TBA" },
      { name: "Batch 2", dates: "11th-16th", location: "TBA" },
      { name: "Batch 3", dates: "18th-23rd", location: "TBA" },
      { name: "Batch 4", dates: "25th-30th", location: "TBA" },
    ],
  },
];

export const workshopDetails = {
  format: "Monday to Saturday | 4.5 Hours/Day",
  ageGroup: "6–18 years",
  duration: "5-day workshop on weekdays",
  location:
    "The Shivaratnapuri Temple of Health, Pyramid, Rajarajeshwari Nagar, Bengaluru 560098",
};

export const formLinks = {
  enrollment: "https://forms.gle/7iohg6vasSWn486u5",
  // Add payment link here when ready
  payment: "#",
};