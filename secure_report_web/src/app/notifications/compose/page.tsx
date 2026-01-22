"use client";

import { useState } from "react";

import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/lib/auth";
import { sendNotification, useSites } from "@/lib/data";
import type { NotificationRequest } from "@/lib/models";

export default function NotificationComposePage() {
  return (
    <AuthGate>
      <NotificationComposeContent />
    </AuthGate>
  );
}

function NotificationComposeContent() {
  const { state } = useAuth();
  const profile = state.profile!;
  const sites = useSites();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [target, setTarget] = useState("all-officers");
  const [status, setStatus] = useState<string | null>(null);

  if (profile.role !== "supervisor") {
    return (
      <div className="card">
        <p className="eyebrow">Notifications</p>
        <p className="muted">Supervisor access required.</p>
      </div>
    );
  }

  const handleSend = async () => {
    const targets: Record<string, string[]> = {};
    if (target === "all-officers") {
      targets.roles = ["officer"];
    } else if (target === "all-supervisors") {
      targets.roles = ["supervisor"];
    } else {
      targets.siteIds = [target];
    }
    const request: NotificationRequest = {
      title,
      body,
      senderId: profile.uid,
      targets,
      createdAt: new Date(),
    };
    try {
      await sendNotification(request);
      setStatus("Notification queued successfully.");
      setTitle("");
      setBody("");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Failed to send notification.",
      );
    }
  };

  return (
    <div className="stack">
      <div className="card">
        <p className="eyebrow">Send Notification</p>
        <h2>Broadcast an update</h2>
        <p className="muted">
          Target all officers, supervisors, or a specific site.
        </p>
      </div>

      <div className="card">
        <div className="stack">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="body">Message</label>
            <textarea
              id="body"
              rows={4}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="target">Target</label>
            <select
              id="target"
              value={target}
              onChange={(event) => setTarget(event.target.value)}
            >
              <option value="all-officers">All Officers</option>
              <option value="all-supervisors">All Supervisors</option>
              {sites.data.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
          {status && <p className="muted">{status}</p>}
          <button className="button primary" onClick={handleSend}>
            Send notification
          </button>
        </div>
      </div>
    </div>
  );
}
