import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryBar from "./components/CategoryBar";
import ItemGrid from "./components/ItemGrid";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import AddListing from "./components/AddListing";
import BottomNav from "./components/BottomNav";
import Announcements from "./components/Announcements";
import Inbox from "./components/Inbox";
import Demand from "./components/Demand";
import "./App.css";

const API_URL = "http://localhost:3001";

export default function App() {
  const [homeData, setHomeData]         = useState(null);
  const [items, setItems]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchQuery, setSearchQuery]   = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePage, setActivePage]     = useState("home");
  const [showLogin, setShowLogin]       = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddListing, setShowAddListing] = useState(false);
  const [isDarkMode, setIsDarkMode]     = useState(() => {
    return localStorage.getItem("lendit_theme") !== "light";
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("lendit_user");
    return saved ? JSON.parse(saved) : null;
  });

  // ── Apply theme ───────────────────────────────────────────
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light-mode");
      localStorage.setItem("lendit_theme", "dark");
    } else {
      document.body.classList.add("light-mode");
      localStorage.setItem("lendit_theme", "light");
    }
  }, [isDarkMode]);

  // ── Fetch home data ───────────────────────────────────────
  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      setLoading(true);
      const res  = await fetch(`${API_URL}/api/home`);
      const data = await res.json();
      if (data.success) {
        setHomeData(data.data);
        setItems(data.data.latestItems);
      }
    } catch (err) {
      console.error("Failed to fetch home data:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Search ────────────────────────────────────────────────
  const handleSearch = async (q) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (q) params.append("q", q);
      if (activeCategory !== "All") params.append("category", activeCategory);
      const res  = await fetch(`${API_URL}/api/home/search?${params}`);
      const data = await res.json();
      if (data.success) setItems(data.data.items);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Category filter ───────────────────────────────────────
  const handleCategory = async (category) => {
    setActiveCategory(category);
    try {
      setLoading(true);
      if (category === "All") {
        setItems(homeData?.latestItems || []);
        setLoading(false);
        return;
      }
      const res  = await fetch(`${API_URL}/api/home/category/${encodeURIComponent(category)}`);
      const data = await res.json();
      if (data.success) setItems(data.data.items);
    } catch (err) {
      console.error("Category fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Auth ──────────────────────────────────────────────────
  const handleLogin = (userData, token) => {
    localStorage.setItem("lendit_token", token);
    localStorage.setItem("lendit_user", JSON.stringify(userData));
    setUser(userData);
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("lendit_token");
    localStorage.removeItem("lendit_user");
    setUser(null);
  };

  // ── List Item ─────────────────────────────────────────────
  const handleListItemClick = () => {
    if (!user) { setShowLogin(true); return; }
    setActivePage("publish");
  };

  // ── Navigate via bottom nav ───────────────────────────────
  const handleNavigate = (page) => {
    if (page === "publish") {
      if (!user) { setShowLogin(true); return; }
      setActivePage("publish");
      return;
    }
    setActivePage(page);
  };

  // ── After listing success ─────────────────────────────────
  const handleListingSuccess = () => {
    fetchHome();
    setActivePage("home");
    setShowAddListing(false);
  };

  const categories = ["All", ...(homeData?.categories?.map(c => c.name) || [])];

  const navbarProps = {
    user,
    onLoginClick: () => setShowLogin(true),
    onRegisterClick: () => setShowRegister(true),
    onLogout: handleLogout,
    onListItemClick: handleListItemClick,
    onLogoClick: () => setActivePage("home"),
    isDarkMode,
    onToggleTheme: () => setIsDarkMode(p => !p),
  };

  // ── Render current page ───────────────────────────────────
  const renderPage = () => {
    switch (activePage) {
      case "announcements":
        return <Announcements user={user} />;
      case "inbox":
        return <Inbox user={user} />;
      case "publish":
        return (
          <AddListing
            isModal={false}
            apiUrl={API_URL}
            onSuccess={handleListingSuccess}
            onClose={() => setActivePage("home")}
          />
        );
      case "demand":
        return <Demand user={user} />;
      default:
        return (
          <>
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
            <main className="main-content">
              <CategoryBar categories={categories} activeCategory={activeCategory} onCategoryChange={handleCategory} categoryCounts={homeData?.categories || []} />
              <section className="items-section">
                <div className="section-header">
                  <h2 className="section-title">{activeCategory === "All" ? "Recently Listed" : activeCategory}</h2>
                  <span className="item-count">{items.length} items</span>
                </div>
                <ItemGrid items={items} loading={loading} user={user} />
              </section>
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="app">
      <Navbar {...navbarProps} />
      {renderPage()}
      <BottomNav
        activePage={activePage}
        onNavigate={handleNavigate}
        user={user}
        notifications={3}
        messages={2}
      />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} apiUrl={API_URL} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} onRegister={handleLogin} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} apiUrl={API_URL} />}
    </div>
  );
}
