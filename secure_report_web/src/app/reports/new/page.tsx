"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/lib/auth";
import { saveDraft, submitReport, useSites } from "@/lib/data";
import type { Report, ReportDraft } from "@/lib/models";

export default function NewReportPage() {
  return (
    <AuthGate>
      <NewReportContent />
    </AuthGate>
  );
}

function NewReportContent() {
  const { state } = useAuth();
  const profile = state.profile!;
  const sites = useSites();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [siteId, setSiteId] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setAttachments(files);
  };

  const handleSaveDraft = () => {
    const draft: ReportDraft = {
      id: uuidv4(),
      title,
      details,
      userId: profile.uid,
      siteId: siteId || profile.siteIds[0] || "unassigned",
      createdAt: new Date(),
      localMediaPaths: attachments.map((file) => file.name),
    };
    saveDraft(draft);
    setStatus("Draft saved locally.");
  };

  const handleSubmit = async () => {
    if (!title || !(siteId || profile.siteIds.length)) {
      setStatus("Please provide a report title and site.");
      return;
    }
    setSubmitting(true);
    setStatus(null);
    const report: Report = {
      id: "",
      title,
      details,
      userId: profile.uid,
      siteId: siteId || profile.siteIds[0],
      status: "submitted",
      createdAt: new Date(),
      updatedAt: new Date(),
      mediaUrls: [],
    };
    try {
      await submitReport(report, attachments, profile);
      setStatus("Report submitted successfully.");
      setTitle("");
      setDetails("");
      setAttachments([]);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Submission failed.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="stack">
      <div className="card">
        <p className="eyebrow">New Report</p>
        <h2>Create and submit an incident report</h2>
        <p className="muted">
          Attach photos, add details, and submit to the correct site folder.
        </p>
      </div>

      <div className="card">
        <div className="stack">
          <div className="field">
            <label htmlFor="title">Report title</label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="details">Details</label>
            <textarea
              id="details"
              rows={6}
              value={details}
              onChange={(event) => setDetails(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="site">Site</label>
            <select
              id="site"
              value={siteId}
              onChange={(event) => setSiteId(event.target.value)}
            >
              <option value="">Select site</option>
              {sites.data.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="attachments">Attachments</label>
            <input
              id="attachments"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            {attachments.length ? (
              <p className="small muted">
                {attachments.length} file(s) selected
              </p>
            ) : null}
          </div>
          {status && <p className="muted">{status}</p>}
          <div className="row">
            <button className="button ghost" onClick={handleSaveDraft}>
              Save draft
            </button>
            <button
              className="button primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
