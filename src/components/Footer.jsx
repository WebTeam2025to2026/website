import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand Section */}
        <div style={styles.brand}>
          <h3 style={styles.brandTitle}>Quiz Club</h3>
          <p style={styles.brandDesc}>
            Building community and connections for students everywhere.
          </p>
          <div style={styles.tagline}>
            <span style={styles.emoji}>🎓</span>
            <span>Empowering Future Leaders</span>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Quick Links</h4>
          <div style={styles.links}>
            <Link to="/" style={styles.link} className="footer-link">
              <span style={styles.linkIcon}>🏠</span> Home
            </Link>
            <Link to="/about" style={styles.link} className="footer-link">
              <span style={styles.linkIcon}>ℹ️</span> About
            </Link>
            <Link to="/events" style={styles.link} className="footer-link">
              <span style={styles.linkIcon}>📅</span> Events
            </Link>
            <Link to="/gallery" style={styles.link} className="footer-link">
              <span style={styles.linkIcon}>🖼️</span> Gallery
            </Link>
          </div>
        </div>

        {/* Contact & Social */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Connect With Us</h4>
          <div style={styles.contact}>
            <p style={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              hello@collegeclub.edu
            </p>
            <p style={styles.contactItem}>
              <span style={styles.contactIcon}>📞</span>
              (555) 123-4567
            </p>
          </div>
          <div style={styles.socials}>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialIcon} 
              className="footer-social"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialIcon} 
              className="footer-social"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialIcon} 
              className="footer-social"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://collegeclub.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialIcon} 
              className="footer-social"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 13.8h-3.92v1.2h3.92v1.2H13.65v-6h3.92v1.2h-2.72v1.2h2.72v1.4zm-7.65-4.2H6v6h1.2v-2.4h2.52c1.319 0 1.8-.6 1.8-1.8s-.481-1.8-1.8-1.8zM7.2 11.4v-1.2h1.32c.528 0 .6.24.6.6s-.072.6-.6.6H7.2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottom}>
        <hr style={styles.line} />
        <div style={styles.bottomContent}>
          <p style={styles.copy}>
            © {new Date().getFullYear()} College Club. All Rights Reserved.
          </p>
          <div style={styles.policies}>
            <Link to="/privacy" style={styles.policyLink} className="footer-link">
              Privacy Policy
            </Link>
            <span style={styles.separator}>•</span>
            <Link to="/terms" style={styles.policyLink} className="footer-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for animations */}
      <style>
        {`
          .footer-link {
            transition: all 0.3s ease;
            position: relative;
          }
          
          .footer-link:hover {
            color: #6a0dad !important;
            transform: translateY(-2px);
          }
          
          .footer-link:hover::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, #6a0dad, #9d4edd);
            animation: slideIn 0.3s ease;
          }
          
          .footer-social {
            transition: all 0.3s ease;
            transform-origin: center;
          }
          
          .footer-social:hover {
            transform: scale(1.2) rotate(10deg);
            filter: drop-shadow(0 4px 8px rgba(106, 13, 173, 0.3));
          }
          
          @keyframes slideIn {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @media (max-width: 768px) {
            .footer-container {
              flex-direction: column;
              text-align: center;
            }
            
            .footer-bottom-content {
              flex-direction: column;
              gap: 10px;
            }
          }
        `}
      </style>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    color: "#2c3e50",
    padding: "40px 20px 20px",
    marginTop: "40px",
    borderTop: "3px solid #6a0dad",
    position: "relative",
    overflow: "hidden",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    className: "footer-container",
  },
  brand: {
    flex: "2",
    minWidth: "250px",
    textAlign: "left",
  },
  brandTitle: {
    marginBottom: "10px",
    fontSize: "28px",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #6a0dad, #9d4edd)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  brandDesc: {
    margin: "0 0 15px 0",
    fontSize: "16px",
    color: "#5a6c7d",
    lineHeight: "1.5",
  },
  tagline: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#6a0dad",
    fontSize: "14px",
    fontWeight: "500",
  },
  emoji: {
    fontSize: "18px",
  },
  section: {
    flex: "1",
    minWidth: "180px",
    textAlign: "left",
  },
  sectionTitle: {
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#2c3e50",
    borderBottom: "2px solid #6a0dad",
    paddingBottom: "5px",
    display: "inline-block",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    textDecoration: "none",
    color: "#5a6c7d",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "5px 0",
  },
  linkIcon: {
    fontSize: "14px",
    opacity: 0.8,
  },
  contact: {
    marginBottom: "20px",
  },
  contactItem: {
    margin: "8px 0",
    color: "#5a6c7d",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  contactIcon: {
    fontSize: "16px",
  },
  socials: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  socialIcon: {
    display: "inline-block",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #6a0dad, #9d4edd)",
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(106, 13, 173, 0.2)",
  },
  bottom: {
    marginTop: "30px",
  },
  line: {
    border: "none",
    borderTop: "1px solid #dee2e6",
    margin: "0 0 20px 0",
    opacity: 0.7,
  },
  bottomContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    className: "footer-bottom-content",
  },
  copy: {
    margin: 0,
    fontSize: "14px",
    color: "#6c757d",
  },
  policies: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  policyLink: {
    textDecoration: "none",
    color: "#6c757d",
    fontSize: "14px",
  },
  separator: {
    color: "#6c757d",
    fontSize: "14px",
  },
};