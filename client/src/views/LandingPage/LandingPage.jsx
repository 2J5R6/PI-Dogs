import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.title}>Created by Julian Rosas</h1>
      <Link to="/home" className={styles.exploreButton}>Explorar Pokémons</Link>
    </div>
  );
};

export default LandingPage;
