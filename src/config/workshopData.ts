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
}

export const workshopBatches: WorkshopBatch[] = [
  {
    id: "batch-1",
    name: "Batch 1",
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
    time: "3:00 PM - 7:00 PM",
    month: "January",
    year: 2026,
  },
  {
    id: "batch-2",
    name: "Batch 2",
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
];

export const workshopDetails = {
  format: "Saturdays and Sundays | 4 hours/day",
  ageGroup: "6–18 years",
  duration: "8-day workshop on weekends",
  location:
    "The Shivaratnapuri Temple of Health, Pyramid, Rajarajeshwari Nagar, Bengaluru 560098",
};

export const formLinks = {
  enrollment: "https://forms.gle/7iohg6vasSWn486u5",
  // Add payment link here when ready
  payment: "#",
};