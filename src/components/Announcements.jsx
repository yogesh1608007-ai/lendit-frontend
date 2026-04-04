import { useState, useEffect } from "react";
import "./PageScreens.css";

const API_URL = "https://lendit-backend-production.up.railway.app";

export default function Announcements({ user }) {
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("received");

  useEffect(() => {
    if (!user) return;
    fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("lendit_token");
      const [recRes, sentRes] = await Promise.all([
        fetch(`${API_URL}/api/borrow/received`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/borrow/sent`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const recData = await recRes.json();
      const sentData = await sentRes.json();
      if (recData.success) setReceived(recData.data);
      if (sentData.success) setSent(sentData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const token = localStorage.getItem("lendit_token");
      const res = await fetch(`${API_URL}/api/borrow/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="page-screen">
        <div className="page-empty">
          <div className="page-empty-icon">🔔</div>
          <h2 className="page-empty-title">Login to see notifications</h2>
          <p className="page-empty-sub">Your activity and alerts will appear here</p>
        </div>
      </div>
    );
  }

  const statusIcon = (status) => status === "accepted" ? "✅" : status === "rejected" ? "❌" : "⏳";
  const statusColor = (status) => status === "accepted" ? "#4caf50" : status === "rejected" ? "#f44336" : "#ff9800";

  return (
    <div className="page-screen">
      <div className="page-header">
        <div>
          <h1 className="page-title">Activity</h1>
          <p className="page-subtitle">Borrow requests</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => setTab("received")} style={{
          padding: "8px 20px", borderRadius: "100px", border: "none", cursor: "pointer",
          background: tab === "received" ? "var(--accent)" : "var(--bg-input)",
          color: tab === "received" ? "var(--accent-text)" : "var(--text-primary)",
          fontWeight: "600", fontFamily: "var(--font-display)"
        }}>
          Received {received.length > 0 && `(${received.length})`}
        </button>
        <button onClick={() => setTab("sent")} style={{
          padding: "8px 20px", borderRadius: "100px", border: "none", cursor: "pointer",
          background: tab === "sent" ? "var(--accent)" : "var(--bg-input)",
          color: tab === "sent" ? "var(--accent-text)" : "var(--text-primary)",
          fontWeight: "600", fontFamily: "var(--font-display)"
        }}>
          Sent {sent.length > 0 && `(${sent.length})`}
        </button>
      </div>

      {loading ? <p style={{ color: "var(--text-muted)" }}>Loading...</p> : (
        <div className="notification-list">
          {tab === "received" && (
            received.length === 0 ? (
              <div className="page-empty">
                <div className="page-empty-icon">📭</div>
                <p className="page-empty-title">No requests yet</p>
              </div>
            ) : received.map((req) => (
              <div key={req._id} className="notif-card" style={{ borderLeft: `3px solid ${statusColor(req.status)}` }}>
                <div className="notif-icon">{statusIcon(req.status)}</div>
                <div className="notif-body">
                  <p className="notif-message">
                    <strong>{req.borrower?.name}</strong> wants to borrow <strong>{req.item?.title}</strong>
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
                    ₹{req.item?.pricePerDay}/day • {req.status}
                  </p>
                  {req.status === "pending" && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => handleAction(req._id, "accepted")} style={{
                        background: "#4caf50", color: "white", border: "none",
                        padding: "6px 16px", borderRadius: "100px", cursor: "pointer", fontWeight: "600"
                      }}>Accept ✅</button>
                      <button onClick={() => handleAction(req._id, "rejected")} style={{
                        background: "#f44336", color: "white", border: "none",
                        padding: "6px 16px", borderRadius: "100px", cursor: "pointer", fontWeight: "600"
                      }}>Reject ❌</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {tab === "sent" && (
            sent.length === 0 ? (
              <div className="page-empty">
                <div className="page-empty-icon">📤</div>
                <p className="page-empty-title">No requests sent yet</p>
              </div>
            ) : sent.map((req) => (
              <div key={req._id} className="notif-card" style={{ borderLeft: `3px solid ${statusColor(req.status)}` }}>
                <div className="notif-icon">{statusIcon(req.status)}</div>
                <div className="notif-body">
                  <p className="notif-message">
                    You requested to borrow <strong>{req.item?.title}</strong> from <strong>{req.owner?.name}</strong>
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    Status: <strong>{req.status}</strong>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}