import { useState, useEffect } from "react";
import "./Hero.css";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    title: "Borrow Tools",
    subtitle: "Need a drill for one day? Borrow it from your neighbor!"
  },
  {
    image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=1200&q=80",
    title: "Share Electronics",
    subtitle: "Cameras, laptops, gadgets — available in your community"
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    title: "Lend & Earn",
    subtitle: "List your idle items and earn money every day"
  },
  {
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80",
    title: "Borrow Books",
    subtitle: "Thousands of books available from your community"
  },
  {
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    title: "Sports Equipment",
    subtitle: "Rent sports gear without buying — save money!"
  },
];

export default function Hero({ searchQuery, setSearchQuery, onSearch }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="hero">
      {/* Search bar at top */}
      <div className="hero-search-top">
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
        <div className="hero-tags">
          <span className="tags-label">Popular:</span>
          {["Books", "Electronics", "Tools", "Games", "Furniture"].map((tag) => (
            <button key={tag} className="tag-pill"
              onClick={() => { setSearchQuery(tag); onSearch(tag); }}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Sliding images */}
      <div className="slideshow">
        {SLIDES.map((slide, i) => (
          <div key={i} className={`slide ${i === current ? "slide--active" : ""}`}>
            <img src={slide.image} alt={slide.title} className="slide-img" />
            <div className="slide-overlay">
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-sub">{slide.subtitle}</p>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div className="slide-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`dot ${i === current ? "dot--active" : ""}`}
              onClick={() => setCurrent(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}