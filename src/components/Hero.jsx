import "./Hero.css";

export default function Hero({ searchQuery, setSearchQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="hero">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-gradient" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <span className="badge-dot" />
          Always available, when you are in need
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          Need it?
          <br />
          <span className="headline-accent">Lend it.</span>
        </h1>

        <p className="hero-sub">
          Borrow anything from your community — books, electronics, tools, furniture & more.
          Save money, reduce waste, help each other.
        </p>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSubmit}>
          <div className="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search for items to borrow..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        {/* Popular tags */}
        <div className="hero-tags">
          <span className="tags-label">Popular:</span>
          {["Books", "Electronics", "Tools", "Games", "Furniture"].map((tag) => (
            <button
              key={tag}
              className="tag-pill"
              onClick={() => { setSearchQuery(tag); onSearch(tag); }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-num">500+</span>
          <span className="stat-label">Items Listed</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">200+</span>
          <span className="stat-label">Happy Borrowers</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">6</span>
          <span className="stat-label">Categories</span>
        </div>
      </div>
    </section>
  );
}
