SecureReport is a React / Next.js web application that mirrors the SecureReport
mobile experience: authentication, dashboard, reports, QR scanning, chat,
schedules, notifications, and analytics.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with the following values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_WEATHER_API_KEY=
NEXT_PUBLIC_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5/weather
NEXT_PUBLIC_WEATHER_LATITUDE=38.9907
NEXT_PUBLIC_WEATHER_LONGITUDE=-77.0261
NEXT_PUBLIC_USE_MOCKS=true
```

Set `NEXT_PUBLIC_USE_MOCKS=false` once Firebase is configured.

## Core Routes

- `/dashboard`: homepage dashboard
- `/reports`: report list and drafts
- `/reports/new`: create and submit reports
- `/reports/analytics`: supervisor analytics
- `/scan`: QR scanning
- `/chat`: site and organization chat
- `/schedule`: weekly schedule
- `/notifications/compose`: supervisor notifications

## Notes

- Firebase collections expected: `whitelist`, `users`, `sites`, `schedules`,
  `reports`, `channels`, `notifications`, and `patrols`.
- Cloud Functions expected: `submitReportToDrive`.
