import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src="/images/footer-logo.jpeg" alt="Logo" className="footer-logo" />
          <p>&copy; 2025 FireGuard.AI. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
