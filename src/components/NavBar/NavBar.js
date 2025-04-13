import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={styles.navBar}>
        <Link to="/" className={styles.logoContainer}>
          <img 
            src={require('../../assets/images/logoc1.png')} 
            alt="Global Pickups Logo" 
            className={styles.logo} 
          />
          <span className={styles.brandName}>Global Pickups</span>
        </Link>

        <div className={styles.navLinks}>
          <Link to="/about" className={styles.navLink}>About</Link>
          <Link to="/services" className={styles.navLink}>Services</Link>
          <Link to="/pricing" className={styles.navLink}>Pricing</Link>
          <Link to="/faq" className={styles.navLink}>FAQ</Link>
          <Link to="/privacy" className={styles.navLink}>Privacy</Link>
          <Link to="/login" className={styles.loginButton}>Login</Link>
          <Link to="/signup" className={styles.signupButton}>Sign Up</Link>
        </div>

        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>

        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuActive : ''}`}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/about" className={styles.navLink}>About</Link>
          <Link to="/services" className={styles.navLink}>Services</Link>
          <Link to="/pricing" className={styles.navLink}>Pricing</Link>
          <Link to="/faq" className={styles.navLink}>FAQ</Link>
          <Link to="/privacy" className={styles.navLink}>Privacy</Link>
          <Link to="/login" className={styles.loginButton}>Login</Link>
          <Link to="/signup" className={styles.signupButton}>Sign Up</Link>
        </div>
      </nav>
      <div className={styles.spacer}></div>
    </>
  );
};

export default NavBar;