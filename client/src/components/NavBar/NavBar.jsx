import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <NavLink to="/" className={styles.active}>Landing</NavLink>
      <NavLink to="/home" className={styles.active}>Home</NavLink>
      <NavLink to="/create" className={styles.active}>Create Dog</NavLink>
    </nav>
  );
};

export default NavBar;