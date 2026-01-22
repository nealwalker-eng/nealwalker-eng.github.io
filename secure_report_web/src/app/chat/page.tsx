"use client";

import { useState } from "react";

import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/lib/auth";
import { sendChatMessage, useChatChannels, useChatMessages } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";

export default function ChatPage() {
  return (
    <AuthGate>
      <ChatContent />
    </AuthGate>
  );
}

function ChatContent() {
  const { state } = useAuth();
  const profile = state.profile!;
  const channels = useChatChannels(profile);
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const messages = useChatMessages(selectedChannel);
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim() || !selectedChannel) {
      return;
    }
    await sendChatMessage(selectedChannel, profile, text.trim());
    setText("");
  };

  return (
    <div className="stack">
      <div className="card">
        <p className="eyebrow">Chats</p>
        <h2>Site and organization channels</h2>
        <p className="muted">
          Supervisors can view all channels, officers see assigned sites.
        </p>
      </div>

      <div className="card">
        <div className="field">
          <label htmlFor="channel">Channel</label>
          <select
            id="channel"
            value={selectedChannel}
            onChange={(event) => setSelectedChannel(event.target.value)}
          >
            <option value="">Select channel</option>
            {channels.data.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card">
        <div className="stack">
          {messages.loading ? (
            <p className="muted">Loading messages...</p>
          ) : messages.data.length ? (
            messages.data.map((message) => (
              <div key={message.id} className="card">
                <p className="strong">{message.senderName}</p>
                <p>{message.message}</p>
                <p className="small muted">
                  {formatDateTime(message.timestamp)}
                </p>
              </div>
            ))
          ) : (
            <p className="muted">No messages yet.</p>
          )}
        </div>
      </div>

      <div className="card">
        <div className="field">
          <label htmlFor="message">Send message</label>
          <textarea
            id="message"
            rows={3}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type an update for your team..."
          />
        </div>
        <button className="button primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
