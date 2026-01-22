"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AuthGate } from "@/components/AuthGate";
import { QrScanner } from "@/components/QrScanner";
import { useAuth } from "@/lib/auth";
import { logPatrolScan } from "@/lib/data";
import type { PatrolScan, PatrolScanType } from "@/lib/models";

export default function ScanPage() {
  return (
    <AuthGate>
      <ScanContent />
    </AuthGate>
  );
}

function ScanContent() {
  const { state } = useAuth();
  const profile = state.profile!;
  const [status, setStatus] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");

  const handleScan = async (rawValue: string) => {
    const [siteIdRaw, scanTypeRaw] = rawValue.split("|");
    const siteId = siteIdRaw || profile.siteIds[0] || "unassigned";
    const scanType = (scanTypeRaw as PatrolScanType) || "patrol";
    const location = await getLocation();
    const scan: PatrolScan = {
      id: uuidv4(),
      userId: profile.uid,
      siteId,
      scanType,
      timestamp: new Date(),
      location,
      rawCode: rawValue,
    };
    await logPatrolScan(scan);
    setStatus(`Scan logged for ${siteId} (${scanType}).`);
  };

  const handleManualSubmit = async () => {
    if (!manualCode.trim()) {
      return;
    }
    await handleScan(manualCode.trim());
    setManualCode("");
  };

  return (
    <div className="stack">
      <div className="card">
        <p className="eyebrow">QR Scanner</p>
        <h2>Sign in/out and patrol checkpoints</h2>
        <p className="muted">
          Scan QR codes to log GPS and timestamp data for patrols.
        </p>
      </div>

      <div className="card">
        <QrScanner onResult={handleScan} onError={(msg) => setStatus(msg)} />
        {status && <p className="muted">{status}</p>}
      </div>

      <div className="card">
        <p className="eyebrow">Manual entry</p>
        <div className="field">
          <label htmlFor="manual-code">Enter code</label>
          <input
            id="manual-code"
            value={manualCode}
            onChange={(event) => setManualCode(event.target.value)}
            placeholder="site-id|patrol"
          />
        </div>
        <button className="button ghost" onClick={handleManualSubmit}>
          Submit manual scan
        </button>
      </div>
    </div>
  );
}

function getLocation(): Promise<{ lat: number; lng: number } | undefined> {
  if (!navigator.geolocation) {
    return Promise.resolve(undefined);
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => resolve(undefined),
    );
  });
}
