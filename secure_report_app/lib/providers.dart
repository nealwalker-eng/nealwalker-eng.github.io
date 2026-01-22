import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase_auth;
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_sign_in/google_sign_in.dart';

import 'config.dart';
import 'models.dart';
import 'services.dart';

final appConfigProvider = Provider<AppConfig>((ref) {
  return const AppConfig(
    useMocks: true,
    firebaseReady: false,
    weatherApiKey: '',
    weatherBaseUrl: 'https://api.openweathermap.org/data/2.5/weather',
    weatherLatitude: 38.9907,
    weatherLongitude: -77.0261,
  );
});

final firestoreProvider = Provider<FirebaseFirestore?>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return null;
  }
  final firestore = FirebaseFirestore.instance;
  firestore.settings = const Settings(persistenceEnabled: true);
  return firestore;
});

final authServiceProvider = Provider<AuthService>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockAuthService();
  }
  return FirebaseAuthService(
    auth: firebase_auth.FirebaseAuth.instance,
    googleSignIn: GoogleSignIn(),
  );
});

final userRepositoryProvider = Provider<UserRepository>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockUserRepository();
  }
  final firestore = ref.watch(firestoreProvider)!;
  return FirebaseUserRepository(firestore);
});

final notificationServiceProvider = Provider<NotificationService?>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return null;
  }
  final userRepository = ref.watch(userRepositoryProvider);
  return NotificationService(FirebaseMessaging.instance, userRepository);
});

final authControllerProvider =
    StateNotifierProvider<AuthController, AuthState>((ref) {
  final authService = ref.watch(authServiceProvider);
  final userRepository = ref.watch(userRepositoryProvider);
  final notificationService = ref.watch(notificationServiceProvider);
  return AuthController(authService, userRepository, notificationService);
});

final weatherServiceProvider = Provider<WeatherService>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockWeatherService();
  }
  return HttpWeatherService(config);
});

final weatherProvider = FutureProvider<WeatherData>((ref) async {
  final service = ref.watch(weatherServiceProvider);
  return service.fetchWeather();
});

final siteRepositoryProvider = Provider<SiteRepository>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockSiteRepository();
  }
  final firestore = ref.watch(firestoreProvider)!;
  return FirebaseSiteRepository(firestore);
});

final sitesProvider = StreamProvider<List<Site>>((ref) {
  final repository = ref.watch(siteRepositoryProvider);
  return repository.watchSites();
});

final scheduleRepositoryProvider = Provider<ScheduleRepository>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockScheduleRepository();
  }
  final firestore = ref.watch(firestoreProvider)!;
  return FirebaseScheduleRepository(firestore);
});

final scheduleProvider = StreamProvider<List<ScheduleShift>>((ref) {
  final authState = ref.watch(authControllerProvider);
  final profile = authState.profile;
  if (profile == null) {
    return const Stream.empty();
  }
  final repository = ref.watch(scheduleRepositoryProvider);
  return repository.watchSchedule(
    userId: profile.uid,
    includeAll: profile.role == UserRole.supervisor,
  );
});

final reportRepositoryProvider = Provider<ReportRepository>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockReportRepository();
  }
  final firestore = ref.watch(firestoreProvider)!;
  return FirebaseReportRepository(
    firestore,
    FirebaseStorage.instance,
    FirebaseFunctions.instance,
  );
});

final reportsProvider = StreamProvider<List<Report>>((ref) {
  final authState = ref.watch(authControllerProvider);
  final profile = authState.profile;
  if (profile == null) {
    return const Stream.empty();
  }
  final repository = ref.watch(reportRepositoryProvider);
  return repository.watchReports(
    userId: profile.role == UserRole.supervisor ? null : profile.uid,
  );
});

final draftStoreProvider = Provider<DraftStore>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockDraftStore();
  }
  return SharedPrefsDraftStore();
});

final draftsProvider = FutureProvider<List<ReportDraft>>((ref) async {
  final authState = ref.watch(authControllerProvider);
  final profile = authState.profile;
  if (profile == null) {
    return [];
  }
  final store = ref.watch(draftStoreProvider);
  return store.loadDrafts(profile.uid);
});

final chatRepositoryProvider = Provider<ChatRepository>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockChatRepository();
  }
  final firestore = ref.watch(firestoreProvider)!;
  return FirebaseChatRepository(firestore);
});

final chatChannelsProvider = StreamProvider<List<Channel>>((ref) {
  final authState = ref.watch(authControllerProvider);
  final profile = authState.profile;
  if (profile == null) {
    return const Stream.empty();
  }
  final repository = ref.watch(chatRepositoryProvider);
  return repository.watchChannels(profile);
});

final chatMessagesProvider =
    StreamProvider.family<List<ChatMessage>, String>((ref, channelId) {
  final repository = ref.watch(chatRepositoryProvider);
  return repository.watchMessages(channelId);
});

final notificationRepositoryProvider = Provider<NotificationRepository>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockNotificationRepository();
  }
  final firestore = ref.watch(firestoreProvider)!;
  return FirebaseNotificationRepository(firestore);
});

final patrolRepositoryProvider = Provider<PatrolRepository>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockPatrolRepository();
  }
  final firestore = ref.watch(firestoreProvider)!;
  return FirebasePatrolRepository(firestore);
});

final locationServiceProvider = Provider<LocationService>((ref) {
  final config = ref.watch(appConfigProvider);
  if (config.useMocks) {
    return MockLocationService();
  }
  return LocationService();
});

final qrScanParserProvider = Provider<QrScanParser>((ref) => QrScanParser());

class AuthState {
  const AuthState({
    required this.status,
    this.profile,
    this.error,
  });

  final AuthStatus status;
  final UserProfile? profile;
  final String? error;

  factory AuthState.loading() =>
      const AuthState(status: AuthStatus.loading);

  factory AuthState.signedOut() =>
      const AuthState(status: AuthStatus.signedOut);

  factory AuthState.denied(UserProfile profile) =>
      AuthState(status: AuthStatus.denied, profile: profile);

  factory AuthState.signedIn(UserProfile profile) =>
      AuthState(status: AuthStatus.signedIn, profile: profile);

  AuthState copyWith({
    AuthStatus? status,
    UserProfile? profile,
    String? error,
  }) {
    return AuthState(
      status: status ?? this.status,
      profile: profile ?? this.profile,
      error: error ?? this.error,
    );
  }
}

enum AuthStatus { loading, signedOut, denied, signedIn }

class AuthController extends StateNotifier<AuthState> {
  AuthController(
    this._authService,
    this._userRepository,
    this._notificationService,
  ) : super(AuthState.loading()) {
    _subscription = _authService.authStateChanges().listen(_handleAuthChange);
  }

  final AuthService _authService;
  final UserRepository _userRepository;
  final NotificationService? _notificationService;
  late final StreamSubscription<AuthUser?> _subscription;

  Future<void> signInWithGoogle() async {
    state = AuthState.loading();
    try {
      await _authService.signInWithGoogle();
    } catch (error) {
      state = state.copyWith(
        status: AuthStatus.signedOut,
        error: error.toString(),
      );
    }
  }

  Future<void> signInWithMockRole(UserRole role) async {
    state = AuthState.loading();
    try {
      await _authService.signInWithMockRole(role);
    } catch (error) {
      state = state.copyWith(
        status: AuthStatus.signedOut,
        error: error.toString(),
      );
    }
  }

  Future<void> signOut() async {
    state = AuthState.loading();
    await _authService.signOut();
  }

  Future<void> _handleAuthChange(AuthUser? user) async {
    if (user == null) {
      state = AuthState.signedOut();
      return;
    }
    try {
      final profile = await _userRepository.loadProfile(user);
      if (!profile.isApproved) {
        state = AuthState.denied(profile);
        return;
      }
      await _notificationService?.registerDeviceToken(profile.uid);
      state = AuthState.signedIn(profile);
    } catch (error) {
      state = AuthState.signedOut().copyWith(error: error.toString());
    }
  }

  @override
  void dispose() {
    _subscription.cancel();
    super.dispose();
  }
}
