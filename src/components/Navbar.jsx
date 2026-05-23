import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ user, onLoginClick, onRegisterClick, onLogout, onLogoClick, isDarkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-logo" onClick={onLogoClick} style={{cursor:"pointer"}}>
          <span className="logo-text">Lendit.</span>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-links">
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Auth + Theme + Cart */}
        <div className="navbar-auth">
          <button className="theme-toggle" onClick={onToggleTheme} title={isDarkMode ? "Light Mode" : "Dark Mode"}>
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          {/* Cart Icon */}
          <button className="cart-btn" title="Cart" onClick={() => alert("Cart coming soon!")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>

          {user ? (
            <div className="user-menu">
              <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
              <span className="user-name">{user.name}</span>
              <button className="btn-logout" onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <>
              <button className="btn-nav-login" onClick={onLoginClick}>Login</button>
              <button className="btn-nav-register" onClick={onRegisterClick}>Register</button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#how-it-works" className="mobile-link" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#categories" className="mobile-link" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="theme-toggle" onClick={() => { onToggleTheme(); setMenuOpen(false); }}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button className="cart-btn" style={{width:"100%", borderRadius:"8px"}} onClick={() => { alert("Cart coming soon!"); setMenuOpen(false); }}>
            🛒 Cart