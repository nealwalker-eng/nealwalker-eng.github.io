import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

// Placeholder Firebase options. Replace via FlutterFire CLI:
// flutterfire configure
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return _web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return _android;
      case TargetPlatform.iOS:
        return _ios;
      case TargetPlatform.macOS:
        return _macos;
      case TargetPlatform.windows:
        return _windows;
      case TargetPlatform.linux:
        return _linux;
      default:
        return _android;
    }
  }

  static const FirebaseOptions _android = FirebaseOptions(
    apiKey: String.fromEnvironment('FIREBASE_API_KEY', defaultValue: ''),
    appId: String.fromEnvironment('FIREBASE_APP_ID', defaultValue: ''),
    messagingSenderId:
        String.fromEnvironment('FIREBASE_SENDER_ID', defaultValue: ''),
    projectId: String.fromEnvironment('FIREBASE_PROJECT_ID', defaultValue: ''),
    storageBucket:
        String.fromEnvironment('FIREBASE_STORAGE_BUCKET', defaultValue: ''),
  );

  static const FirebaseOptions _ios = FirebaseOptions(
    apiKey: String.fromEnvironment('FIREBASE_API_KEY', defaultValue: ''),
    appId: String.fromEnvironment('FIREBASE_APP_ID', defaultValue: ''),
    messagingSenderId:
        String.fromEnvironment('FIREBASE_SENDER_ID', defaultValue: ''),
    projectId: String.fromEnvironment('FIREBASE_PROJECT_ID', defaultValue: ''),
    storageBucket:
        String.fromEnvironment('FIREBASE_STORAGE_BUCKET', defaultValue: ''),
    iosClientId: String.fromEnvironment('FIREBASE_IOS_CLIENT_ID', defaultValue: ''),
    iosBundleId: String.fromEnvironment('FIREBASE_IOS_BUNDLE_ID', defaultValue: ''),
  );

  static const FirebaseOptions _web = FirebaseOptions(
    apiKey: String.fromEnvironment('FIREBASE_API_KEY', defaultValue: ''),
    appId: String.fromEnvironment('FIREBASE_APP_ID', defaultValue: ''),
    messagingSenderId:
        String.fromEnvironment('FIREBASE_SENDER_ID', defaultValue: ''),
    projectId: String.fromEnvironment('FIREBASE_PROJECT_ID', defaultValue: ''),
    storageBucket:
        String.fromEnvironment('FIREBASE_STORAGE_BUCKET', defaultValue: ''),
    authDomain:
        String.fromEnvironment('FIREBASE_AUTH_DOMAIN', defaultValue: ''),
    measurementId:
        String.fromEnvironment('FIREBASE_MEASUREMENT_ID', defaultValue: ''),
  );

  static const FirebaseOptions _macos = FirebaseOptions(
    apiKey: String.fromEnvironment('FIREBASE_API_KEY', defaultValue: ''),
    appId: String.fromEnvironment('FIREBASE_APP_ID', defaultValue: ''),
    messagingSenderId:
        String.fromEnvironment('FIREBASE_SENDER_ID', defaultValue: ''),
    projectId: String.fromEnvironment('FIREBASE_PROJECT_ID', defaultValue: ''),
    storageBucket:
        String.fromEnvironment('FIREBASE_STORAGE_BUCKET', defaultValue: ''),
    iosClientId: String.fromEnvironment('FIREBASE_IOS_CLIENT_ID', defaultValue: ''),
    iosBundleId: String.fromEnvironment('FIREBASE_IOS_BUNDLE_ID', defaultValue: ''),
  );

  static const FirebaseOptions _windows = FirebaseOptions(
    apiKey: String.fromEnvironment('FIREBASE_API_KEY', defaultValue: ''),
    appId: String.fromEnvironment('FIREBASE_APP_ID', defaultValue: ''),
    messagingSenderId:
        String.fromEnvironment('FIREBASE_SENDER_ID', defaultValue: ''),
    projectId: String.fromEnvironment('FIREBASE_PROJECT_ID', defaultValue: ''),
    storageBucket:
        String.fromEnvironment('FIREBASE_STORAGE_BUCKET', defaultValue: ''),
  );

  static const FirebaseOptions _linux = FirebaseOptions(
    apiKey: String.fromEnvironment('FIREBASE_API_KEY', defaultValue: ''),
    appId: String.fromEnvironment('FIREBASE_APP_ID', defaultValue: ''),
    messagingSenderId:
        String.fromEnvironment('FIREBASE_SENDER_ID', defaultValue: ''),
    projectId: String.fromEnvironment('FIREBASE_PROJECT_ID', defaultValue: ''),
    storageBucket:
        String.fromEnvironment('FIREBASE_STORAGE_BUCKET', defaultValue: ''),
  );
}
