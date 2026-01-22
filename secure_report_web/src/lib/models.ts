import type { Timestamp } from "firebase/firestore";

export type UserRole = "officer" | "supervisor";

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  isApproved: boolean;
  siteIds: string[];
};

export type Site = {
  id: string;
  name: string;
  address: string;
  location?: { lat: number; lng: number };
  driveFolderId?: string;
};

export type ScheduleShift = {
  userId: string;
  siteId: string;
  start: Date;
  end: Date;
};

export type ReportStatus = "draft" | "submitted";

export type Report = {
  id: string;
  title: string;
  details: string;
  userId: string;
  siteId: string;
  status: ReportStatus;
  createdAt: Date;
  updatedAt: Date;
  mediaUrls: string[];
};

export type ReportDraft = {
  id: string;
  title: string;
  details: string;
  userId: string;
  siteId: string;
  createdAt: Date;
  localMediaPaths: string[];
};

export type ChannelType = "organization" | "site";

export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  siteId?: string;
};

export type ChatMessage = {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
};

export type WeatherData = {
  location: string;
  temperatureF: number;
  condition: string;
  iconCode: string;
};

export type NotificationRequest = {
  title: string;
  body: string;
  senderId: string;
  targets: Record<string, string[]>;
  createdAt: Date;
};

export type PatrolScanType = "signIn" | "signOut" | "patrol";

export type PatrolScan = {
  id: string;
  userId: string;
  siteId: string;
  scanType: PatrolScanType;
  timestamp: Date;
  location?: { lat: number; lng: number };
  rawCode?: string;
};

export function timestampToDate(value: Timestamp | Date | string | undefined) {
  if (!value) {
    return new Date();
  }
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }
  return value.toDate();
}
