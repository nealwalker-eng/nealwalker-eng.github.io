"use client";

import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/lib/auth";
import { useReports, useSchedule, useSites, useWeather } from "@/lib/data";
import type { Site } from "@/lib/models";
import { distanceInMeters, formatDateTime, formatDayTime } from "@/lib/utils";

export function DashboardView() {
  const { state } = useAuth();
  const profile = state.profile!;
  const weather = useWeather();
  const sites = useSites();
  const schedule = useSchedule(profile);
  const reports = useReports(profile);
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [suggestedSite, setSuggestedSite] = useState<Site | null>(null);

  useEffect(() => {
    if (sites.data.length && !selectedSite) {
      setSelectedSite(sites.data[0].id);
    }
  }, [sites.data, selectedSite]);

  useEffect(() => {
    if (!sites.data.length || !navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const closest = sites.data.reduce<{
        site: Site;
        distance: number;
      } | null>((best, site) => {
        if (!site.location) {
          return best;
        }
        const distance = distanceInMeters(
          position.coords.latitude,
          position.coords.longitude,
          site.location.lat,
          site.location.lng,
        );
        if (!best || distance < best.distance) {
          return { site, distance };
        }
        return best;
      }, null);
      if (closest) {
        setSuggestedSite(closest.site);
      }
    });
  }, [sites.data]);

  const quickStats = useMemo(() => {
    const total = reports.data.length;
    const drafts = reports.data.filter((report) => report.status === "draft");
    const submitted = reports.data.filter(
      (report) => report.status === "submitted",
    );
    return { total, drafts: drafts.length, submitted: submitted.length };
  }, [reports.data]);

  return (
    <div className="stack">
      <div className="grid two">
        <div className="card">
          <p className="eyebrow">Today</p>
          <h2>{formatDateTime(new Date())}</h2>
          {weather.loading ? (
            <p className="muted">Loading weather...</p>
          ) : (
            <p>
              {weather.data?.condition} · {weather.data?.temperatureF}F
            </p>
          )}
          <p className="small muted">{weather.data?.location}</p>
        </div>
        <div className="card">
          <p className="eyebrow">Account</p>
          <h2>{profile.displayName}</h2>
          <p className="muted">{profile.email}</p>
          <p className="tag">{profile.role.toUpperCase()}</p>
        </div>
      </div>

      <div className="card">
        <p className="eyebrow">Active Site</p>
        {sites.loading ? (
          <p className="muted">Loading sites...</p>
        ) : (
          <div className="stack">
            <div className="field">
              <label htmlFor="site-select">Select site</label>
              <select
                id="site-select"
                value={selectedSite}
                onChange={(event) => setSelectedSite(event.target.value)}
              >
                {sites.data.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
            {suggestedSite && (
              <div className="banner">
                Suggested: {suggestedSite.name} (nearest by GPS)
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid three">
        <div className="card">
          <p className="eyebrow">Reports</p>
          <p className="strong">{quickStats.total}</p>
          <p className="muted">
            {quickStats.submitted} submitted · {quickStats.drafts} drafts
          </p>
        </div>
        <div className="card">
          <p className="eyebrow">Upcoming Shift</p>
          {schedule.data[0] ? (
            <>
              <p className="strong">{schedule.data[0].siteId}</p>
              <p className="muted">
                {formatDayTime(schedule.data[0].start)} -{" "}
                {formatDayTime(schedule.data[0].end)}
              </p>
            </>
          ) : (
            <p className="muted">No upcoming shifts.</p>
          )}
        </div>
        <div className="card">
          <p className="eyebrow">Chat</p>
          <p className="strong">Live</p>
          <p className="muted">Site + organization channels</p>
        </div>
      </div>

      <div className="grid two">
        <div className="card">
          <p className="eyebrow">Upcoming Schedule</p>
          <div className="stack">
            {schedule.data.slice(0, 3).map((shift) => (
              <div key={`${shift.siteId}-${shift.start.toISOString()}`}>
                <p className="strong">{shift.siteId}</p>
                <p className="muted">
                  {formatDayTime(shift.start)} - {formatDayTime(shift.end)}
                </p>
              </div>
            ))}
            {!schedule.data.length && (
              <p className="muted">No schedule data available.</p>
            )}
          </div>
        </div>
        <div className="card">
          <p className="eyebrow">Recent Reports</p>
          <div className="stack">
            {reports.data.slice(0, 3).map((report) => (
              <div key={report.id}>
                <p className="strong">{report.title}</p>
                <p className="muted">
                  {report.siteId} · {formatDateTime(report.updatedAt)}
                </p>
                <span
                  className={`tag ${
                    report.status === "submitted" ? "success" : "warning"
                  }`}
                >
                  {report.status}
                </span>
              </div>
            ))}
            {!reports.data.length && (
              <p className="muted">No reports yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
