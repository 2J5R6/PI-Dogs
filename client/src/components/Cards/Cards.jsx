import React from 'react';
import Card from '../Card/Card.jsx';
import styles from './Cards.module.css';

const Cards = ({ dogs }) => {
  if (dogs.length === 0) {
    return <p className={styles.noResultsMessage}>No dogs to display. Please adjust your filters.</p>;
  }
  return (
    <div className={styles.cardsContainer}>
      {dogs.map((dog, index) => (
        <Card key={dog.id ? dog.id : index} dog={dog} />
      ))}
    </div>
  );
};

export default Cards;
