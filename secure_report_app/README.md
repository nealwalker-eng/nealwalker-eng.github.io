# SecureReport Mobile App (Flutter)

This folder contains the Flutter mobile app for SecureReport. The current
implementation provides end-to-end feature scaffolding for authentication,
dashboard, QR scanning, reports (draft + submit), schedules, chat, notifications,
weather, and offline drafts, with Firebase-backed repositories and mock fallbacks.

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

- `lib/main.dart`: App entry point with Firebase bootstrap and providers.
- `lib/app.dart`: MaterialApp configuration and routes.
- `lib/screens.dart`: UI flows for all features.
- `lib/services.dart`: Firebase + mock repositories and integrations.
- `lib/models.dart`: Data models used by Firestore and local storage.
- `lib/providers.dart`: Riverpod wiring for auth and data streams.
- `pubspec.yaml`: Dependencies for Firebase, QR scanning, GPS, and more.

## Next Steps

- Configure Firebase via FlutterFire CLI and add platform files.
- Set WEATHER_API_KEY and Firebase env values for weather integration.
- Deploy Cloud Functions for report submission and schedule imports.
