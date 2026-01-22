# SecureReport Build Plan

This document provides a comprehensive, execution-ready plan to build the
SecureReport application described in the PRD. It is designed to guide product,
design, engineering, and QA from kickoff through launch and post-release
operations.

## 1) Objectives and Scope

### Primary Objectives
- Ship a mobile-first, cross-platform app for security officers and supervisors.
- Enable fast, reliable reporting with offline support, GPS, and timestamps.
- Deliver real-time, site-specific and organization-wide chat.
- Provide a personalized weekly schedule view and supervisor schedule upload.
- Ensure secure, role-based access via Google Workspace SSO and Firebase.

### MVP Scope (v1.0)
- Authentication with email whitelist and roles (officer, supervisor).
- Homepage dashboard with date/time, weather (Silver Spring, MD), schedule,
  report links, QR scanning, chats, and notifications entry.
- QR scanning for sign-in/out and patrol checkpoints.
- Report creation (text, media), offline drafts, and submission to Drive.
- Basic aggregation and search for reports (supervisor view).
- Push notifications (targeted by role and site).
- Chat (site channels and organization channel).

### Out of Scope (MVP)
- Full web admin dashboard (future phase).
- AI analytics and voice reporting (v1.2+).
- IoT integrations (v2.0).

## 2) Team Roles and Responsibilities

- Product Manager: roadmap, scope, acceptance criteria, stakeholder alignment.
- UX/UI Designer: mobile-first flows, visual design, accessibility.
- Mobile Engineer(s): Flutter app, state management, offline workflows.
- Backend Engineer(s): Firebase, Cloud Functions, integrations (Drive, Sheets).
- QA Engineer: test plans, device coverage, regression testing.
- DevOps/Release: CI/CD, Firebase project setup, monitoring, releases.

## 3) Technical Architecture Overview

### Frontend (Flutter)
- State management: Riverpod or Bloc.
- Routing: go_router.
- Auth: Google Sign-In, Firebase Auth.
- Storage: local persistence (Hive or SQLite).
- Media capture: camera plugin, image/video picker.
- QR scanning: ML Kit or ZXing.
- Notifications: Firebase Cloud Messaging (FCM).

### Backend (Firebase)
- Auth: Firebase Authentication with custom claims for roles.
- Data: Firestore for structured data (users, sites, schedules, reports).
- Chat: Realtime Database or Firestore (choose one; Firestore preferred for
  queries and structured access rules).
- Functions: Cloud Functions for Drive uploads, Sheets imports, and scheduled
  sync tasks.
- Storage: Firebase Cloud Storage for report media.

### External Integrations
- Google Workspace Admin SDK for email whitelist management (or a custom
  whitelist stored in Firestore with admin tooling).
- Google Drive API for report submission to site folders.
- Google Sheets API for schedule upload.
- Weather API (e.g., OpenWeatherMap) for daily forecast in Silver Spring, MD.

## 4) Data Model (High-Level)

### Firestore Collections
- users: { uid, email, role, displayName, siteIds, createdAt }
- sites: { id, name, address, geo, driveFolderId }
- schedules: { userId, weekStart, shifts: [ { siteId, start, end } ] }
- reports: { id, userId, siteId, status, createdAt, submittedAt, mediaRefs }
- patrols: { id, userId, siteId, scanType, gps, timestamp }
- notifications: { id, title, body, targets, createdAt }
- whitelist: { email, role, siteIds, status }

### Chat Structure (if Firestore)
- channels: { id, type, siteId, name }
- messages: { channelId, senderId, text, timestamp, attachments }

## 5) Security and Compliance Plan

- OAuth 2.0 Google Sign-In with Firebase Auth.
- Email whitelist enforced in Cloud Functions and security rules.
- Custom claims for role-based access and Firestore rules.
- AES-256 encryption for data at rest (Firebase managed).
- TLS in transit; rotate API keys and service account credentials.
- GDPR/CCPA compliance practices (data retention, user access requests).

## 6) UX and Design Plan

### Key Screens
- Login / access denied.
- Homepage dashboard (weather, schedule, date/time, quick actions).
- Report creation and drafts.
- QR scanner for sign-in/out and patrols.
- Chat channel list and message threads.
- Schedule view (weekly list or calendar).
- Notification compose (supervisor).
- Report list / search (officer and supervisor views).

### Design Principles
- Mobile-first, single-hand reachability.
- Clear typography and high contrast (WCAG 2.1 AA).
- Minimal taps to create and submit reports (target under 2 minutes).
- Offline-friendly messaging and report drafts.

## 7) Implementation Phases and Milestones

### Phase 0: Discovery and Setup (Week 1)
**Goals**
- Confirm API choices (weather, Drive, Sheets).
- Define data model and access rules.
- Establish Firebase project(s) and CI/CD.

**Deliverables**
- Architecture decision record (ADR) for chat data store and state management.
- Firebase project with environments (dev, staging, prod).
- Skeleton Flutter app with navigation and design system tokens.

### Phase 1: Authentication and Access Control (Weeks 2-3)
**Goals**
- Google SSO, email whitelist enforcement, role claims.

**Deliverables**
- Login flow with access denied screen.
- Firestore security rules for officers and supervisors.
- Admin path to manage whitelist (manual via console or tooling).

### Phase 2: Core Homepage and Navigation (Weeks 3-4)
**Goals**
- Homepage with date/time, weather, schedule placeholder, quick actions.

**Deliverables**
- Dashboard UI with offline fallback placeholders.
- Weather integration with caching and graceful error state.

### Phase 3: Site Selection and QR Scanning (Weeks 4-5)
**Goals**
- Site list from Firestore and GPS-suggested selection.
- QR scan for sign-in/out and patrol.

**Deliverables**
- QR scanner with logging (GPS, timestamp, site).
- Offline queue for scans with sync.

### Phase 4: Report Drafts and Submission (Weeks 5-7)
**Goals**
- Report creation (text, media) and draft storage.
- Drive upload via Cloud Functions with notifications.

**Deliverables**
- Report templates and media attachment flow.
- PDF or document generation and Drive upload.
- Confirmation UX and failure retries.

### Phase 5: Schedule Import and Viewing (Weeks 7-8)
**Goals**
- Supervisor upload from Google Sheets.
- Officer personalized schedule view.

**Deliverables**
- Sheets parser function and Firestore updates.
- Schedule view with day-by-day list.

### Phase 6: Chat and Notifications (Weeks 8-9)
**Goals**
- Site chat and organization chat with real-time updates.
- Supervisor notification composer and delivery tracking.

**Deliverables**
- Chat UI with message queueing offline.
- Push notifications targeting roles and sites.

### Phase 7: Aggregation and Reporting (Weeks 9-10)
**Goals**
- Supervisor report list with filters and export basics.

**Deliverables**
- Filtering by site and period.
- Export to PDF/Sheets.

### Phase 8: QA, Hardening, and Launch (Weeks 10-12)
**Goals**
- Accessibility, performance, security testing.
- Production readiness and release plan.

**Deliverables**
- Device test matrix, regression test report.
- App Store and Play Store release artifacts.

## 8) Detailed Work Breakdown (MVP)

### Authentication
- Configure Firebase Auth with Google Sign-In.
- Implement whitelist check (Cloud Function pre-auth or sign-in hook).
- Assign role claims and enforce in Firestore rules.

### Homepage Dashboard
- Build UI cards for weather, schedule, reports, chats, scanner, notifications.
- Add real-time date/time and offline caching.
- Add refresh behavior on load and pull-to-refresh.

### Weather
- Integrate weather API for Silver Spring, MD.
- Cache data for 30-60 minutes, fallback to last known.

### Site Selection
- Load site list from Firestore.
- Use GPS to suggest nearest site with manual confirmation.

### QR Scanning
- Implement QR scanning with camera permissions and error states.
- Log GPS and timestamps; store offline if needed.

### Report Creation and Submission
- Implement report templates per site.
- Allow media capture and upload to Cloud Storage.
- Generate report PDF and submit to Drive via Cloud Function.
- Send success/failure notification to supervisor.

### Chat
- Create channels per site and one organization channel.
- Realtime message updates with read receipts (optional).
- Offline queue and sync for messages.

### Schedules
- Sheets import tool for supervisors.
- Store normalized schedules in Firestore.
- Officer schedule view limited by userId.

### Notifications
- Admin composer to send push to sites or roles.
- Track delivery status in Firestore.

### Aggregation
- Supervisor report list with filters (site, date range, status).
- Export to PDF/Sheets.

## 9) Testing and Quality Plan

### Automated Testing
- Unit tests for data parsing, validation, and utility logic.
- Widget tests for core screens.
- Integration tests for auth, report creation, and chat.

### Manual Testing
- Device matrix: iOS 14+ and Android 10+ with multiple screen sizes.
- Offline behavior: create report, scan QR, send message offline.
- Accessibility: screen reader labels, contrast, focus order.

### Performance Targets
- App cold start under 2 seconds.
- Weather and schedule data load under 1 second.
- Chat message delivery under 1 second (online).

## 10) Release and Operations Plan

### CI/CD
- GitHub Actions for tests and builds.
- Firebase Functions deploy pipeline for backend changes.

### Monitoring
- Crash reporting (Firebase Crashlytics).
- Analytics events for key flows.
- Alerts for high error rates and downtime.

### Launch Checklist
- Security review of rules and Cloud Functions.
- QA sign-off on critical user flows.
- Store listings and privacy policy.

## 11) Risks and Mitigations

- **API quotas (Drive/Sheets/Weather):** Cache results, limit refresh, set
  per-site throttling.
- **Offline data conflicts:** Use conflict resolution and timestamps; surface
  errors to users.
- **Role escalation risks:** Strict validation in Functions and Firestore rules.
- **Chat scale/performance:** Optimize queries and indexes; pagination.

## 12) Open Questions

- Final choice of weather API and pricing constraints.
- Preferred method for whitelist administration (admin console or custom tool).
- Report output format (PDF, Doc, or both) and template format.
- Data retention policy and archival requirements.

## 13) Definition of Done (MVP)

- All must-have features pass acceptance criteria.
- App stores approved and production deployment live.
- Monitoring and alerts configured.
- 90% of tests passing with no critical bugs.

