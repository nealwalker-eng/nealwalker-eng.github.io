"use client";

import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/lib/auth";
import { useSchedule, useSites } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";

export default function SchedulePage() {
  return (
    <AuthGate>
      <ScheduleContent />
    </AuthGate>
  );
}

function ScheduleContent() {
  const { state } = useAuth();
  const profile = state.profile!;
  const schedule = useSchedule(profile);
  const sites = useSites();

  return (
    <div className="stack">
      <div className="card">
        <p className="eyebrow">Weekly Schedule</p>
        <h2>Upcoming shifts</h2>
        <p className="muted">
          {profile.role === "supervisor"
            ? "Viewing schedules for all officers."
            : "Viewing your assigned shifts."}
        </p>
      </div>

      <div className="card">
        {schedule.loading ? (
          <p className="muted">Loading schedule...</p>
        ) : schedule.data.length ? (
          <div className="stack">
            {schedule.data.map((shift) => (
              <div key={`${shift.userId}-${shift.start.toISOString()}`} className="card">
                <p className="strong">
                  {sites.data.find((site) => site.id === shift.siteId)?.name ??
                    shift.siteId}
                </p>
                <p className="muted">
                  {formatDateTime(shift.start)} - {formatDateTime(shift.end)}
                </p>
                {profile.role === "supervisor" && (
                  <p className="small muted">Officer: {shift.userId}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">No shifts scheduled.</p>
        )}
      </div>

      {profile.role === "supervisor" && (
        <div className="card">
          <p className="eyebrow">Schedule Management</p>
          <p className="muted">
            Upload weekly schedules from Google Sheets and notify officers when updates are published.
          </p>
          <button className="button ghost">Upload Schedule (placeholder)</button>
        </div>
      )}
    </div>
  );
}
