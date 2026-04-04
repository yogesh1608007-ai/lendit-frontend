import { useState } from "react";
import "./PageScreens.css";

const SAMPLE_DEMANDS = [
  { id: 1, item: "Pressure Cooker", category: "Utensils", user: "Riya M.", location: "Delhi", time: "1h ago", responses: 2 },
  { id: 2, item: "Electric Drill", category: "Tools", user: "Suresh K.", location: "Mumbai", time: "3h ago", responses: 0 },
  { id: 3, item: "Harry Potter Series", category: "Books", user: "Ananya S.", location: "Bangalore", time: "1d ago", responses: 5 },
  { id: 4, item: "Gaming Chair", category: "Furniture", user: "Karan P.", location: "Pune", time: "2d ago", responses: 1 },
];

export default function Demand({ user }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ item: "", category: "", description: "", location: "" });
  const [submitted, setSubmitted] = useState(false);

  const CATEGORIES = ["Books", "Electronics", "Tools", "Furniture", "Sports Equipment", "Other"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setForm({ item: "", category: "", description: "", location: "" });
    }, 2000);
  };

  return (
    <div className="page-screen">
      <div className="page-header">
        <div>
          <h1 className="page-title">Demands</h1>
          <p className="page-subtitle">Request something you need to borrow</p>
        </div>
        {user && (
          <button className="page-action-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ New Demand"}
          </button>
        )}
      </div>

      {/* Raise Demand Form */}
      {showForm && (
        <div className="demand-form-card">
          {submitted ? (
            <div className="al-success">
              <div className="success-icon">🎉</div>
              <h3 className="success-title">Demand Posted!</h3>
              <p className="success-sub">Community members will respond soon</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="demand-form-title">What do you need?</h3>
              <div className="form-group">
                <label className="form-label">Item Name *</label>
                <input className="form-input" placeholder="e.g. Electric Drill, Tent, Projector" value={form.item}
                  onChange={(e) => setForm({...form, item: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-input" value={form.category}
                  onChange={(e) => setForm({...form, category: e.target.value})} required
                  style={{appearance:"none", cursor:"pointer"}}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows={3} placeholder="Any specific requirements..."
                  value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
                  style={{resize:"vertical", fontFamily:"inherit"}} />
              </div>
              <div className="form-group">
                <label className="form-label">Your Location</label>
                <input className="form-input" placeholder="e.g. Delhi, Mumbai" value={form.location}
                  onChange={(e) => setForm({...form, location: e.target.value})} />
              </div>
              <button type="submit" className="btn-primary">📢 Post Demand</button>
            </form>
          )}
        </div>
      )}

      {/* Demands List */}
      <div className="demand-list">
        <h3 className="demand-list-title">Community Demands</h3>
        {SAMPLE_DEMANDS.map((demand) => (
          <div key={demand.id} className="demand-card">
            <div className="demand-card-top">
              <div className="demand-category-badge">{demand.category}</div>
              <span className="demand-time">{demand.time}</span>
            </div>
            <h4 className="demand-item-name">Looking for: {demand.item}</h4>
            <div className="demand-meta">
              <span className="demand-user">👤 {demand.user}</span>
              <span className="demand-location">📍 {demand.location}</span>
            </div>
            <div className="demand-footer">
              <span className="demand-responses">{demand.responses} responses</span>
              {user && <button className="demand-respond-btn">I can help!</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
