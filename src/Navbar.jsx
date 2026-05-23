import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ user, onLoginClick, onRegisterClick, onLogout, onListItemClick, onLogoClick, isDarkMode, onToggleTheme }) {
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

        {/* Auth + Theme Toggle */}
        <div className="navbar-auth">
  <button className="theme-toggle" onClick={onToggleTheme} title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
    {isDarkMode ? "☀️" : "🌙"}
  </button>

  {/* Cart Icon */}
  <button className="cart-btn" style={{width:"100%", borderRadius:"8px"}} onClick={() => setMenuOpen(false)}>
  🛒 Cart
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
          {user ? (
            <>
              <button className="btn-logout" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-nav-login" onClick={() => { onLoginClick(); setMenuOpen(false); }}>Login</button>
              <button className="btn-nav-register" onClick={() => { onListItemClick(); setMenuOpen(false); }}>List an Item</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
