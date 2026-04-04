import "./ItemGrid.css";

function SkeletonCard() {
  return (
    <div className="item-card skeleton">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line" style={{width:"60%", height:"12px"}} />
        <div className="skeleton-line" style={{width:"90%", height:"18px", marginTop:"8px"}} />
        <div className="skeleton-line" style={{width:"75%", height:"14px", marginTop:"6px"}} />
        <div className="skeleton-footer">
          <div className="skeleton-line" style={{width:"40%", height:"20px"}} />
          <div className="skeleton-line" style={{width:"28%", height:"32px", borderRadius:"100px"}} />
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item }) {
  const image = item.images?.[0] || null;
  const ownerInitial = item.owner?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="item-card">
      {/* Image */}
      <div className="card-img-wrap">
        {image ? (
          <img src={image} alt={item.title} className="card-img" />
        ) : (
          <div className="card-img-placeholder">
            <span>{item.category === "Books" ? "📚" :
                   item.category === "Electronics" ? "💻" :
                   item.category === "Tools" ? "🔧" :
                   item.category === "Furniture" ? "🪑" :
                   item.category === "Sports Equipment" ? "⚽" : "📦"}</span>
          </div>
        )}
        <div className="card-category-badge">{item.category}</div>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-meta">
          <div className="card-owner">
            <div className="owner-avatar">{ownerInitial}</div>
            <span className="owner-name">{item.owner?.name || "User"}</span>
          </div>
          <div className="card-condition">{item.condition}</div>
        </div>

        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.description}</p>

        {item.location?.city && (
          <div className="card-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {item.location.city}
          </div>
        )}

        <div className="card-footer">
          <div className="card-price">
            <span className="price-currency">₹</span>
            <span className="price-amount">{item.pricePerDay}</span>
            <span className="price-unit">/day</span>
          </div>
          <button className="card-btn">Borrow</button>
        </div>
      </div>
    </div>
  );
}

export default function ItemGrid({ items, loading }) {
  if (loading) {
    return (
      <div className="item-grid">
        {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3 className="empty-title">No items found</h3>
        <p className="empty-sub">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="item-grid">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
