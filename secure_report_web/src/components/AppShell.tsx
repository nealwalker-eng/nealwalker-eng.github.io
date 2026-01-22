"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/lib/auth";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reports", label: "Reports" },
  { href: "/reports/new", label: "New Report" },
  { href: "/scan", label: "Scan" },
  { href: "/chat", label: "Chat" },
  { href: "/schedule", label: "Schedule" },
  { href: "/reports/analytics", label: "Analytics", requiresSupervisor: true },
  {
    href: "/notifications/compose",
    label: "Notify",
    requiresSupervisor: true,
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state, signOut } = useAuth();
  const profile = state.profile;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">SecureReport</p>
          <h1>Operational Dashboard</h1>
        </div>
        <div className="header-meta">
          <div>
            <p className="small">Signed in as</p>
            <p className="strong">{profile?.displayName ?? "User"}</p>
            <p className="small">{profile?.email ?? ""}</p>
          </div>
          <button className="button ghost" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </header>
      <nav className="app-nav">
        {navItems.map((item) => {
          if (item.requiresSupervisor && profile?.role !== "supervisor") {
            return null;
          }
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <main className="app-content">{children}</main>
    </div>
  );
}
