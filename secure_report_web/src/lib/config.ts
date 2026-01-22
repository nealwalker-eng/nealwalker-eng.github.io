export type AppConfig = {
  useMocks: boolean;
  weatherApiKey: string;
  weatherBaseUrl: string;
  weatherLatitude: number;
  weatherLongitude: number;
};

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value && value.length > 0,
);

export const appConfig: AppConfig = {
  useMocks:
    process.env.NEXT_PUBLIC_USE_MOCKS === "true" || !isFirebaseConfigured,
  weatherApiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY ?? "",
  weatherBaseUrl:
    process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL ??
    "https://api.openweathermap.org/data/2.5/weather",
  weatherLatitude: Number(process.env.NEXT_PUBLIC_WEATHER_LATITUDE ?? 38.9907),
  weatherLongitude: Number(process.env.NEXT_PUBLIC_WEATHER_LONGITUDE ?? -77.0261),
};
