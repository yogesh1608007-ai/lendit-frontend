import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">Lendit.</div>
            <p className="footer-tagline">Need it? Lend it.</p>
            <p className="footer-made">Made with ❤️ by Team Code Titans</p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              {["Books", "Electronics", "Tools", "Furniture", "Sports Equipment", "Other"].map(cat => (
                <li key={cat}><a href="#categories" className="footer-link">{cat}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li><span className="footer-link">📞 Helpline: +91 XXXXXXXXXX</span></li>
              <li><span className="footer-link">✉️ team@lendit.in</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2024 Lendit. All rights reserved.</p>
          <p className="footer-copy">Built for the community 🌍</p>
        </div>
      </div>
    </footer>
  );
}
