import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase_auth;
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';

import 'config.dart';
import 'models.dart';

abstract class AuthService {
  Stream<AuthUser?> authStateChanges();
  AuthUser? get currentUser;
  Future<AuthUser?> signInWithGoogle();
  Future<AuthUser?> signInWithMockRole(UserRole role);
  Future<void> signOut();
}

class FirebaseAuthService implements AuthService {
  FirebaseAuthService({
    required firebase_auth.FirebaseAuth auth,
    required GoogleSignIn googleSignIn,
  })  : _auth = auth,
        _googleSignIn = googleSignIn;

  final firebase_auth.FirebaseAuth _auth;
  final GoogleSignIn _googleSignIn;

  @override
  Stream<AuthUser?> authStateChanges() {
    return _auth.authStateChanges().map(_mapUser);
  }

  @override
  AuthUser? get currentUser => _mapUser(_auth.currentUser);

  @override
  Future<AuthUser?> signInWithGoogle() async {
    final googleUser = await _googleSignIn.signIn();
    if (googleUser == null) {
      return null;
    }
    final googleAuth = await googleUser.authentication;
    final credential = firebase_auth.GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    final userCredential = await _auth.signInWithCredential(credential);
    return _mapUser(userCredential.user);
  }

  @override
  Future<AuthUser?> signInWithMockRole(UserRole role) async {
    throw UnsupportedError('Mock sign-in is not supported in Firebase mode.');
  }

  @override
  Future<void> signOut() async {
    await _auth.signOut();
    await _googleSignIn.signOut();
  }

  AuthUser? _mapUser(firebase_auth.User? user) {
    if (user == null) {
      return null;
    }
    return AuthUser(
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? user.email ?? 'User',
    );
  }
}

class MockAuthService implements AuthService {
  MockAuthService() {
    _controller.add(null);
  }

  final StreamController<AuthUser?> _controller =
      StreamController<AuthUser?>.broadcast();
  AuthUser? _current;

  @override
  Stream<AuthUser?> authStateChanges() => _controller.stream;

  @override
  AuthUser? get currentUser => _current;

  @override
  Future<AuthUser?> signInWithGoogle() async {
    return signInWithMockRole(UserRole.officer);
  }

  @override
  Future<AuthUser?> signInWithMockRole(UserRole role) async {
    _current = AuthUser(
      uid: role == UserRole.supervisor ? 'mock-supervisor' : 'mock-officer',
      email: role == UserRole.supervisor
          ? 'supervisor@secure-report.test'
          : 'officer@secure-report.test',
      displayName: role == UserRole.supervisor ? 'Sarah Blake' : 'John Carter',
    );
    _controller.add(_current);
    return _current;
  }

  @override
  Future<void> signOut() async {
    _current = null;
    _controller.add(null);
  }
}

abstract class UserRepository {
  Future<UserProfile> loadProfile(AuthUser user);
  Future<void> updateDeviceToken(String uid, String token);
}

class FirebaseUserRepository implements UserRepository {
  FirebaseUserRepository(this._firestore);

  final FirebaseFirestore _firestore;

  @override
  Future<UserProfile> loadProfile(AuthUser user) async {
    final whitelistDoc = await _firestore
        .collection('whitelist')
        .doc(user.email.toLowerCase())
        .get();

    if (!whitelistDoc.exists) {
      return UserProfile(
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: UserRole.officer,
        isApproved: false,
        siteIds: const [],
        createdAt: DateTime.now(),
      );
    }

    final whitelistData = whitelistDoc.data() ?? {};
    final role =
        userRoleFromString(whitelistData['role'] as String? ?? 'officer');
    final siteIds =
        List<String>.from(whitelistData['siteIds'] as List<dynamic>? ?? []);
    final profile = UserProfile(
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: role,
      isApproved: true,
      siteIds: siteIds,
      createdAt: DateTime.now(),
    );

    await _firestore
        .collection('users')
        .doc(user.uid)
        .set(profile.toMap(), SetOptions(merge: true));
    return profile;
  }

  @override
  Future<void> updateDeviceToken(String uid, String token) async {
    await _firestore.collection('users').doc(uid).set({
      'deviceTokens': FieldValue.arrayUnion([token]),
    }, SetOptions(merge: true));
  }
}

class MockUserRepository implements UserRepository {
  @override
  Future<UserProfile> loadProfile(AuthUser user) async {
    final role =
        user.email.contains('supervisor') ? UserRole.supervisor : UserRole.officer;
    return UserProfile(
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: role,
      isApproved: true,
      siteIds: const ['silver-spring', 'capitol-annex', 'federal-plaza'],
      createdAt: DateTime.now(),
    );
  }

  @override
  Future<void> updateDeviceToken(String uid, String token) async {
    return;
  }
}

abstract class WeatherService {
  Future<WeatherData> fetchWeather();
}

class HttpWeatherService implements WeatherService {
  HttpWeatherService(this._config);

  final AppConfig _config;

  @override
  Future<WeatherData> fetchWeather() async {
    if (_config.weatherApiKey.isEmpty) {
      return MockWeatherService().fetchWeather();
    }

    final uri = Uri.parse(_config.weatherBaseUrl).replace(queryParameters: {
      'lat': _config.weatherLatitude.toString(),
      'lon': _config.weatherLongitude.toString(),
      'units': 'imperial',
      'appid': _config.weatherApiKey,
    });
    final response = await http.get(uri);
    if (response.statusCode != 200) {
      throw StateError('Weather API error: ${response.statusCode}');
    }
    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final main = data['main'] as Map<String, dynamic>? ?? {};
    final weatherList = data['weather'] as List<dynamic>? ?? [];
    final weather = weatherList.isNotEmpty
        ? weatherList.first as Map<String, dynamic>
        : <String, dynamic>{};
    return WeatherData(
      location: data['name'] as String? ?? 'Silver Spring, MD',
      temperatureF: (main['temp'] as num? ?? 72).round(),
      condition: weather['main'] as String? ?? 'Clear',
      iconCode: weather['icon'] as String? ?? '01d',
    );
  }
}

class MockWeatherService implements WeatherService {
  @override
  Future<WeatherData> fetchWeather() async {
    return const WeatherData(
      location: 'Silver Spring, MD',
      temperatureF: 72,
      condition: 'Partly Cloudy',
      iconCode: '02d',
    );
  }
}

abstract class SiteRepository {
  Stream<List<Site>> watchSites();
  Future<List<Site>> fetchSites();
}

class FirebaseSiteRepository implements SiteRepository {
  FirebaseSiteRepository(this._firestore);

  final FirebaseFirestore _firestore;

  @override
  Stream<List<Site>> watchSites() {
    return _firestore.collection('sites').snapshots().map(
          (snapshot) => snapshot.docs
              .map((doc) => Site.fromMap(doc.id, doc.data()))
              .toList(),
        );
  }

  @override
  Future<List<Site>> fetchSites() async {
    final snapshot = await _firestore.collection('sites').get();
    return snapshot.docs.map((doc) => Site.fromMap(doc.id, doc.data())).toList();
  }
}

class MockSiteRepository implements SiteRepository {
  @override
  Stream<List<Site>> watchSites() async* {
    yield _mockSites;
  }

  @override
  Future<List<Site>> fetchSites() async => _mockSites;
}

abstract class ScheduleRepository {
  Stream<List<ScheduleShift>> watchSchedule({
    required String userId,
    bool includeAll = false,
  });
}

class FirebaseScheduleRepository implements ScheduleRepository {
  FirebaseScheduleRepository(this._firestore);

  final FirebaseFirestore _firestore;

  @override
  Stream<List<ScheduleShift>> watchSchedule({
    required String userId,
    bool includeAll = false,
  }) {
    Query<Map<String, dynamic>> query = _firestore.collection('schedules');
    if (!includeAll) {
      query = query.where('userId', isEqualTo: userId);
    }
    return query.snapshots().map((snapshot) {
      final shifts = <ScheduleShift>[];
      for (final doc in snapshot.docs) {
        final data = doc.data();
        final shiftList = data['shifts'] as List<dynamic>? ?? [];
        for (final shiftData in shiftList) {
          final shiftMap = Map<String, dynamic>.from(shiftData as Map);
          shiftMap['userId'] = data['userId'] ?? userId;
          shifts.add(ScheduleShift.fromMap(shiftMap));
        }
      }
      shifts.sort((a, b) => a.start.compareTo(b.start));
      return shifts;
    });
  }
}

class MockScheduleRepository implements ScheduleRepository {
  @override
  Stream<List<ScheduleShift>> watchSchedule({
    required String userId,
    bool includeAll = false,
  }) async* {
    yield _mockSchedule;
  }
}

abstract class ReportRepository {
  Stream<List<Report>> watchReports({String? userId});
  Future<void> submitReport(Report report, List<String> localMediaPaths);
}

class FirebaseReportRepository implements ReportRepository {
  FirebaseReportRepository(this._firestore, this._storage, this._functions);

  final FirebaseFirestore _firestore;
  final FirebaseStorage _storage;
  final FirebaseFunctions _functions;

  @override
  Stream<List<Report>> watchReports({String? userId}) {
    Query<Map<String, dynamic>> query = _firestore
        .collection('reports')
        .orderBy('updatedAt', descending: true);
    if (userId != null) {
      query = query.where('userId', isEqualTo: userId);
    }
    return query.snapshots().map(
          (snapshot) => snapshot.docs
              .map((doc) => Report.fromMap(doc.id, doc.data()))
              .toList(),
        );
  }

  @override
  Future<void> submitReport(
    Report report,
    List<String> localMediaPaths,
  ) async {
    final reportId = report.id.isEmpty
        ? _firestore.collection('reports').doc().id
        : report.id;
    final List<String> uploadedUrls = [];
    for (final path in localMediaPaths) {
      final fileRef =
          _storage.ref('reports/$reportId/${path.split('/').last}');
      final uploadTask = await fileRef.putFile(
        File(path),
        SettableMetadata(contentType: 'image/jpeg'),
      );
      final url = await uploadTask.ref.getDownloadURL();
      uploadedUrls.add(url);
    }

    final updatedReport = report.copyWith(
      id: reportId,
      status: ReportStatus.submitted,
      updatedAt: DateTime.now(),
      mediaUrls: uploadedUrls,
    );
    await _firestore
        .collection('reports')
        .doc(reportId)
        .set(updatedReport.toMap(), SetOptions(merge: true));

    final callable = _functions.httpsCallable('submitReportToDrive');
    await callable.call({
      'reportId': reportId,
      'siteId': report.siteId,
      'userId': report.userId,
    });
  }
}

class MockReportRepository implements ReportRepository {
  @override
  Stream<List<Report>> watchReports({String? userId}) async* {
    yield _mockReports;
  }

  @override
  Future<void> submitReport(Report report, List<String> localMediaPaths) async {
    return;
  }
}

abstract class ChatRepository {
  Stream<List<Channel>> watchChannels(UserProfile profile);
  Stream<List<ChatMessage>> watchMessages(String channelId);
  Future<void> sendMessage({
    required Channel channel,
    required UserProfile sender,
    required String message,
  });
}

class FirebaseChatRepository implements ChatRepository {
  FirebaseChatRepository(this._firestore);

  final FirebaseFirestore _firestore;

  @override
  Stream<List<Channel>> watchChannels(UserProfile profile) {
    return _firestore.collection('channels').snapshots().map((snapshot) {
      final channels = snapshot.docs
          .map((doc) => Channel.fromMap(doc.id, doc.data()))
          .toList();
      if (profile.role == UserRole.supervisor) {
        return channels;
      }
      return channels.where((channel) {
        if (channel.type == ChannelType.organization) {
          return true;
        }
        return channel.siteId != null && profile.siteIds.contains(channel.siteId);
      }).toList();
    });
  }

  @override
  Stream<List<ChatMessage>> watchMessages(String channelId) {
    return _firestore
        .collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', descending: false)
        .snapshots()
        .map(
          (snapshot) => snapshot.docs
              .map((doc) => ChatMessage.fromMap(doc.id, doc.data()))
              .toList(),
        );
  }

  @override
  Future<void> sendMessage({
    required Channel channel,
    required UserProfile sender,
    required String message,
  }) async {
    final docRef = _firestore
        .collection('channels')
        .doc(channel.id)
        .collection('messages')
        .doc();
    final chatMessage = ChatMessage(
      id: docRef.id,
      channelId: channel.id,
      senderId: sender.uid,
      senderName: sender.displayName,
      message: message,
      timestamp: DateTime.now(),
    );
    await docRef.set(chatMessage.toMap());
  }
}

class MockChatRepository implements ChatRepository {
  @override
  Stream<List<Channel>> watchChannels(UserProfile profile) async* {
    yield _mockChannels;
  }

  @override
  Stream<List<ChatMessage>> watchMessages(String channelId) async* {
    yield _mockMessages;
  }

  @override
  Future<void> sendMessage({
    required Channel channel,
    required UserProfile sender,
    required String message,
  }) async {
    return;
  }
}

abstract class NotificationRepository {
  Future<void> sendNotification(NotificationRequest request);
}

class FirebaseNotificationRepository implements NotificationRepository {
  FirebaseNotificationRepository(this._firestore);

  final FirebaseFirestore _firestore;

  @override
  Future<void> sendNotification(NotificationRequest request) async {
    await _firestore
        .collection('notifications')
        .add(request.toMap());
  }
}

class MockNotificationRepository implements NotificationRepository {
  @override
  Future<void> sendNotification(NotificationRequest request) async {
    return;
  }
}

abstract class PatrolRepository {
  Future<void> logScan(PatrolScan scan);
}

class FirebasePatrolRepository implements PatrolRepository {
  FirebasePatrolRepository(this._firestore);

  final FirebaseFirestore _firestore;

  @override
  Future<void> logScan(PatrolScan scan) async {
    await _firestore.collection('patrols').add(scan.toMap());
  }
}

class MockPatrolRepository implements PatrolRepository {
  @override
  Future<void> logScan(PatrolScan scan) async {
    return;
  }
}

abstract class DraftStore {
  Future<void> saveDraft(ReportDraft draft);
  Future<List<ReportDraft>> loadDrafts(String userId);
}

class SharedPrefsDraftStore implements DraftStore {
  static const String _draftKey = 'report_drafts';

  @override
  Future<void> saveDraft(ReportDraft draft) async {
    final prefs = await SharedPreferences.getInstance();
    final existing = await loadDrafts(draft.userId);
    final updated = [...existing, draft];
    final encoded = updated.map((draft) => draft.toMap()).toList();
    await prefs.setString(_draftKey, jsonEncode(encoded));
  }

  @override
  Future<List<ReportDraft>> loadDrafts(String userId) async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_draftKey);
    if (raw == null) {
      return [];
    }
    try {
      final decoded = jsonDecode(raw) as List<dynamic>;
      return decoded
          .map((item) =>
              ReportDraft.fromMap(Map<String, dynamic>.from(item as Map)))
          .where((draft) => draft.userId == userId)
          .toList();
    } catch (_) {
      return [];
    }
  }
}

class MockDraftStore implements DraftStore {
  @override
  Future<void> saveDraft(ReportDraft draft) async {
    return;
  }

  @override
  Future<List<ReportDraft>> loadDrafts(String userId) async {
    return [];
  }
}

class LocationService {
  Future<Position?> getCurrentPosition() async {
    final permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      final requested = await Geolocator.requestPermission();
      if (requested == LocationPermission.denied ||
          requested == LocationPermission.deniedForever) {
        return null;
      }
    }
    return Geolocator.getCurrentPosition();
  }
}

class MockLocationService extends LocationService {
  @override
  Future<Position?> getCurrentPosition() async {
    return null;
  }
}

class QrScanParser {
  PatrolScan parse({
    required String raw,
    required UserProfile user,
    required GeoPoint? location,
  }) {
    final segments = raw.split('|');
    final siteId = segments.isNotEmpty ? segments.first : user.siteIds.firstOrNull ?? '';
    final scanType =
        segments.length > 1 ? patrolScanTypeFromString(segments[1]) : PatrolScanType.patrol;
    return PatrolScan(
      id: const Uuid().v4(),
      userId: user.uid,
      siteId: siteId,
      scanType: scanType,
      timestamp: DateTime.now(),
      location: location,
      rawCode: raw,
    );
  }
}

class NotificationService {
  NotificationService(this._messaging, this._userRepository);

  final FirebaseMessaging _messaging;
  final UserRepository _userRepository;

  Future<void> registerDeviceToken(String uid) async {
    if (kIsWeb) {
      return;
    }
    final token = await _messaging.getToken();
    if (token != null && token.isNotEmpty) {
      await _userRepository.updateDeviceToken(uid, token);
    }
  }
}

final List<Site> _mockSites = [
  const Site(
    id: 'silver-spring',
    name: 'Silver Spring HQ',
    address: '10304 New Hampshire Ave, Silver Spring, MD',
  ),
  const Site(
    id: 'capitol-annex',
    name: 'Capitol Annex',
    address: 'Washington, DC',
  ),
  const Site(
    id: 'federal-plaza',
    name: 'Federal Plaza',
    address: 'Federal Plaza, DC',
  ),
];

final List<ScheduleShift> _mockSchedule = [
  ScheduleShift(
    userId: 'mock-officer',
    siteId: 'silver-spring',
    start: DateTime.now().add(const Duration(hours: 2)),
    end: DateTime.now().add(const Duration(hours: 10)),
  ),
  ScheduleShift(
    userId: 'mock-officer',
    siteId: 'capitol-annex',
    start: DateTime.now().add(const Duration(days: 1, hours: 2)),
    end: DateTime.now().add(const Duration(days: 1, hours: 10)),
  ),
];

final List<Report> _mockReports = [
  Report(
    id: 'report-1',
    title: 'Suspicious activity near loading dock',
    details: 'Unrecognized vehicle observed near loading dock.',
    userId: 'mock-officer',
    siteId: 'silver-spring',
    status: ReportStatus.submitted,
    createdAt: DateTime.now().subtract(const Duration(days: 1)),
    updatedAt: DateTime.now().subtract(const Duration(hours: 2)),
    mediaUrls: const [],
  ),
  Report(
    id: 'report-2',
    title: 'Routine patrol completed',
    details: 'Completed standard patrol route with no incidents.',
    userId: 'mock-officer',
    siteId: 'capitol-annex',
    status: ReportStatus.draft,
    createdAt: DateTime.now().subtract(const Duration(days: 2)),
    updatedAt: DateTime.now().subtract(const Duration(days: 1)),
    mediaUrls: const [],
  ),
];

final List<Channel> _mockChannels = [
  const Channel(
    id: 'org',
    name: 'Organization',
    type: ChannelType.organization,
  ),
  const Channel(
    id: 'silver-spring',
    name: 'Silver Spring HQ',
    type: ChannelType.site,
    siteId: 'silver-spring',
  ),
];

final List<ChatMessage> _mockMessages = [
  ChatMessage(
    id: 'msg-1',
    channelId: 'org',
    senderId: 'dispatcher',
    senderName: 'Dispatcher',
    message: 'Reminder: submit reports before shift end.',
    timestamp: DateTime.now().subtract(const Duration(minutes: 10)),
  ),
  ChatMessage(
    id: 'msg-2',
    channelId: 'org',
    senderId: 'mock-officer',
    senderName: 'John Carter',
    message: 'Copy that. Starting second round now.',
    timestamp: DateTime.now().subtract(const Duration(minutes: 5)),
  ),
];

extension FirstOrNull<T> on List<T> {
  T? get firstOrNull => isEmpty ? null : first;
}
