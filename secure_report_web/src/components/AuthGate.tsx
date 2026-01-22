"use client";

import { useAuth } from "@/lib/auth";
import { appConfig } from "@/lib/config";

import { AppShell } from "./AppShell";
import { OfflineBanner } from "./OfflineBanner";

export function AuthGate({
  children,
  showShell = true,
}: {
  children: React.ReactNode;
  showShell?: boolean;
}) {
  const { state } = useAuth();

  if (state.status === "loading") {
    return (
      <div className="centered">
        <div className="card">
          <p className="strong">Loading SecureReport...</p>
          <div className="loader" />
        </div>
      </div>
    );
  }

  if (state.status === "signedOut") {
    return <LoginCard />;
  }

  if (state.status === "denied") {
    return <AccessDenied />;
  }

  if (!showShell) {
    return <>{children}</>;
  }

  return (
    <AppShell>
      <OfflineBanner />
      {children}
    </AppShell>
  );
}

function LoginCard() {
  const { signInWithGoogle, signInWithMockRole } = useAuth();

  return (
    <div className="centered">
      <div className="card large">
        <p className="eyebrow">SecureReport</p>
        <h2>Sign in to start your shift</h2>
        <p className="muted">
          SecureReport uses Google Workspace SSO with an approved email
          whitelist.
        </p>
        <div className="stack">
          <button className="button primary" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          {appConfig.useMocks && (
            <div className="stack">
              <p className="small muted">Mock login (local only)</p>
              <button
                className="button ghost"
                onClick={() => signInWithMockRole("officer")}
              >
                Sign in as Officer
              </button>
              <button
                className="button ghost"
                onClick={() => signInWithMockRole("supervisor")}
              >
                Sign in as Supervisor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AccessDenied() {
  const { signOut } = useAuth();

  return (
    <div className="centered">
      <div className="card large">
        <p className="eyebrow">Access Denied</p>
        <h2>Your email is not on the SecureReport whitelist.</h2>
        <p className="muted">
          Contact your supervisor to request access.
        </p>
        <button className="button ghost" onClick={signOut}>
          Back to login
        </button>
      </div>
    </div>
  );
}
