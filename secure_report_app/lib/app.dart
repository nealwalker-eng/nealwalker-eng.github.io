import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'screens.dart';

class SecureReportApp extends ConsumerWidget {
  const SecureReportApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
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
        Routes.notificationCompose: (_) => const NotificationComposeScreen(),
      },
    );
  }
}
