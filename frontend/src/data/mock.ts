export const nationalStats = {
  averageGHI: 64,
  criticalDistricts: 42,
  activeStations: 5260,
  totalRechargeBcm: 156.8,
};

export const timeseries = Array.from({ length: 24 }).map((_, i) => ({
  date: `2025-08-${String(i + 1).padStart(2, "0")}`,
  level: 10 + Math.sin(i / 3) * 2 + (i / 24) * 1.5,
}));

export const rechargeEstimation = [
  { name: "Q1", value: 35 },
  { name: "Q2", value: 48 },
  { name: "Q3", value: 29 },
  { name: "Q4", value: 52 },
];

export const states = ["Gujarat", "Rajasthan", "Maharashtra", "Karnataka", "Tamil Nadu"];
export const districts = ["Kutch", "Jaipur", "Pune", "Mysuru", "Madurai"];
export const blocks = ["Block A", "Block B", "Block C"];

export const alerts = [
  { id: 1, severity: "critical", title: "Rapid decline detected", region: "Marathwada", time: "10m ago" },
  { id: 2, severity: "warning", title: "Low recharge forecast", region: "Kutch", time: "2h ago" },
  { id: 3, severity: "info", title: "Station maintenance", region: "Pune", time: "1d ago" },
];

export const leaderboard = [
  { region: "Kutch", score: 78 },
  { region: "Jaipur", score: 74 },
  { region: "Mysuru", score: 71 },
  { region: "Madurai", score: 66 },
];

export const communityReports = [
  { id: 1, name: "Asha", location: "Kutch", message: "Well levels stable this week." },
  { id: 2, name: "Raj", location: "Jaipur", message: "New rainwater pits constructed." },
];

export const advisories = [
  { id: 1, title: "Summer Water Use Advisory", body: "Limit irrigation during peak heat." },
  { id: 2, title: "Monsoon Prep", body: "Clean rooftop harvesting filters." },
];

export const notifications = [
  { id: 1, date: "2025-08-24", severity: "critical", text: "GHI dropped below 45 in district X" },
  { id: 2, date: "2025-08-20", severity: "warning", text: "Recharge expected to be below seasonal avg" },
  { id: 3, date: "2025-08-18", severity: "info", text: "Station Y resumed reporting" },
];

export const seasonal = [
  { month: "Jan", value: 20 }, { month: "Feb", value: 22 }, { month: "Mar", value: 25 },
  { month: "Apr", value: 28 }, { month: "May", value: 30 }, { month: "Jun", value: 35 },
  { month: "Jul", value: 42 }, { month: "Aug", value: 45 }, { month: "Sep", value: 38 },
  { month: "Oct", value: 32 }, { month: "Nov", value: 26 }, { month: "Dec", value: 22 },
];

export const predictive = Array.from({ length: 12 }).map((_, i) => ({
  month: i + 1,
  expected: 30 + Math.sin(i / 2) * 5,
}));

export const historicalHeatmap = Array.from({ length: 12 }).map((_, i) => ({
  month: i + 1,
  intensity: Math.floor(50 + Math.sin(i) * 40),
}));

export const mapPoints = [
  { id: 1, name: "Station A", lat: 28.6139, lng: 77.2090, ghi: 62 },
  { id: 2, name: "Station B", lat: 19.0760, lng: 72.8777, ghi: 55 },
  { id: 3, name: "Station C", lat: 13.0827, lng: 80.2707, ghi: 70 },
];
