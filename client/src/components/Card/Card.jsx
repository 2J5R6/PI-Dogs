import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ dog }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <img src={dog.image} alt={dog.name} className={styles.dogImage} />
          <h2 className={styles.dogName}>{dog.name.toUpperCase()}</h2>
          <div className={styles.temperaments}>
            {dog.temperaments && dog.temperaments.map((temp, index) => (
              <span key={index} className={styles.temperament}>{typeof temp === 'string' ? temp.toUpperCase() : ''}</span>
            ))}
          </div>
          <div className={styles.weightRange}>
            <span className={styles.weight}>WEIGHT: {dog.weight}</span>
          </div>
        </div>
        <div className={styles.cardBack}>
          <h2 className={styles.dogName}>{dog.name.toUpperCase()}</h2>
          <div className={styles.dogDetails}>
            <p>TEMPERAMENTS:</p>
            <ul>
              {dog.temperaments && dog.temperaments.map((temp, index) => (
                <li key={index} className={styles.temperament}>{typeof temp === 'string' ? temp.toUpperCase() : ''}</li>
              ))}
            </ul>
            <p>WEIGHT: {dog.weight}</p>
          </div>
          <Link to={`/dog/${dog.id}`} className={styles.detailsButton}>DETAILS</Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
