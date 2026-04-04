import { useState } from "react";
import "./AddListing.css";

const CATEGORIES = ["Books", "Electronics", "Tools", "Furniture", "Sports Equipment", "Other"];
const CONDITIONS = ["New", "Like New", "Good", "Fair", "Poor"];

export default function AddListing({ onClose, isModal = false, apiUrl, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    pricePerDay: "",
    condition: "Good",
    location: { city: "", state: "" },
  });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "state") {
      setForm((prev) => ({ ...prev, location: { ...prev.location, [name]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.title || !form.description || !form.category || !form.pricePerDay) {
      setError("Please fill in all required fields.");
      return;
    }
    if (Number(form.pricePerDay) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    const token = localStorage.getItem("lendit_token");
    if (!token) {
      setError("You must be logged in to add a listing.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          pricePerDay: Number(form.pricePerDay),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          if (onSuccess) onSuccess(data.data);
          if (onClose) onClose();
        }, 1800);
      } else {
        setError(data.message || "Failed to create listing.");
      }
    } catch {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <div className={`add-listing-box ${isModal ? "add-listing-box--modal" : ""}`}>
      {/* Header */}
      <div className="al-header">
        {isModal && (
          <button className="al-close" onClick={onClose}>×</button>
        )}
        <div className="al-badge">New Listing</div>
        <h2 className="al-title">List an Item</h2>
        <p className="al-subtitle">Share something with your community and earn while it sits idle</p>
      </div>

      {/* Success State */}
      {success ? (
        <div className="al-success">
          <div className="success-icon">🎉</div>
          <h3 className="success-title">Item Listed Successfully!</h3>
          <p className="success-sub">Your item is now visible to the community</p>
        </div>
      ) : (
        <form className="al-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Item Title *</label>
            <input
              name="title"
              type="text"
              className="form-input"
              placeholder="e.g. Mountain Bike, Canon Camera, Chess Set"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              className="form-input form-textarea"
              placeholder="Describe your item — condition, brand, what's included..."
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          {/* Category + Condition */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                name="category"
                className="form-input form-select"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Condition *</label>
              <select
                name="condition"
                className="form-input form-select"
                value={form.condition}
                onChange={handleChange}
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="form-group">
            <label className="form-label">Price per Day (₹) *</label>
            <div className="price-input-wrap">
              <span className="price-prefix">₹</span>
              <input
                name="pricePerDay"
                type="number"
                className="form-input price-input"
                placeholder="0"
                value={form.pricePerDay}
                onChange={handleChange}
                min="1"
                required
              />
              <span className="price-suffix">/day</span>
            </div>
          </div>

          {/* Location */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                name="city"
                type="text"
                className="form-input"
                placeholder="e.g. Delhi"
                value={form.location.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input
                name="state"
                type="text"
                className="form-input"
                placeholder="e.g. Delhi"
                value={form.location.state}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Publishing..." : "🚀 Publish Listing"}
          </button>
        </form>
      )}
    </div>
  );

  // Render as modal or page
  if (isModal) {
    return (
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {formContent}
      </div>
    );
  }

  return <div className="add-listing-page">{formContent}</div>;
}
