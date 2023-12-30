// LandingPage.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTemperaments, getAllDogs } from './../../redux/actions/actions'; // Asegúrate de que estas acciones estén definidas
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.title}>Created by Julian Rosas</h1>
      <Link to="/home" className={styles.exploreButton}>Explore Dogs</Link>
    </div>
  );
};

export default LandingPage;
