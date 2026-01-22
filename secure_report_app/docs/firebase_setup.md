# Firebase Setup Guide (SecureReport)

This guide documents the Firebase configuration required for SecureReport. It
assumes you will use FlutterFire to generate platform configuration files.

## 1) Firebase Project

1. Create a Firebase project (dev, staging, prod recommended).
2. Enable Authentication -> Google Sign-In.
3. Create Firestore (production mode).
4. Enable Cloud Functions, Storage, and Cloud Messaging (FCM).

## 2) Register Apps

### Android
- Register an Android app in Firebase.
- Download `google-services.json`.
- Place it at `secure_report_app/android/app/google-services.json`.

### iOS
- Register an iOS app in Firebase.
- Download `GoogleService-Info.plist`.
- Place it at `secure_report_app/ios/Runner/GoogleService-Info.plist`.

## 3) FlutterFire CLI

Install the FlutterFire CLI:

```
dart pub global activate flutterfire_cli
```

Configure the project (from `secure_report_app`):

```
flutterfire configure
```

This generates `lib/firebase_options.dart` and updates platform config files.

## 4) Required Firebase Products

- Authentication: Google Sign-In and email whitelist enforcement.
- Firestore: users, sites, schedules, reports, chats, notifications.
- Storage: report media uploads.
- Cloud Functions: Drive uploads, Sheets imports, report generation.
- Cloud Messaging: push notifications.

## 5) Environment Variables (Recommended)

Store API keys and endpoints in platform-specific config or via a secure
secrets manager. Example values:

- WEATHER_API_KEY
- WEATHER_API_BASE_URL
- GOOGLE_DRIVE_FOLDER_ROOT

Do not embed service account credentials in the mobile app.

## 6) Security Rules (Outline)

- Enforce role-based access in Firestore rules.
- Officers: access only their data and site channels.
- Supervisors: access all sites, schedules, and reports.
- Validate email whitelist and role claims via custom claims.

## 7) Next Integration Steps

- Add Firebase dependencies via `flutter pub add`:
  - firebase_core, firebase_auth, cloud_firestore, firebase_storage,
    firebase_messaging, google_sign_in
- Initialize Firebase in `main.dart`.
- Replace mock auth with real auth flows.
