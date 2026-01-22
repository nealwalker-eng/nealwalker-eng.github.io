import 'package:cloud_firestore/cloud_firestore.dart';

enum UserRole { officer, supervisor }

UserRole userRoleFromString(String value) {
  switch (value.toLowerCase()) {
    case 'supervisor':
      return UserRole.supervisor;
    case 'officer':
    default:
      return UserRole.officer;
  }
}

String userRoleToString(UserRole role) => role.name;

class AuthUser {
  const AuthUser({
    required this.uid,
    required this.email,
    required this.displayName,
  });

  final String uid;
  final String email;
  final String displayName;
}

class UserProfile {
  const UserProfile({
    required this.uid,
    required this.email,
    required this.displayName,
    required this.role,
    required this.isApproved,
    required this.siteIds,
    required this.createdAt,
  });

  final String uid;
  final String email;
  final String displayName;
  final UserRole role;
  final bool isApproved;
  final List<String> siteIds;
  final DateTime createdAt;

  factory UserProfile.fromMap(String uid, Map<String, dynamic> data) {
    return UserProfile(
      uid: uid,
      email: data['email'] as String? ?? '',
      displayName: data['displayName'] as String? ?? '',
      role: userRoleFromString(data['role'] as String? ?? 'officer'),
      isApproved: data['isApproved'] as bool? ?? false,
      siteIds: List<String>.from(data['siteIds'] as List<dynamic>? ?? []),
      createdAt: _toDateTime(data['createdAt']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'email': email,
      'displayName': displayName,
      'role': userRoleToString(role),
      'isApproved': isApproved,
      'siteIds': siteIds,
      'createdAt': Timestamp.fromDate(createdAt),
    };
  }
}

class Site {
  const Site({
    required this.id,
    required this.name,
    required this.address,
    this.location,
    this.driveFolderId,
  });

  final String id;
  final String name;
  final String address;
  final GeoPoint? location;
  final String? driveFolderId;

  factory Site.fromMap(String id, Map<String, dynamic> data) {
    return Site(
      id: id,
      name: data['name'] as String? ?? '',
      address: data['address'] as String? ?? '',
      location: data['location'] as GeoPoint?,
      driveFolderId: data['driveFolderId'] as String?,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'address': address,
      'location': location,
      'driveFolderId': driveFolderId,
    };
  }
}

enum ReportStatus { draft, submitted }

ReportStatus reportStatusFromString(String value) {
  switch (value.toLowerCase()) {
    case 'submitted':
      return ReportStatus.submitted;
    case 'draft':
    default:
      return ReportStatus.draft;
  }
}

String reportStatusToString(ReportStatus status) => status.name;

class Report {
  const Report({
    required this.id,
    required this.title,
    required this.details,
    required this.userId,
    required this.siteId,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    required this.mediaUrls,
  });

  final String id;
  final String title;
  final String details;
  final String userId;
  final String siteId;
  final ReportStatus status;
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<String> mediaUrls;

  Report copyWith({
    String? id,
    String? title,
    String? details,
    String? userId,
    String? siteId,
    ReportStatus? status,
    DateTime? createdAt,
    DateTime? updatedAt,
    List<String>? mediaUrls,
  }) {
    return Report(
      id: id ?? this.id,
      title: title ?? this.title,
      details: details ?? this.details,
      userId: userId ?? this.userId,
      siteId: siteId ?? this.siteId,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      mediaUrls: mediaUrls ?? this.mediaUrls,
    );
  }

  factory Report.fromMap(String id, Map<String, dynamic> data) {
    return Report(
      id: id,
      title: data['title'] as String? ?? '',
      details: data['details'] as String? ?? '',
      userId: data['userId'] as String? ?? '',
      siteId: data['siteId'] as String? ?? '',
      status: reportStatusFromString(data['status'] as String? ?? 'draft'),
      createdAt: _toDateTime(data['createdAt']) ?? DateTime.now(),
      updatedAt: _toDateTime(data['updatedAt']) ?? DateTime.now(),
      mediaUrls: List<String>.from(data['mediaUrls'] as List<dynamic>? ?? []),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'title': title,
      'details': details,
      'userId': userId,
      'siteId': siteId,
      'status': reportStatusToString(status),
      'createdAt': Timestamp.fromDate(createdAt),
      'updatedAt': Timestamp.fromDate(updatedAt),
      'mediaUrls': mediaUrls,
    };
  }
}

class ReportDraft {
  const ReportDraft({
    required this.id,
    required this.title,
    required this.details,
    required this.userId,
    required this.siteId,
    required this.createdAt,
    required this.localMediaPaths,
  });

  final String id;
  final String title;
  final String details;
  final String userId;
  final String siteId;
  final DateTime createdAt;
  final List<String> localMediaPaths;

  factory ReportDraft.fromMap(Map<String, dynamic> data) {
    final createdAtRaw = data['createdAt'] as String?;
    DateTime createdAt;
    try {
      createdAt = createdAtRaw == null ? DateTime.now() : DateTime.parse(createdAtRaw);
    } catch (_) {
      createdAt = DateTime.now();
    }
    return ReportDraft(
      id: data['id'] as String? ?? '',
      title: data['title'] as String? ?? '',
      details: data['details'] as String? ?? '',
      userId: data['userId'] as String? ?? '',
      siteId: data['siteId'] as String? ?? '',
      createdAt: createdAt,
      localMediaPaths:
          List<String>.from(data['localMediaPaths'] as List<dynamic>? ?? []),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'details': details,
      'userId': userId,
      'siteId': siteId,
      'createdAt': createdAt.toIso8601String(),
      'localMediaPaths': localMediaPaths,
    };
  }
}

class ScheduleShift {
  const ScheduleShift({
    required this.userId,
    required this.siteId,
    required this.start,
    required this.end,
  });

  final String userId;
  final String siteId;
  final DateTime start;
  final DateTime end;

  factory ScheduleShift.fromMap(Map<String, dynamic> data) {
    return ScheduleShift(
      userId: data['userId'] as String? ?? '',
      siteId: data['siteId'] as String? ?? '',
      start: _toDateTime(data['start']) ?? DateTime.now(),
      end: _toDateTime(data['end']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'userId': userId,
      'siteId': siteId,
      'start': Timestamp.fromDate(start),
      'end': Timestamp.fromDate(end),
    };
  }
}

enum ChannelType { organization, site }

ChannelType channelTypeFromString(String value) {
  switch (value.toLowerCase()) {
    case 'organization':
      return ChannelType.organization;
    case 'site':
    default:
      return ChannelType.site;
  }
}

String channelTypeToString(ChannelType type) => type.name;

class Channel {
  const Channel({
    required this.id,
    required this.name,
    required this.type,
    this.siteId,
  });

  final String id;
  final String name;
  final ChannelType type;
  final String? siteId;

  factory Channel.fromMap(String id, Map<String, dynamic> data) {
    return Channel(
      id: id,
      name: data['name'] as String? ?? '',
      type: channelTypeFromString(data['type'] as String? ?? 'site'),
      siteId: data['siteId'] as String?,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'type': channelTypeToString(type),
      'siteId': siteId,
    };
  }
}

class ChatMessage {
  const ChatMessage({
    required this.id,
    required this.channelId,
    required this.senderId,
    required this.senderName,
    required this.message,
    required this.timestamp,
  });

  final String id;
  final String channelId;
  final String senderId;
  final String senderName;
  final String message;
  final DateTime timestamp;

  factory ChatMessage.fromMap(String id, Map<String, dynamic> data) {
    return ChatMessage(
      id: id,
      channelId: data['channelId'] as String? ?? '',
      senderId: data['senderId'] as String? ?? '',
      senderName: data['senderName'] as String? ?? '',
      message: data['message'] as String? ?? '',
      timestamp: _toDateTime(data['timestamp']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'channelId': channelId,
      'senderId': senderId,
      'senderName': senderName,
      'message': message,
      'timestamp': Timestamp.fromDate(timestamp),
    };
  }
}

class WeatherData {
  const WeatherData({
    required this.location,
    required this.temperatureF,
    required this.condition,
    required this.iconCode,
  });

  final String location;
  final int temperatureF;
  final String condition;
  final String iconCode;
}

class NotificationRequest {
  const NotificationRequest({
    required this.title,
    required this.body,
    required this.senderId,
    required this.targets,
    required this.createdAt,
  });

  final String title;
  final String body;
  final String senderId;
  final Map<String, dynamic> targets;
  final DateTime createdAt;

  Map<String, dynamic> toMap() {
    return {
      'title': title,
      'body': body,
      'senderId': senderId,
      'targets': targets,
      'createdAt': Timestamp.fromDate(createdAt),
    };
  }
}

enum PatrolScanType { signIn, signOut, patrol }

PatrolScanType patrolScanTypeFromString(String value) {
  switch (value.toLowerCase()) {
    case 'signout':
    case 'sign_out':
      return PatrolScanType.signOut;
    case 'patrol':
      return PatrolScanType.patrol;
    case 'signin':
    case 'sign_in':
    default:
      return PatrolScanType.signIn;
  }
}

String patrolScanTypeToString(PatrolScanType type) => type.name;

class PatrolScan {
  const PatrolScan({
    required this.id,
    required this.userId,
    required this.siteId,
    required this.scanType,
    required this.timestamp,
    this.location,
    this.rawCode,
  });

  final String id;
  final String userId;
  final String siteId;
  final PatrolScanType scanType;
  final DateTime timestamp;
  final GeoPoint? location;
  final String? rawCode;

  Map<String, dynamic> toMap() {
    return {
      'userId': userId,
      'siteId': siteId,
      'scanType': patrolScanTypeToString(scanType),
      'timestamp': Timestamp.fromDate(timestamp),
      'location': location,
      'rawCode': rawCode,
    };
  }
}

DateTime? _toDateTime(dynamic value) {
  if (value == null) {
    return null;
  }
  if (value is Timestamp) {
    return value.toDate();
  }
  if (value is DateTime) {
    return value;
  }
  return null;
}
