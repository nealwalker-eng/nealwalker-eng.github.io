"use client";

import { AuthGate } from "@/components/AuthGate";
import { DashboardView } from "@/components/DashboardView";

export default function Home() {
  return (
    <AuthGate>
      <DashboardView />
    </AuthGate>
  );
}
