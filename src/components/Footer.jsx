import React from 'react';

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <span className="footer-title">🎬 <b>Movie Master</b></span>
      <span className="footer-divider">|</span>
      <span>
        &copy; {new Date().getFullYear()} &nbsp;|&nbsp; Made with <span style={{color: "#ff6b6b"}}>❤️</span>
        &nbsp;by <a href="https://github.com/sankalpa2002" target="_blank" rel="noopener noreferrer" className="footer-link">U.S.S.S Sankalpa</a>
      </span>
    </div>
  </footer>
);

export default Footer; 