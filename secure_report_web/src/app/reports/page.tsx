"use client";

import { useMemo, useState } from "react";

import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/lib/auth";
import { useDrafts, useReports, useSites } from "@/lib/data";
import type { Report } from "@/lib/models";
import { formatDateTime } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <AuthGate>
      <ReportsContent />
    </AuthGate>
  );
}

function ReportsContent() {
  const { state } = useAuth();
  const profile = state.profile!;
  const reports = useReports(profile);
  const drafts = useDrafts(profile.uid);
  const sites = useSites();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");

  const filteredReports = useMemo(() => {
    return reports.data.filter((report) => {
      if (status !== "all" && report.status !== status) {
        return false;
      }
      if (siteFilter !== "all" && report.siteId !== siteFilter) {
        return false;
      }
      if (
        search &&
        !report.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [reports.data, search, status, siteFilter]);

  return (
    <div className="stack">
      <div className="card">
        <p className="eyebrow">Report Management</p>
        <h2>Reports</h2>
        <p className="muted">
          Filter, review, and track submitted reports.
        </p>
      </div>

      <div className="card">
        <div className="grid three">
          <div className="field">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              placeholder="Search by title"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">All</option>
              <option value="submitted">Submitted</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="site">Site</label>
            <select
              id="site"
              value={siteFilter}
              onChange={(event) => setSiteFilter(event.target.value)}
            >
              <option value="all">All Sites</option>
              {sites.data.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="eyebrow">Submitted Reports</p>
        {reports.loading ? (
          <p className="muted">Loading reports...</p>
        ) : filteredReports.length ? (
          <div className="stack">
            {filteredReports.map((report) => (
              <div key={report.id} className="card">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <div>
                    <p className="strong">{report.title}</p>
                    <p className="muted">
                      {report.siteId} · {formatDateTime(report.updatedAt)}
                    </p>
                  </div>
                  <span
                    className={`tag ${
                      report.status === "submitted" ? "success" : "warning"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="muted">{report.details}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">No reports found for current filters.</p>
        )}
      </div>

      <div className="card">
        <p className="eyebrow">Drafts (Local)</p>
        {drafts.length ? (
          <div className="stack">
            {drafts.map((draft) => (
              <div key={draft.id} className="card">
                <p className="strong">
                  {draft.title || "Untitled Draft"}
                </p>
                <p className="muted">
                  {draft.siteId} · {formatDateTime(draft.createdAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">No drafts saved locally.</p>
        )}
      </div>

      {profile.role === "supervisor" && (
        <div className="card">
          <p className="eyebrow">Supervisor Controls</p>
          <p className="muted">
            Export filtered reports or open analytics for trends.
          </p>
          <div className="row">
            <button
              className="button ghost"
              onClick={() => exportCsv(filteredReports)}
            >
              Export CSV
            </button>
            <a className="button primary" href="/reports/analytics">
              View Analytics
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function exportCsv(reports: Report[]) {
  if (!reports.length) {
    return;
  }
  const rows = [
    ["Title", "Site", "Status", "Updated At"],
    ...reports.map((report) => [
      report.title,
      report.siteId,
      report.status,
      report.updatedAt.toISOString(),
    ]),
  ];
  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "secure-report-export.csv";
  link.click();
  URL.revokeObjectURL(url);
}
