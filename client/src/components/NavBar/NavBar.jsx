// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles.navBarContainer}>
      <Link to="/Home" className={styles.navLink}>Home</Link>
      <Link to="/favorites" className={styles.navLink}>Favorites</Link>
      <Link to="/create" className={styles.navLink}>Create</Link>
    </div>
  );
};

export default NavBar;
