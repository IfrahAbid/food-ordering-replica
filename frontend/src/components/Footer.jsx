import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-logo">
        <h2>Foodie</h2>
      </div>

      <p>Foodie Copyright © 2026. All Rights Reserved.</p>

      <div className="footer-policy">
        <Link to="/terms">TERMS & CONDITIONS</Link>
        <span>|</span>
        <Link to="/privacy">PRIVACY POLICY</Link>
      </div>

    </footer>
  );
}

export default Footer;