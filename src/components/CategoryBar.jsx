import "./CategoryBar.css";

const CATEGORY_ICONS = {
  "All":              "🏠",
  "Books":            "📚",
  "Electronics":      "💻",
  "Tools":            "🔧",
  "Furniture":        "🪑",
  "Sports Equipment": "⚽",
  "Other":            "📦",
  "Games":            "🎮",
  "Toys":             "🧸",
  "Utensils":         "🍳",
};

export default function CategoryBar({ categories, activeCategory, onCategoryChange, categoryCounts }) {
  return (
    <div className="category-bar" id="categories">
      <div className="category-scroll">
        {categories.map((cat) => {
          const count = categoryCounts.find(c => c.name === cat)?.count ?? null;
          return (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? "cat-btn--active" : ""}`}
              onClick={() => onCategoryChange(cat)}
            >
              <span className="cat-icon">{CATEGORY_ICONS[cat] || "📦"}</span>
              <span className="cat-name">{cat}</span>
              {count !== null && count > 0 && (
                <span className="cat-count">{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
