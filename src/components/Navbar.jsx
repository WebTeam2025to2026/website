import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Header Section with gradient background */}
      <div style={{
        ...styles.headerWrapper,
        background: scrolled 
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 100%)"
      }}>
        
        {/* Animated background elements */}
        <div style={styles.backgroundElements}>
          <div style={{...styles.floatingElement, ...styles.element1}}></div>
          <div style={{...styles.floatingElement, ...styles.element2}}></div>
          <div style={{...styles.floatingElement, ...styles.element3}}></div>
        </div>

        {/* Navbar */}
        {!(isMobile && menuOpen) && (
          <nav style={{
            ...(isMobile ? styles.mobnav : styles.nav),
            transform: scrolled ? "scale(0.98)" : "scale(1)",
            boxShadow: scrolled 
              ? "0 10px 40px rgba(0,0,0,0.3)" 
              : "0 20px 60px rgba(0,0,0,0.15)"
          }}>
            <div style={styles.brand}>
              <div style={styles.logoContainer}>
                <img src="/logo.png" alt="Quizzards Logo" style={styles.logoImage} />
              </div>
            </div>

            
            {isMobile && (
              <div style={styles.hamburger} onClick={() => setMenuOpen(true)}>
                <div style={styles.hamburgerLine}></div>
                <div style={styles.hamburgerLine}></div>
                <div style={styles.hamburgerLine}></div>
              </div>
            )}
            
            {!isMobile && (
              <div style={styles.links}>
                {links.map((item, i) => (
                  <a key={i} href={item.to} className="nav-link" style={styles.navLink}>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            )}
          </nav>
        )}

        {/* Hero section */}
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              <span style={styles.quizzardsText}>QUIZZARDS</span>
              <span style={styles.subtitle}>The Quiz Club of REC</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {menuOpen && (
            <div 
              style={styles.backdrop} 
              onClick={() => setMenuOpen(false)}
            ></div>
          )}
          
          <div style={{
            ...styles.sidebar,
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            opacity: menuOpen ? 1 : 0,
          }}>
            <div style={styles.sidebarHeader}>
              <div style={styles.sidebarLogo}>
                <span style={styles.sidebarLogoIcon}>🧠</span>
                <span>Quizzards</span>
              </div>
              <button style={styles.closeBtn} onClick={() => setMenuOpen(false)}>
                ×
              </button>
            </div>
            
            <div style={styles.sidebarContent}>
              {links.map((item, i) => (
                <a
                  key={i}
                  href={item.to}
                  className="sidebar-link"
                  style={styles.sidebarLink}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          * {
            font-family: 'Inter', sans-serif;
          }

          .nav-link {
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            position: relative;
            overflow: hidden;
          }

          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
          }

          .nav-link:hover::before {
            left: 100%;
          }

          .nav-link:hover {
            transform: translateY(-3px);
            color: #ffd700 !important;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
          }

          .sidebar-link {
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .sidebar-link:hover {
            transform: translateX(15px) scale(1.05);
            color: #ffd700 !important;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 12px 16px !important;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .floating-element {
            animation: float 6s ease-in-out infinite;
          }

          .floating-element:nth-child(2) {
            animation-delay: -2s;
            animation-duration: 8s;
          }

          .floating-element:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 10s;
          }

          @media (max-width: 768px) {
            .hero-stats {
              flex-direction: column;
              gap: 15px;
            }
          }
        `}
      </style>
    </>
  );
}

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
];

const styles = {
  headerWrapper: {
    position: "relative",
    minHeight: "75vh",
    padding: "0",
    margin: "0",
    overflow: "hidden",
    transition: "all 0.6s ease",
  },
  backgroundElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    overflow: "hidden",
  },
  floatingElement: {
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  },
  element1: {
    width: "100px",
    height: "100px",
    top: "20%",
    left: "10%",
    animationDelay: "0s",
  },
  element2: {
    width: "150px",
    height: "150px",
    top: "60%",
    right: "15%",
    animationDelay: "-2s",
  },
  element3: {
    width: "80px",
    height: "80px",
    bottom: "20%",
    left: "20%",
    animationDelay: "-4s",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "30px auto",
    padding: "15px 40px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(20px)",
    borderRadius: "50px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.4s ease",
    position: "relative",
    zIndex: 10,
  },
  mobnav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 25px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(20px)",
    margin: "20px",
    borderRadius: "25px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    position: "relative",
    zIndex: 10,
  },
  brand: {
    display: "flex",
    alignItems: "center",
  },
logoContainer: {
  width: "50px",          // adjust size as needed
  height: "50px",
  borderRadius: "50%",    // makes it a perfect circle
  overflow: "hidden",     // crop anything outside the circle
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.9)", // optional background
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
},

logoImage: {
  width: "100%",
  height: "100%",
  objectFit: "cover", // ensures the image fills the circle
},
  logoText: {
    fontSize: "20px",
    fontWeight: "700",
    background: "linear-gradient(45deg, #6a0dad, #9d4edd)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  hamburger: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    cursor: "pointer",
    padding: "10px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },
  hamburgerLine: {
    width: "25px",
    height: "3px",
    backgroundColor: "white",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    fontSize: "16px",
    padding: "10px 18px",
    borderRadius: "25px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "45vh",
    textAlign: "center",
    position: "relative",
    zIndex: 5,
    padding: "40px 20px",
  },
  heroContent: {
    maxWidth: "900px",
    padding: "0 20px",
    animation: "slideInUp 1s ease-out",
  },
  heroTitle: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  quizzardsText: {
    fontSize: "clamp(3rem, 8vw, 6rem)",
    fontWeight: "900",
    color: "white",
    textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    letterSpacing: "0.05em",
  },
  subtitle: {
    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
    fontWeight: "700",
    color: "white",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  },
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    zIndex: 998,
  },
  sidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: "300px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "-10px 0 30px rgba(0,0,0,0.3)",
    zIndex: 999,
    transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
  },
  sidebarLogoIcon: {
    fontSize: "24px",
  },
  closeBtn: {
    fontSize: "30px",
    background: "rgba(255, 255, 255, 0.2)",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarContent: {
    flex: 1,
    padding: "30px 25px",
  },
  sidebarLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    margin: "15px 0",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "12px",
  },
};