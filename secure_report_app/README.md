# SecureReport Mobile App (Flutter)

This folder contains the Flutter mobile app for SecureReport. The current
implementation provides a navigable MVP skeleton with placeholder data for key
flows (auth, dashboard, QR scanning, reports, schedules, chat, notifications).

## Getting Started

1. Install Flutter (3.x) and ensure `flutter` is on your PATH.
2. From this folder, fetch dependencies:
   - `flutter pub get`
3. If you need platform folders (android/ios/web), run:
   - `flutter create --platforms=android,ios,web .`
   - If the command overwrites `lib/main.dart`, restore it from git.
4. Run the app:
   - `flutter run`

## Project Structure

- `lib/main.dart`: App entry point with routing and placeholder screens.
- `pubspec.yaml`: Flutter SDK dependency only. Add packages via
  `flutter pub add <package>`.

## Next Steps

- Replace mock auth with Firebase Auth + Google Sign-In.
- Integrate Firestore, Storage, and Cloud Functions for reports and schedules.
- Replace placeholders with live weather, chat, and report data sources.
- Add platform configuration and Firebase setup files.
