import { useState } from "react";

export default function RegisterModal({ onClose, onRegister, onSwitchToLogin, apiUrl }) {
  const [form, setForm]       = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        onRegister(data.user, data.token);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{position:"relative"}}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Join Lendit</h2>
        <p className="modal-subtitle">Create your free account and start borrowing</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" type="text" className="form-input" placeholder="Your name"
              value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-input" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone (optional)</label>
            <input name="phone" type="tel" className="form-input" placeholder="Your phone number"
              value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-input" placeholder="Min. 6 characters"
              value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="form-switch">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
