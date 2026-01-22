"use client";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { httpsCallable } from "firebase/functions";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { appConfig } from "./config";
import { getFirebaseDb, getFirebaseFunctions, getFirebaseStorage } from "./firebase";
import {
  mockChannels,
  mockMessages,
  mockReports,
  mockSchedule,
  mockSites,
  mockWeather,
} from "./mockData";
import type {
  Channel,
  ChatMessage,
  NotificationRequest,
  PatrolScan,
  Report,
  ReportDraft,
  ScheduleShift,
  Site,
  UserProfile,
  WeatherData,
} from "./models";
import { timestampToDate } from "./models";

const DRAFT_STORAGE_KEY = "secure_report_drafts_v1";

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadWeather() {
      setLoading(true);
      try {
        if (appConfig.useMocks || !appConfig.weatherApiKey) {
          if (active) {
            setData(mockWeather);
            setError(null);
            setLoading(false);
          }
          return;
        }
        const url = new URL(appConfig.weatherBaseUrl);
        url.searchParams.set("lat", String(appConfig.weatherLatitude));
        url.searchParams.set("lon", String(appConfig.weatherLongitude));
        url.searchParams.set("units", "imperial");
        url.searchParams.set("appid", appConfig.weatherApiKey);
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Weather API error");
        }
        const payload = await response.json();
        const weather = payload.weather?.[0] ?? {};
        const weatherData: WeatherData = {
          location: payload.name ?? "Silver Spring, MD",
          temperatureF: Math.round(payload.main?.temp ?? 72),
          condition: weather.main ?? "Clear",
          iconCode: weather.icon ?? "01d",
        };
        if (active) {
          setData(weatherData);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Weather unavailable");
          setData(mockWeather);
          setLoading(false);
        }
      }
    }
    loadWeather();
    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}

export function useSites() {
  const [data, setData] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (appConfig.useMocks) {
      setData(mockSites);
      setLoading(false);
      return;
    }
    const db = getFirebaseDb();
    if (!db) {
      setError("Firebase not configured");
      setLoading(false);
      return;
    }
    const unsubscribe = onSnapshot(
      collection(db, "sites"),
      (snapshot) => {
        const sites = snapshot.docs.map((docSnap) => {
          const payload = docSnap.data() as Record<string, unknown>;
          return {
            id: docSnap.id,
            name: String(payload.name ?? ""),
            address: String(payload.address ?? ""),
            location: normalizeLocation(payload.location),
            driveFolderId: payload.driveFolderId as string | undefined,
          };
        });
        setData(sites);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  return { data, loading, error };
}

export function useSchedule(profile?: UserProfile) {
  const [data, setData] = useState<ScheduleShift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      setData([]);
      setLoading(false);
      return;
    }
    if (appConfig.useMocks) {
      setData(mockSchedule);
      setLoading(false);
      return;
    }
    const db = getFirebaseDb();
    if (!db) {
      setError("Firebase not configured");
      setLoading(false);
      return;
    }
    const scheduleQuery =
      profile.role === "supervisor"
        ? query(collection(db, "schedules"))
        : query(collection(db, "schedules"), where("userId", "==", profile.uid));
    const unsubscribe = onSnapshot(
      scheduleQuery,
      (snapshot) => {
        const shifts: ScheduleShift[] = [];
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data() as {
            userId?: string;
            shifts?: { siteId: string; start: unknown; end: unknown }[];
          };
          (data.shifts ?? []).forEach((shift) => {
            shifts.push({
              userId: data.userId ?? profile.uid,
              siteId: shift.siteId,
              start: timestampToDate(shift.start as any),
              end: timestampToDate(shift.end as any),
            });
          });
        });
        shifts.sort((a, b) => a.start.getTime() - b.start.getTime());
        setData(shifts);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [profile]);

  return { data, loading, error };
}

export function useReports(profile?: UserProfile) {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      setData([]);
      setLoading(false);
      return;
    }
    if (appConfig.useMocks) {
      setData(mockReports);
      setLoading(false);
      return;
    }
    const db = getFirebaseDb();
    if (!db) {
      setError("Firebase not configured");
      setLoading(false);
      return;
    }
    const reportsQuery =
      profile.role === "supervisor"
        ? query(collection(db, "reports"), orderBy("updatedAt", "desc"))
        : query(
            collection(db, "reports"),
            where("userId", "==", profile.uid),
            orderBy("updatedAt", "desc"),
          );
    const unsubscribe = onSnapshot(
      reportsQuery,
      (snapshot) => {
        const reports = snapshot.docs.map((docSnap) => {
          const payload = docSnap.data() as Record<string, unknown>;
          return {
            id: docSnap.id,
            title: String(payload.title ?? ""),
            details: String(payload.details ?? ""),
            userId: String(payload.userId ?? ""),
            siteId: String(payload.siteId ?? ""),
            status: (payload.status as "draft" | "submitted") ?? "draft",
            createdAt: timestampToDate(payload.createdAt as any),
            updatedAt: timestampToDate(payload.updatedAt as any),
            mediaUrls: (payload.mediaUrls as string[]) ?? [],
          };
        });
        setData(reports);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [profile]);

  return { data, loading, error };
}

export function useChatChannels(profile?: UserProfile) {
  const [data, setData] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      setData([]);
      setLoading(false);
      return;
    }
    if (appConfig.useMocks) {
      setData(mockChannels);
      setLoading(false);
      return;
    }
    const db = getFirebaseDb();
    if (!db) {
      setError("Firebase not configured");
      setLoading(false);
      return;
    }
    const unsubscribe = onSnapshot(
      collection(db, "channels"),
      (snapshot) => {
        const channels = snapshot.docs.map((docSnap) => {
          const payload = docSnap.data() as Record<string, unknown>;
          const channel: Channel = {
            id: docSnap.id,
            name: String(payload.name ?? ""),
            type: (payload.type as "organization" | "site") ?? "site",
            siteId: payload.siteId as string | undefined,
          };
          return channel;
        });
        if (profile.role === "supervisor") {
          setData(channels);
        } else {
          setData(
            channels.filter((channel) => {
              if (channel.type === "organization") {
                return true;
              }
              return (
                channel.siteId && profile.siteIds.includes(channel.siteId)
              );
            }),
          );
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [profile]);

  return { data, loading, error };
}

export function useChatMessages(channelId?: string) {
  const [data, setData] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!channelId) {
      setData([]);
      setLoading(false);
      return;
    }
    if (appConfig.useMocks) {
      setData(mockMessages.filter((msg) => msg.channelId === channelId));
      setLoading(false);
      return;
    }
    const db = getFirebaseDb();
    if (!db) {
      setError("Firebase not configured");
      setLoading(false);
      return;
    }
    const messagesQuery = query(
      collection(db, "channels", channelId, "messages"),
      orderBy("timestamp", "asc"),
    );
    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messages = snapshot.docs.map((docSnap) => {
          const payload = docSnap.data() as Record<string, unknown>;
          return {
            id: docSnap.id,
            channelId,
            senderId: String(payload.senderId ?? ""),
            senderName: String(payload.senderName ?? ""),
            message: String(payload.message ?? ""),
            timestamp: timestampToDate(payload.timestamp as any),
          };
        });
        setData(messages);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [channelId]);

  return { data, loading, error };
}

export function useDrafts(userId?: string) {
  const [drafts, setDrafts] = useState<ReportDraft[]>([]);

  useEffect(() => {
    if (!userId) {
      setDrafts([]);
      return;
    }
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) {
      setDrafts([]);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as ReportDraft[];
      setDrafts(
        parsed
          .map((draft) => ({ ...draft, createdAt: new Date(draft.createdAt) }))
          .filter((draft) => draft.userId === userId),
      );
    } catch {
      setDrafts([]);
    }
  }, [userId]);

  return drafts;
}

export function saveDraft(draft: ReportDraft) {
  const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
  const existing = raw ? (JSON.parse(raw) as ReportDraft[]) : [];
  const updated = [...existing, draft];
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(updated));
}

export async function submitReport(
  report: Report,
  attachments: File[],
  profile: UserProfile,
) {
  if (appConfig.useMocks) {
    return { id: uuidv4() };
  }
  const db = getFirebaseDb();
  const storage = getFirebaseStorage();
  if (!db || !storage) {
    throw new Error("Firebase not configured.");
  }
  const reportRef = doc(collection(db, "reports"));
  const mediaUrls: string[] = [];
  for (const file of attachments) {
    const fileRef = ref(storage, `reports/${reportRef.id}/${file.name}`);
    await uploadBytes(fileRef, file);
    mediaUrls.push(await getDownloadURL(fileRef));
  }
  await setDoc(reportRef, {
    title: report.title,
    details: report.details,
    userId: profile.uid,
    siteId: report.siteId,
    status: "submitted",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    mediaUrls,
  });

  const functions = getFirebaseFunctions();
  if (functions) {
    const callable = httpsCallable(functions, "submitReportToDrive");
    await callable({ reportId: reportRef.id, siteId: report.siteId });
  }

  return { id: reportRef.id };
}

export async function sendNotification(request: NotificationRequest) {
  if (appConfig.useMocks) {
    return;
  }
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase not configured.");
  }
  await addDoc(collection(db, "notifications"), {
    ...request,
    createdAt: serverTimestamp(),
  });
}

export async function logPatrolScan(scan: PatrolScan) {
  if (appConfig.useMocks) {
    return;
  }
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase not configured.");
  }
  await addDoc(collection(db, "patrols"), {
    ...scan,
    timestamp: serverTimestamp(),
  });
}

export async function sendChatMessage(
  channelId: string,
  profile: UserProfile,
  message: string,
) {
  if (appConfig.useMocks) {
    return;
  }
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase not configured.");
  }
  await addDoc(collection(db, "channels", channelId, "messages"), {
    channelId,
    senderId: profile.uid,
    senderName: profile.displayName,
    message,
    timestamp: serverTimestamp(),
  });
}

export function useSiteOptions() {
  const { data } = useSites();
  const options = useMemo(() => data, [data]);
  return options;
}

export async function fetchSiteList() {
  if (appConfig.useMocks) {
    return mockSites;
  }
  const db = getFirebaseDb();
  if (!db) {
    return [];
  }
  const snapshot = await getDocs(collection(db, "sites"));
  return snapshot.docs.map((docSnap) => {
    const payload = docSnap.data() as Record<string, unknown>;
    return {
      id: docSnap.id,
      name: String(payload.name ?? ""),
      address: String(payload.address ?? ""),
      location: normalizeLocation(payload.location),
      driveFolderId: payload.driveFolderId as string | undefined,
    };
  });
}

function normalizeLocation(
  value: unknown,
): { lat: number; lng: number } | undefined {
  if (!value) {
    return undefined;
  }
  const anyValue = value as { lat?: number; lng?: number; latitude?: number; longitude?: number };
  if (typeof anyValue.lat === "number" && typeof anyValue.lng === "number") {
    return { lat: anyValue.lat, lng: anyValue.lng };
  }
  if (
    typeof anyValue.latitude === "number" &&
    typeof anyValue.longitude === "number"
  ) {
    return { lat: anyValue.latitude, lng: anyValue.longitude };
  }
  return undefined;
}
