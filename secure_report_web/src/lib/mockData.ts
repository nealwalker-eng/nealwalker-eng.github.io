import type {
  Channel,
  ChatMessage,
  Report,
  ScheduleShift,
  Site,
  UserProfile,
  WeatherData,
} from "./models";

export const mockSites: Site[] = [
  {
    id: "silver-spring",
    name: "Silver Spring HQ",
    address: "10304 New Hampshire Ave, Silver Spring, MD",
    location: { lat: 38.9907, lng: -77.0261 },
  },
  {
    id: "capitol-annex",
    name: "Capitol Annex",
    address: "Washington, DC",
    location: { lat: 38.8895, lng: -77.0353 },
  },
  {
    id: "federal-plaza",
    name: "Federal Plaza",
    address: "Federal Plaza, DC",
    location: { lat: 38.8977, lng: -77.0365 },
  },
];

export const mockWeather: WeatherData = {
  location: "Silver Spring, MD",
  temperatureF: 72,
  condition: "Partly Cloudy",
  iconCode: "02d",
};

export const mockSchedule: ScheduleShift[] = [
  {
    userId: "mock-officer",
    siteId: "silver-spring",
    start: new Date(Date.now() + 2 * 60 * 60 * 1000),
    end: new Date(Date.now() + 10 * 60 * 60 * 1000),
  },
  {
    userId: "mock-officer",
    siteId: "capitol-annex",
    start: new Date(Date.now() + 26 * 60 * 60 * 1000),
    end: new Date(Date.now() + 34 * 60 * 60 * 1000),
  },
];

export const mockReports: Report[] = [
  {
    id: "report-1",
    title: "Suspicious activity near loading dock",
    details: "Unrecognized vehicle observed near loading dock.",
    userId: "mock-officer",
    siteId: "silver-spring",
    status: "submitted",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    mediaUrls: [],
  },
  {
    id: "report-2",
    title: "Routine patrol completed",
    details: "Completed standard patrol route with no incidents.",
    userId: "mock-officer",
    siteId: "capitol-annex",
    status: "draft",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    mediaUrls: [],
  },
];

export const mockChannels: Channel[] = [
  { id: "org", name: "Organization", type: "organization" },
  {
    id: "silver-spring",
    name: "Silver Spring HQ",
    type: "site",
    siteId: "silver-spring",
  },
  {
    id: "capitol-annex",
    name: "Capitol Annex",
    type: "site",
    siteId: "capitol-annex",
  },
];

export const mockMessages: ChatMessage[] = [
  {
    id: "msg-1",
    channelId: "org",
    senderId: "dispatcher",
    senderName: "Dispatcher",
    message: "Reminder: submit reports before shift end.",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: "msg-2",
    channelId: "org",
    senderId: "mock-officer",
    senderName: "John Carter",
    message: "Copy that. Starting second round now.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
];

export const mockOfficerProfile: UserProfile = {
  uid: "mock-officer",
  email: "officer@secure-report.test",
  displayName: "John Carter",
  role: "officer",
  isApproved: true,
  siteIds: ["silver-spring", "capitol-annex"],
};

export const mockSupervisorProfile: UserProfile = {
  uid: "mock-supervisor",
  email: "supervisor@secure-report.test",
  displayName: "Sarah Blake",
  role: "supervisor",
  isApproved: true,
  siteIds: ["silver-spring", "capitol-annex", "federal-plaza"],
};
