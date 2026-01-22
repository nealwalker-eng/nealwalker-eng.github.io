import 'package:flutter/material.dart';

void main() {
  runApp(const SecureReportApp());
}

class SecureReportApp extends StatefulWidget {
  const SecureReportApp({super.key});

  @override
  State<SecureReportApp> createState() => _SecureReportAppState();
}

class _SecureReportAppState extends State<SecureReportApp> {
  final MockAuthService _authService = MockAuthService();

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<AppSession>(
      valueListenable: _authService.session,
      builder: (context, session, _) {
        return AuthScope(
          session: session,
          authService: _authService,
          child: MaterialApp(
            title: 'SecureReport',
            theme: ThemeData(
              colorScheme: ColorScheme.fromSeed(
                seedColor: const Color(0xFF1B3A57),
                primary: const Color(0xFF1B3A57),
                secondary: const Color(0xFFE53935),
              ),
              useMaterial3: true,
              inputDecorationTheme: const InputDecorationTheme(
                border: OutlineInputBorder(),
              ),
            ),
            home: const AuthGate(),
            routes: {
              Routes.home: (_) => const HomeScreen(),
              Routes.reportNew: (_) => const ReportFormScreen(),
              Routes.reportList: (_) => const ReportListScreen(),
              Routes.chat: (_) => const ChatScreen(),
              Routes.schedule: (_) => const ScheduleScreen(),
              Routes.qrScan: (_) => const QrScanScreen(),
              Routes.notificationCompose: (_) =>
                  const NotificationComposeScreen(),
            },
          ),
        );
      },
    );
  }
}

class Routes {
  static const String home = '/home';
  static const String reportNew = '/reports/new';
  static const String reportList = '/reports';
  static const String chat = '/chat';
  static const String schedule = '/schedule';
  static const String qrScan = '/scan';
  static const String notificationCompose = '/notifications/compose';
}

enum UserRole { officer, supervisor }

class UserProfile {
  const UserProfile({
    required this.name,
    required this.email,
    required this.role,
    required this.isApproved,
  });

  final String name;
  final String email;
  final UserRole role;
  final bool isApproved;
}

enum AuthStatus { signedOut, signedIn }

class AppSession {
  const AppSession._({required this.status, required this.user});

  final AuthStatus status;
  final UserProfile? user;

  factory AppSession.signedOut() =>
      const AppSession._(status: AuthStatus.signedOut, user: null);

  factory AppSession.signedIn(UserProfile user) =>
      AppSession._(status: AuthStatus.signedIn, user: user);
}

class MockAuthService {
  // Placeholder auth service until Firebase is integrated.
  final ValueNotifier<AppSession> session =
      ValueNotifier<AppSession>(AppSession.signedOut());

  void signInAsOfficer() {
    session.value = AppSession.signedIn(
      const UserProfile(
        name: 'John Carter',
        email: 'john.carter@aps-security.com',
        role: UserRole.officer,
        isApproved: true,
      ),
    );
  }

  void signInAsSupervisor() {
    session.value = AppSession.signedIn(
      const UserProfile(
        name: 'Sarah Blake',
        email: 'sarah.blake@aps-security.com',
        role: UserRole.supervisor,
        isApproved: true,
      ),
    );
  }

  void signInDenied() {
    session.value = AppSession.signedIn(
      const UserProfile(
        name: 'Unknown User',
        email: 'unknown@example.com',
        role: UserRole.officer,
        isApproved: false,
      ),
    );
  }

  void signOut() {
    session.value = AppSession.signedOut();
  }
}

class AuthScope extends InheritedWidget {
  const AuthScope({
    super.key,
    required this.session,
    required this.authService,
    required super.child,
  });

  final AppSession session;
  final MockAuthService authService;

  static AuthScope of(BuildContext context) {
    final AuthScope? result =
        context.dependOnInheritedWidgetOfExactType<AuthScope>();
    assert(result != null, 'AuthScope not found in widget tree');
    return result!;
  }

  @override
  bool updateShouldNotify(AuthScope oldWidget) {
    return session != oldWidget.session;
  }
}

class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = AuthScope.of(context);
    final session = auth.session;

    if (session.status == AuthStatus.signedOut) {
      return const LoginScreen();
    }

    if (session.user != null && !session.user!.isApproved) {
      return const AccessDeniedScreen();
    }

    return const HomeScreen();
  }
}

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = AuthScope.of(context);

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
              onPressed: auth.authService.signInAsOfficer,
              icon: const Icon(Icons.shield_outlined),
              label: const Text('Sign in as Officer (mock)'),
            ),
            const SizedBox(height: 12),
            ElevatedButton.icon(
              onPressed: auth.authService.signInAsSupervisor,
              icon: const Icon(Icons.admin_panel_settings_outlined),
              label: const Text('Sign in as Supervisor (mock)'),
            ),
            const SizedBox(height: 12),
            OutlinedButton(
              onPressed: auth.authService.signInDenied,
              child: const Text('Simulate access denied'),
            ),
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

class AccessDeniedScreen extends StatelessWidget {
  const AccessDeniedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = AuthScope.of(context);

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
              onPressed: auth.authService.signOut,
              child: const Text('Back to login'),
            ),
          ],
        ),
      ),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _selectedSite = SampleData.sites.first;

  @override
  Widget build(BuildContext context) {
    final auth = AuthScope.of(context);
    final user = auth.session.user!;
    final bool isSupervisor = user.role == UserRole.supervisor;
    final now = DateTime.now();

    return Scaffold(
      appBar: AppBar(
        title: const Text('SecureReport'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: auth.authService.signOut,
            tooltip: 'Sign out',
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            'Welcome, ${user.name}',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 8),
          Text(
            'Role: ${user.role == UserRole.officer ? 'Officer' : 'Supervisor'}',
          ),
          const SizedBox(height: 16),
          InfoCard(
            title: 'Today',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Date: ${now.toLocal()}'),
                const SizedBox(height: 8),
                Row(
                  children: [
                    const Icon(Icons.wb_sunny_outlined),
                    const SizedBox(width: 8),
                    Text(
                      '${SampleData.weather.condition}, '
                      '${SampleData.weather.temperatureF} F',
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(SampleData.weather.location),
              ],
            ),
          ),
          const SizedBox(height: 16),
          InfoCard(
            title: 'Site Selection',
            child: DropdownButtonFormField<String>(
              value: _selectedSite,
              items: SampleData.sites
                  .map(
                    (site) => DropdownMenuItem<String>(
                      value: site,
                      child: Text(site),
                    ),
                  )
                  .toList(),
              onChanged: (value) {
                if (value == null) return;
                setState(() => _selectedSite = value);
              },
              decoration: const InputDecoration(
                labelText: 'Active Site',
              ),
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
                if (isSupervisor)
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
            child: Column(
              children: SampleData.schedule
                  .take(3)
                  .map(
                    (shift) => ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text('${shift.day} ${shift.start} - ${shift.end}'),
                      subtitle: Text(shift.site),
                      leading: const Icon(Icons.schedule),
                    ),
                  )
                  .toList(),
            ),
          ),
          const SizedBox(height: 16),
          InfoCard(
            title: 'Recent Reports',
            child: Column(
              children: SampleData.reports
                  .take(3)
                  .map(
                    (report) => ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(report.title),
                      subtitle: Text('${report.site} - ${report.updatedAt}'),
                      trailing: StatusChip(status: report.status),
                    ),
                  )
                  .toList(),
            ),
          ),
          if (isSupervisor) ...[
            const SizedBox(height: 16),
            InfoCard(
              title: 'Supervisor Tools',
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('Upload schedules from Google Sheets.'),
                  SizedBox(height: 8),
                  Text('Review reports by site and time period.'),
                  SizedBox(height: 8),
                  Text('Monitor all chats and send notifications.'),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class ReportFormScreen extends StatefulWidget {
  const ReportFormScreen({super.key});

  @override
  State<ReportFormScreen> createState() => _ReportFormScreenState();
}

class _ReportFormScreenState extends State<ReportFormScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _detailsController = TextEditingController();

  @override
  void dispose() {
    _titleController.dispose();
    _detailsController.dispose();
    super.dispose();
  }

  void _submit() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Report saved to drafts (mock).')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('New Report')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
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
            Row(
              children: [
                OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.camera_alt_outlined),
                  label: const Text('Add Photo'),
                ),
                const SizedBox(width: 12),
                OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.mic_none),
                  label: const Text('Voice Note'),
                ),
              ],
            ),
            const Spacer(),
            ElevatedButton(
              onPressed: _submit,
              child: const Text('Save Draft'),
            ),
          ],
        ),
      ),
    );
  }
}

class ReportListScreen extends StatelessWidget {
  const ReportListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Reports')),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: SampleData.reports.length,
        separatorBuilder: (_, __) => const Divider(),
        itemBuilder: (context, index) {
          final report = SampleData.reports[index];
          return ListTile(
            title: Text(report.title),
            subtitle: Text('${report.site} - ${report.updatedAt}'),
            trailing: StatusChip(status: report.status),
          );
        },
      ),
    );
  }
}

class ScheduleScreen extends StatelessWidget {
  const ScheduleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Weekly Schedule')),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: SampleData.schedule.length,
        separatorBuilder: (_, __) => const Divider(),
        itemBuilder: (context, index) {
          final shift = SampleData.schedule[index];
          return ListTile(
            title: Text('${shift.day} ${shift.start} - ${shift.end}'),
            subtitle: Text(shift.site),
            leading: const Icon(Icons.schedule),
          );
        },
      ),
    );
  }
}

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<ChatMessage> _messages = List.of(SampleData.messages);

  void _sendMessage() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add(
        ChatMessage(
          sender: 'You',
          message: text,
          timestamp: 'Just now',
          isMine: true,
        ),
      );
      _controller.clear();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Site Chat')),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final message = _messages[index];
                final alignment =
                    message.isMine ? Alignment.centerRight : Alignment.centerLeft;
                final bubbleColor = message.isMine
                    ? Theme.of(context).colorScheme.primary.withOpacity(0.1)
                    : Theme.of(context).colorScheme.surfaceVariant;
                return Align(
                  alignment: alignment,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: bubbleColor,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      crossAxisAlignment: message.isMine
                          ? CrossAxisAlignment.end
                          : CrossAxisAlignment.start,
                      children: [
                        Text(
                          message.sender,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 4),
                        Text(message.message),
                        const SizedBox(height: 4),
                        Text(
                          message.timestamp,
                          style: const TextStyle(fontSize: 12),
                        ),
                      ],
                    ),
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

class QrScanScreen extends StatelessWidget {
  const QrScanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('QR Scan')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Icon(Icons.qr_code_scanner, size: 96),
            const SizedBox(height: 16),
            const Text(
              'Scanner placeholder. Integrate ML Kit or ZXing for camera-based '
              'scanning and GPS logging.',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Scan logged (mock).')),
                );
              },
              child: const Text('Simulate Scan'),
            ),
          ],
        ),
      ),
    );
  }
}

class NotificationComposeScreen extends StatefulWidget {
  const NotificationComposeScreen({super.key});

  @override
  State<NotificationComposeScreen> createState() =>
      _NotificationComposeScreenState();
}

class _NotificationComposeScreenState extends State<NotificationComposeScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _bodyController = TextEditingController();
  String _target = 'All Officers';

  @override
  void dispose() {
    _titleController.dispose();
    _bodyController.dispose();
    super.dispose();
  }

  void _send() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Notification queued (mock).')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = AuthScope.of(context);
    final isSupervisor = auth.session.user?.role == UserRole.supervisor;

    return Scaffold(
      appBar: AppBar(title: const Text('Send Notification')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: isSupervisor
            ? Column(
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
                  DropdownButtonFormField<String>(
                    value: _target,
                    items: const [
                      DropdownMenuItem(
                        value: 'All Officers',
                        child: Text('All Officers'),
                      ),
                      DropdownMenuItem(
                        value: 'All Supervisors',
                        child: Text('All Supervisors'),
                      ),
                      DropdownMenuItem(
                        value: 'Silver Spring Site',
                        child: Text('Silver Spring Site'),
                      ),
                    ],
                    onChanged: (value) {
                      if (value == null) return;
                      setState(() => _target = value);
                    },
                    decoration: const InputDecoration(
                      labelText: 'Target Audience',
                    ),
                  ),
                  const Spacer(),
                  ElevatedButton(
                    onPressed: _send,
                    child: const Text('Send Notification'),
                  ),
                ],
              )
            : const Center(
                child: Text('Supervisor access required.'),
              ),
      ),
    );
  }
}

class InfoCard extends StatelessWidget {
  const InfoCard({super.key, required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 12),
            child,
          ],
        ),
      ),
    );
  }
}

class ActionButton extends StatelessWidget {
  const ActionButton({
    super.key,
    required this.label,
    required this.icon,
    required this.onPressed,
  });

  final String label;
  final IconData icon;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      icon: Icon(icon),
      label: Text(label),
    );
  }
}

class StatusChip extends StatelessWidget {
  const StatusChip({super.key, required this.status});

  final String status;

  @override
  Widget build(BuildContext context) {
    final Color color;
    switch (status) {
      case 'Submitted':
        color = Colors.green;
        break;
      case 'Draft':
        color = Colors.orange;
        break;
      default:
        color = Colors.blueGrey;
    }

    return Chip(
      label: Text(status),
      backgroundColor: color.withOpacity(0.15),
      labelStyle: TextStyle(color: color.shade700),
    );
  }
}

class WeatherData {
  const WeatherData({
    required this.location,
    required this.temperatureF,
    required this.condition,
  });

  final String location;
  final int temperatureF;
  final String condition;
}

class ScheduleShift {
  const ScheduleShift({
    required this.day,
    required this.start,
    required this.end,
    required this.site,
  });

  final String day;
  final String start;
  final String end;
  final String site;
}

class ReportSummary {
  const ReportSummary({
    required this.title,
    required this.site,
    required this.status,
    required this.updatedAt,
  });

  final String title;
  final String site;
  final String status;
  final String updatedAt;
}

class ChatMessage {
  const ChatMessage({
    required this.sender,
    required this.message,
    required this.timestamp,
    required this.isMine,
  });

  final String sender;
  final String message;
  final String timestamp;
  final bool isMine;
}

class SampleData {
  static const List<String> sites = [
    'Silver Spring HQ',
    'Capitol Annex',
    'Federal Plaza',
  ];

  static const WeatherData weather = WeatherData(
    location: 'Silver Spring, MD',
    temperatureF: 72,
    condition: 'Partly Cloudy',
  );

  static const List<ScheduleShift> schedule = [
    ScheduleShift(
      day: 'Mon',
      start: '07:00',
      end: '15:00',
      site: 'Silver Spring HQ',
    ),
    ScheduleShift(
      day: 'Tue',
      start: '15:00',
      end: '23:00',
      site: 'Capitol Annex',
    ),
    ScheduleShift(
      day: 'Wed',
      start: '23:00',
      end: '07:00',
      site: 'Federal Plaza',
    ),
    ScheduleShift(
      day: 'Thu',
      start: '07:00',
      end: '15:00',
      site: 'Silver Spring HQ',
    ),
    ScheduleShift(
      day: 'Fri',
      start: '15:00',
      end: '23:00',
      site: 'Capitol Annex',
    ),
  ];

  static const List<ReportSummary> reports = [
    ReportSummary(
      title: 'Suspicious activity near loading dock',
      site: 'Silver Spring HQ',
      status: 'Submitted',
      updatedAt: 'Today 09:32',
    ),
    ReportSummary(
      title: 'Routine patrol completed',
      site: 'Capitol Annex',
      status: 'Draft',
      updatedAt: 'Yesterday 22:10',
    ),
    ReportSummary(
      title: 'Visitor escort request',
      site: 'Federal Plaza',
      status: 'Submitted',
      updatedAt: 'Jan 21 18:45',
    ),
  ];

  static const List<ChatMessage> messages = [
    ChatMessage(
      sender: 'Dispatcher',
      message: 'Reminder: submit patrol reports before shift end.',
      timestamp: '08:05',
      isMine: false,
    ),
    ChatMessage(
      sender: 'John Carter',
      message: 'Copy that. Starting second round now.',
      timestamp: '08:11',
      isMine: false,
    ),
    ChatMessage(
      sender: 'You',
      message: 'Heading to checkpoint 3.',
      timestamp: '08:20',
      isMine: true,
    ),
  ];
}
