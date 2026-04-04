import "./PageScreens.css";

const SAMPLE_NOTIFICATIONS = [
  { id: 1, type: "accepted", message: "Your borrow request for 'Mountain Bike' was accepted!", time: "2 mins ago", icon: "✅" },
  { id: 2, type: "rejected", message: "Your borrow request for 'Canon Camera' was rejected.", time: "1 hour ago", icon: "❌" },
  { id: 3, type: "new_request", message: "Someone wants to borrow your 'Chess Set'", time: "3 hours ago", icon: "📬" },
  { id: 4, type: "returned", message: "Your 'Drill Machine' has been marked as returned.", time: "Yesterday", icon: "🔄" },
  { id: 5, type: "reminder", message: "Reminder: Return 'Guitar' by tomorrow!", time: "Yesterday", icon: "⏰" },
];

export default function Announcements({ user }) {
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

  return (
    <div className="page-screen">
      <div className="page-header">
        <h1 className="page-title">Activity</h1>
        <p className="page-subtitle">Your notifications and alerts</p>
      </div>

      <div className="notification-list">
        {SAMPLE_NOTIFICATIONS.map((notif) => (
          <div key={notif.id} className={`notif-card notif-card--${notif.type}`}>
            <div className="notif-icon">{notif.icon}</div>
            <div className="notif-body">
              <p className="notif-message">{notif.message}</p>
              <span className="notif-time">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
