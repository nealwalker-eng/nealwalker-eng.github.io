"use client";

import { useMemo, useState } from "react";

import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/lib/auth";
import { useReports, useSites } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";

export default function ReportsAnalyticsPage() {
  return (
    <AuthGate>
      <AnalyticsContent />
    </AuthGate>
  );
}

function AnalyticsContent() {
  const { state } = useAuth();
  const profile = state.profile!;
  const reports = useReports(profile);
  const sites = useSites();
  const [range, setRange] = useState("30");

  const filteredReports = useMemo(() => {
    const days = Number(range);
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    return reports.data.filter((report) => report.updatedAt.getTime() >= cutoff);
  }, [reports.data, range]);

  const totals = useMemo(() => {
    const bySite: Record<string, number> = {};
    filteredReports.forEach((report) => {
      bySite[report.siteId] = (bySite[report.siteId] ?? 0) + 1;
    });
    return bySite;
  }, [filteredReports]);

  if (profile.role !== "supervisor") {
    return (
      <div className="card">
        <p className="eyebrow">Analytics</p>
        <p className="muted">Supervisor access required.</p>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="card">
        <p className="eyebrow">Report Analytics</p>
        <h2>Site performance overview</h2>
        <p className="muted">
          Summarized report activity across selected time periods.
        </p>
      </div>

      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <p className="strong">Report volume</p>
            <p className="muted">
              {filteredReports.length} reports in selected range
            </p>
          </div>
          <div className="field" style={{ minWidth: 200 }}>
            <label htmlFor="range">Date range</label>
            <select
              id="range"
              value={range}
              onChange={(event) => setRange(event.target.value)}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid two">
        <div className="card">
          <p className="eyebrow">Reports by Site</p>
          <div className="stack">
            {Object.entries(totals).map(([siteId, count]) => {
              const siteName =
                sites.data.find((site) => site.id === siteId)?.name ?? siteId;
              return (
                <div key={siteId} className="row">
                  <div>
                    <p className="strong">{siteName}</p>
                    <p className="muted">{siteId}</p>
                  </div>
                  <span className="tag">{count} reports</span>
                </div>
              );
            })}
            {!Object.keys(totals).length && (
              <p className="muted">No reports in this range.</p>
            )}
          </div>
        </div>

        <div className="card">
          <p className="eyebrow">Latest Submissions</p>
          <div className="stack">
            {filteredReports.slice(0, 5).map((report) => (
              <div key={report.id}>
                <p className="strong">{report.title}</p>
                <p className="muted">
                  {report.siteId} · {formatDateTime(report.updatedAt)}
                </p>
              </div>
            ))}
            {!filteredReports.length && (
              <p className="muted">No recent submissions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
