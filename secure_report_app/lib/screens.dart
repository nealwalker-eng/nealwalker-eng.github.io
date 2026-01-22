import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:uuid/uuid.dart';

import 'models.dart';
import 'providers.dart';
import 'services.dart';
import 'widgets.dart';

class Routes {
  static const String home = '/home';
  static const String reportNew = '/reports/new';
  static const String reportList = '/reports';
  static const String chat = '/chat';
  static const String schedule = '/schedule';
  static const String qrScan = '/scan';
  static const String notificationCompose = '/notifications/compose';
}

class AuthGate extends ConsumerWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authControllerProvider);
    switch (authState.status) {
      case AuthStatus.loading:
        return const Scaffold(
          body: Center(child: CircularProgressIndicator()),
        );
      case AuthStatus.signedOut:
        return const LoginScreen();
      case AuthStatus.denied:
        return const AccessDeniedScreen();
      case AuthStatus.signedIn:
        return const HomeScreen();
    }
  }
}

class LoginScreen extends ConsumerWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authController = ref.read(authControllerProvider.notifier);
    final config = ref.watch(appConfigProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('SecureReport Login')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Sign in with your approved Google Workspace account.',
              style: TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: authController.signInWithGoogle,
              icon: const Icon(Icons.lock_open),
              label: const Text('Sign in with Google'),
            ),
            if (config.useMocks) ...[
              const SizedBox(height: 16),
              const Text('Mock Sign-In (local testing)'),
              const SizedBox(height: 8),
              ElevatedButton.icon(
                onPressed: () => authController.signInWithMockRole(UserRole.officer),
                icon: const Icon(Icons.shield_outlined),
                label: const Text('Sign in as Officer'),
              ),
              const SizedBox(height: 8),
              ElevatedButton.icon(
                onPressed: () =>
                    authController.signInWithMockRole(UserRole.supervisor),
                icon: const Icon(Icons.admin_panel_settings_outlined),
                label: const Text('Sign in as Supervisor'),
              ),
            ],
            const Spacer(),
            const Text(
              'SecureReport uses Google SSO with an email whitelist and role '
              'claims enforced by Firebase.',
            ),
          ],
        ),
      ),
    );
  }
}

class AccessDeniedScreen extends ConsumerWidget {
  const AccessDeniedScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authController = ref.read(authControllerProvider.notifier);

    return Scaffold(
      appBar: AppBar(title: const Text('Access Denied')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Icon(Icons.block, size: 64, color: Colors.redAccent),
            const SizedBox(height: 16),
            const Text(
              'Your email is not approved for SecureReport.',
              style: TextStyle(fontSize: 18),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 12),
            const Text(
              'Contact your supervisor to be added to the access whitelist.',
              textAlign: TextAlign.center,
            ),
            const Spacer(),
            ElevatedButton(
              onPressed: authController.signOut,
              child: const Text('Back to login'),
            ),
          ],
        ),
      ),
    );
  }
}

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  String? _selectedSiteId;

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authControllerProvider);
    final profile = authState.profile!;
    final weatherAsync = ref.watch(weatherProvider);
    final sitesAsync = ref.watch(sitesProvider);
    final scheduleAsync = ref.watch(scheduleProvider);
    final reportsAsync = ref.watch(reportsProvider);
    final now = DateTime.now();
    final dateFormatter = DateFormat('EEE, MMM d • h:mm a');

    return Scaffold(
      appBar: AppBar(
        title: const Text('SecureReport'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => ref.read(authControllerProvider.notifier).signOut(),
            tooltip: 'Sign out',
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          SectionHeader(
            title: 'Welcome, ${profile.displayName}',
            subtitle:
                'Role: ${profile.role == UserRole.officer ? 'Officer' : 'Supervisor'}',
          ),
          const SizedBox(height: 16),
          InfoCard(
            title: 'Today',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(dateFormatter.format(now)),
                const SizedBox(height: 8),
                weatherAsync.when(
                  data: (weather) => Row(
                    children: [
                      const Icon(Icons.wb_sunny_outlined),
                      const SizedBox(width: 8),
                      Text(
                        '${weather.condition}, ${weather.temperatureF} F',
                      ),
                    ],
                  ),
                  loading: () => const LinearProgressIndicator(),
                  error: (_, __) => const Text(
                    'Weather unavailable (showing last cached data).',
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          InfoCard(
            title: 'Site Selection',
            child: sitesAsync.when(
              data: (sites) {
                _selectedSiteId ??= sites.isNotEmpty ? sites.first.id : null;
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    DropdownButtonFormField<String>(
                      value: _selectedSiteId,
                      items: sites
                          .map(
                            (site) => DropdownMenuItem(
                              value: site.id,
                              child: Text(site.name),
                            ),
                          )
                          .toList(),
                      onChanged: (value) {
                        setState(() => _selectedSiteId = value);
                      },
                      decoration: const InputDecoration(
                        labelText: 'Active Site',
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _selectedSiteId == null
                          ? 'No sites available.'
                          : 'Selected: ${sites.firstWhere((site) => site.id == _selectedSiteId).address}',
                    ),
                  ],
                );
              },
              loading: () => const LinearProgressIndicator(),
              error: (_, __) => const Text('Unable to load sites.'),
            ),
          ),
          const SizedBox(height: 16),
          InfoCard(
            title: 'Quick Actions',
            child: Wrap(
              spacing: 12,
              runSpacing: 12,
              children: [
                ActionButton(
                  label: 'Scan QR',
                  icon: Icons.qr_code_scanner,
                  onPressed: () =>
                      Navigator.pushNamed(context, Routes.qrScan),
                ),
                ActionButton(
                  label: 'New Report',
                  icon: Icons.note_add_outlined,
                  onPressed: () =>
                      Navigator.pushNamed(context, Routes.reportNew),
                ),
                ActionButton(
                  label: 'Reports',
                  icon: Icons.folder_open,
                  onPressed: () =>
                      Navigator.pushNamed(context, Routes.reportList),
                ),
                ActionButton(
                  label: 'Chat',
                  icon: Icons.chat_bubble_outline,
                  onPressed: () =>
                      Navigator.pushNamed(context, Routes.chat),
                ),
                ActionButton(
                  label: 'Schedule',
                  icon: Icons.calendar_month_outlined,
                  onPressed: () =>
                      Navigator.pushNamed(context, Routes.schedule),
                ),
                if (profile.role == UserRole.supervisor)
                  ActionButton(
                    label: 'Notify',
                    icon: Icons.notifications_active_outlined,
                    onPressed: () =>
                        Navigator.pushNamed(
                          context,
                          Routes.notificationCompose,
                        ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          InfoCard(
            title: 'Upcoming Schedule',
            child: scheduleAsync.when(
              data: (shifts) {
                if (shifts.isEmpty) {
                  return const Text('No upcoming shifts assigned.');
                }
                return Column(
                  children: shifts.take(3).map((shift) {
                    final time =
                        '${DateFormat('EEE').format(shift.start)} '
                        '${DateFormat('h:mm a').format(shift.start)} - '
                        '${DateFormat('h:mm a').format(shift.end)}';
                    return ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(time),
                      subtitle: Text('Site: ${shift.siteId}'),
                      leading: const Icon(Icons.schedule),
                    );
                  }).toList(),
                );
              },
              loading: () => const LinearProgressIndicator(),
              error: (_, __) => const Text('Unable to load schedule.'),
            ),
          ),
          const SizedBox(height: 16),
          InfoCard(
            title: 'Recent Reports',
            child: reportsAsync.when(
              data: (reports) {
                if (reports.isEmpty) {
                  return const Text('No reports yet.');
                }
                return Column(
                  children: reports.take(3).map((report) {
                    return ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(report.title),
                      subtitle: Text(
                        '${report.siteId} • ${DateFormat('MMM d, h:mm a').format(report.updatedAt)}',
                      ),
                      trailing: StatusChip(
                        status: reportStatusToString(report.status),
                      ),
                    );
                  }).toList(),
                );
              },
              loading: () => const LinearProgressIndicator(),
              error: (_, __) => const Text('Unable to load reports.'),
            ),
          ),
        ],
      ),
    );
  }
}

class ReportFormScreen extends ConsumerStatefulWidget {
  const ReportFormScreen({super.key});

  @override
  ConsumerState<ReportFormScreen> createState() => _ReportFormScreenState();
}

class _ReportFormScreenState extends ConsumerState<ReportFormScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _detailsController = TextEditingController();
  final ImagePicker _imagePicker = ImagePicker();
  final List<String> _attachments = [];
  String? _selectedSiteId;
  bool _submitting = false;

  @override
  void dispose() {
    _titleController.dispose();
    _detailsController.dispose();
    super.dispose();
  }

  Future<void> _addAttachment(ImageSource source) async {
    final picked = await _imagePicker.pickImage(source: source);
    if (picked != null) {
      setState(() => _attachments.add(picked.path));
    }
  }

  Future<void> _saveDraft() async {
    final authState = ref.read(authControllerProvider);
    final profile = authState.profile!;
    final draftStore = ref.read(draftStoreProvider);

    final draft = ReportDraft(
      id: const Uuid().v4(),
      title: _titleController.text.trim(),
      details: _detailsController.text.trim(),
      userId: profile.uid,
      siteId: _selectedSiteId ?? profile.siteIds.firstOrNull ?? '',
      createdAt: DateTime.now(),
      localMediaPaths: List.of(_attachments),
    );
    await draftStore.saveDraft(draft);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Draft saved locally.')),
      );
    }
  }

  Future<void> _submitReport() async {
    if (_submitting) return;
    final authState = ref.read(authControllerProvider);
    final profile = authState.profile!;
    final reportRepo = ref.read(reportRepositoryProvider);
    final title = _titleController.text.trim();
    final details = _detailsController.text.trim();
    final siteId = _selectedSiteId ?? profile.siteIds.firstOrNull ?? '';

    if (title.isEmpty || siteId.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Title and site are required.')),
      );
      return;
    }

    setState(() => _submitting = true);
    final report = Report(
      id: '',
      title: title,
      details: details,
      userId: profile.uid,
      siteId: siteId,
      status: ReportStatus.submitted,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      mediaUrls: const [],
    );
    try {
      await reportRepo.submitReport(report, _attachments);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Report submitted.')),
        );
        Navigator.pop(context);
      }
    } catch (error) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Submission failed: $error')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _submitting = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final sitesAsync = ref.watch(sitesProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('New Report')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            TextField(
              controller: _titleController,
              decoration: const InputDecoration(
                labelText: 'Report Title',
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _detailsController,
              maxLines: 6,
              decoration: const InputDecoration(
                labelText: 'Details',
                alignLabelWithHint: true,
              ),
            ),
            const SizedBox(height: 16),
            sitesAsync.when(
              data: (sites) {
                _selectedSiteId ??= sites.isNotEmpty ? sites.first.id : null;
                return DropdownButtonFormField<String>(
                  value: _selectedSiteId,
                  items: sites
                      .map(
                        (site) => DropdownMenuItem(
                          value: site.id,
                          child: Text(site.name),
                        ),
                      )
                      .toList(),
                  onChanged: (value) {
                    setState(() => _selectedSiteId = value);
                  },
                  decoration: const InputDecoration(labelText: 'Site'),
                );
              },
              loading: () => const LinearProgressIndicator(),
              error: (_, __) => const Text('Unable to load sites.'),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: [
                OutlinedButton.icon(
                  onPressed: () => _addAttachment(ImageSource.camera),
                  icon: const Icon(Icons.camera_alt_outlined),
                  label: const Text('Add Photo'),
                ),
                OutlinedButton.icon(
                  onPressed: () => _addAttachment(ImageSource.gallery),
                  icon: const Icon(Icons.photo_library_outlined),
                  label: const Text('Add from Gallery'),
                ),
              ],
            ),
            const SizedBox(height: 12),
            if (_attachments.isNotEmpty)
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: _attachments
                    .map(
                      (path) => Chip(
                        label: Text(path.split('/').last),
                        onDeleted: () {
                          setState(() => _attachments.remove(path));
                        },
                      ),
                    )
                    .toList(),
              ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _submitting ? null : _saveDraft,
              child: const Text('Save Draft'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _submitting ? null : _submitReport,
              child:
                  Text(_submitting ? 'Submitting...' : 'Submit Report'),
            ),
          ],
        ),
      ),
    );
  }
}

class ReportListScreen extends ConsumerWidget {
  const ReportListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reportsAsync = ref.watch(reportsProvider);
    final draftsAsync = ref.watch(draftsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Reports')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const SectionHeader(title: 'Submitted Reports'),
          const SizedBox(height: 12),
          reportsAsync.when(
            data: (reports) {
              if (reports.isEmpty) {
                return const Text('No submitted reports available.');
              }
              return Column(
                children: reports.map((report) {
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text(report.title),
                    subtitle: Text(
                      '${report.siteId} • ${DateFormat('MMM d, h:mm a').format(report.updatedAt)}',
                    ),
                    trailing: StatusChip(
                      status: reportStatusToString(report.status),
                    ),
                  );
                }).toList(),
              );
            },
            loading: () => const LinearProgressIndicator(),
            error: (_, __) => const Text('Unable to load reports.'),
          ),
          const SizedBox(height: 24),
          const SectionHeader(title: 'Drafts (Local)'),
          const SizedBox(height: 12),
          draftsAsync.when(
            data: (drafts) {
              if (drafts.isEmpty) {
                return const Text('No drafts saved locally.');
              }
              return Column(
                children: drafts.map((draft) {
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text(draft.title.isEmpty ? 'Untitled Draft' : draft.title),
                    subtitle: Text(
                      '${draft.siteId} • ${DateFormat('MMM d, h:mm a').format(draft.createdAt)}',
                    ),
                    trailing: const StatusChip(status: 'Draft'),
                  );
                }).toList(),
              );
            },
            loading: () => const LinearProgressIndicator(),
            error: (_, __) => const Text('Unable to load drafts.'),
          ),
        ],
      ),
    );
  }
}

class ScheduleScreen extends ConsumerWidget {
  const ScheduleScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final scheduleAsync = ref.watch(scheduleProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Weekly Schedule')),
      body: scheduleAsync.when(
        data: (shifts) {
          if (shifts.isEmpty) {
            return const Center(child: Text('No shifts scheduled.'));
          }
          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: shifts.length,
            separatorBuilder: (_, __) => const Divider(),
            itemBuilder: (context, index) {
              final shift = shifts[index];
              return ListTile(
                title: Text(
                  '${DateFormat('EEE, MMM d').format(shift.start)} '
                  '${DateFormat('h:mm a').format(shift.start)} - '
                  '${DateFormat('h:mm a').format(shift.end)}',
                ),
                subtitle: Text('Site: ${shift.siteId}'),
                leading: const Icon(Icons.schedule),
              );
            },
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (_, __) => const Center(child: Text('Unable to load schedule.')),
      ),
    );
  }
}

class ChatScreen extends ConsumerStatefulWidget {
  const ChatScreen({super.key});

  @override
  ConsumerState<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends ConsumerState<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  Channel? _selectedChannel;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _selectChannel(List<Channel> channels) {
    if (_selectedChannel != null || channels.isEmpty) {
      return;
    }
    setState(() => _selectedChannel = channels.first);
  }

  Future<void> _sendMessage() async {
    final message = _controller.text.trim();
    if (message.isEmpty || _selectedChannel == null) {
      return;
    }
    final authState = ref.read(authControllerProvider);
    final profile = authState.profile!;
    final repository = ref.read(chatRepositoryProvider);

    await repository.sendMessage(
      channel: _selectedChannel!,
      sender: profile,
      message: message,
    );
    _controller.clear();
  }

  @override
  Widget build(BuildContext context) {
    final channelsAsync = ref.watch(chatChannelsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Chat')),
      body: Column(
        children: [
          channelsAsync.when(
            data: (channels) {
              _selectChannel(channels);
              return Padding(
                padding: const EdgeInsets.all(12),
                child: DropdownButtonFormField<Channel>(
                  value: _selectedChannel,
                  items: channels
                      .map(
                        (channel) => DropdownMenuItem(
                          value: channel,
                          child: Text(channel.name),
                        ),
                      )
                      .toList(),
                  onChanged: (channel) {
                    setState(() => _selectedChannel = channel);
                  },
                  decoration: const InputDecoration(
                    labelText: 'Channel',
                  ),
                ),
              );
            },
            loading: () => const LinearProgressIndicator(),
            error: (_, __) => const Padding(
              padding: EdgeInsets.all(16),
              child: Text('Unable to load chat channels.'),
            ),
          ),
          Expanded(
            child: _selectedChannel == null
                ? const Center(child: Text('Select a channel to start.'))
                : Consumer(
                    builder: (context, ref, _) {
                      final messagesAsync = ref.watch(
                        chatMessagesProvider(_selectedChannel!.id),
                      );
                      return messagesAsync.when(
                        data: (messages) => ListView.builder(
                          padding: const EdgeInsets.all(16),
                          itemCount: messages.length,
                          itemBuilder: (context, index) {
                            final message = messages[index];
                            final isMine = message.senderId ==
                                ref.read(authControllerProvider).profile?.uid;
                            final alignment = isMine
                                ? Alignment.centerRight
                                : Alignment.centerLeft;
                            return Align(
                              alignment: alignment,
                              child: Container(
                                margin: const EdgeInsets.only(bottom: 12),
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: isMine
                                      ? Theme.of(context)
                                          .colorScheme
                                          .primary
                                          .withOpacity(0.1)
                                      : Theme.of(context)
                                          .colorScheme
                                          .surfaceVariant,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Column(
                                  crossAxisAlignment: isMine
                                      ? CrossAxisAlignment.end
                                      : CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      message.senderName,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(message.message),
                                    const SizedBox(height: 4),
                                    Text(
                                      DateFormat('h:mm a')
                                          .format(message.timestamp),
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                        loading: () => const Center(
                          child: CircularProgressIndicator(),
                        ),
                        error: (_, __) => const Center(
                          child: Text('Unable to load messages.'),
                        ),
                      );
                    },
                  ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: 'Type a message',
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class QrScanScreen extends ConsumerStatefulWidget {
  const QrScanScreen({super.key});

  @override
  ConsumerState<QrScanScreen> createState() => _QrScanScreenState();
}

class _QrScanScreenState extends ConsumerState<QrScanScreen> {
  bool _processing = false;

  Future<void> _handleScan(String rawValue) async {
    if (_processing) return;
    setState(() => _processing = true);
    final authState = ref.read(authControllerProvider);
    final profile = authState.profile!;
    final locationService = ref.read(locationServiceProvider);
    final parser = ref.read(qrScanParserProvider);
    final patrolRepository = ref.read(patrolRepositoryProvider);
    final position = await locationService.getCurrentPosition();
    final geoPoint = position == null
        ? null
        : GeoPoint(position.latitude, position.longitude);
    final scan = parser.parse(
      raw: rawValue,
      user: profile,
      location: geoPoint,
    );
    await patrolRepository.logScan(scan);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Scan logged successfully.')),
      );
      setState(() => _processing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('QR Scan')),
      body: Column(
        children: [
          Expanded(
            child: MobileScanner(
              onDetect: (capture) {
                if (capture.barcodes.isEmpty) {
                  return;
                }
                final rawValue = capture.barcodes.first.rawValue;
                if (rawValue != null && rawValue.isNotEmpty) {
                  _handleScan(rawValue);
                }
              },
            ),
          ),
          if (_processing)
            const Padding(
              padding: EdgeInsets.all(12),
              child: LinearProgressIndicator(),
            ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: ElevatedButton(
              onPressed: () => _handleScan('silver-spring|patrol'),
              child: const Text('Simulate Scan'),
            ),
          ),
        ],
      ),
    );
  }
}

class NotificationComposeScreen extends ConsumerStatefulWidget {
  const NotificationComposeScreen({super.key});

  @override
  ConsumerState<NotificationComposeScreen> createState() =>
      _NotificationComposeScreenState();
}

class _NotificationComposeScreenState
    extends ConsumerState<NotificationComposeScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _bodyController = TextEditingController();
  String _target = 'All Officers';

  @override
  void dispose() {
    _titleController.dispose();
    _bodyController.dispose();
    super.dispose();
  }

  Future<void> _send() async {
    final authState = ref.read(authControllerProvider);
    final profile = authState.profile!;
    final repository = ref.read(notificationRepositoryProvider);
    final sites = await ref.read(siteRepositoryProvider).fetchSites();

    final targets = <String, dynamic>{};
    if (_target == 'All Officers') {
      targets['roles'] = ['officer'];
    } else if (_target == 'All Supervisors') {
      targets['roles'] = ['supervisor'];
    } else {
      final match = sites.firstWhere(
        (site) => site.name == _target,
        orElse: () => sites.first,
      );
      targets['siteIds'] = [match.id];
    }

    final request = NotificationRequest(
      title: _titleController.text.trim(),
      body: _bodyController.text.trim(),
      senderId: profile.uid,
      targets: targets,
      createdAt: DateTime.now(),
    );
    await repository.sendNotification(request);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Notification queued.')),
      );
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authControllerProvider);
    final isSupervisor = authState.profile?.role == UserRole.supervisor;
    final sitesAsync = ref.watch(sitesProvider);

    if (!isSupervisor) {
      return const Scaffold(
        body: Center(child: Text('Supervisor access required.')),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Send Notification')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _titleController,
              decoration: const InputDecoration(
                labelText: 'Title',
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _bodyController,
              maxLines: 4,
              decoration: const InputDecoration(
                labelText: 'Message',
              ),
            ),
            const SizedBox(height: 16),
            sitesAsync.when(
              data: (sites) {
                final items = [
                  'All Officers',
                  'All Supervisors',
                  ...sites.map((site) => site.name),
                ];
                _target = items.contains(_target) ? _target : items.first;
                return DropdownButtonFormField<String>(
                  value: _target,
                  items: items
                      .map(
                        (item) => DropdownMenuItem(
                          value: item,
                          child: Text(item),
                        ),
                      )
                      .toList(),
                  onChanged: (value) {
                    if (value != null) {
                      setState(() => _target = value);
                    }
                  },
                  decoration: const InputDecoration(
                    labelText: 'Target Audience',
                  ),
                );
              },
              loading: () => const LinearProgressIndicator(),
              error: (_, __) => const Text('Unable to load sites.'),
            ),
            const Spacer(),
            ElevatedButton(
              onPressed: _send,
              child: const Text('Send Notification'),
            ),
          ],
        ),
      ),
    );
  }
}
