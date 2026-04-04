import "./BottomNav.css";

const tabs = [
  {
    id: "home",
    label: "Home",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "announcements",
    label: "Activity",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    badge: true,
  },
  {
    id: "publish",
    label: "Publish",
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    isCenter: true,
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    badge: true,
  },
  {
    id: "demand",
    label: "Demand",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    ),
  },
];

export default function BottomNav({ activePage, onNavigate, user, notifications = 0, messages = 0 }) {
  const handleTabClick = (tab) => {
    if (tab.id === "publish") {
      onNavigate("publish");
      return;
    }
    onNavigate(tab.id);
  };

  return (
    <div className="bottom-nav-wrap">
      <nav className="bottom-nav">
        {tabs.map((tab) => {
          const isActive = activePage === tab.id;
          const badgeCount = tab.id === "announcements" ? notifications : tab.id === "inbox" ? messages : 0;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                className="bottom-tab bottom-tab--center"
                onClick={() => handleTabClick(tab)}
                title={tab.label}
              >
                <div className="center-btn">
                  {tab.icon(false)}
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              className={`bottom-tab ${isActive ? "bottom-tab--active" : ""}`}
              onClick={() => handleTabClick(tab)}
              title={tab.label}
            >
              <div className="tab-icon-wrap">
                {tab.icon(isActive)}
                {badgeCount > 0 && (
                  <span className="tab-badge">{badgeCount > 9 ? "9+" : badgeCount}</span>
                )}
              </div>
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
