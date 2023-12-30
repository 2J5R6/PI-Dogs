import React from 'react';
import Card from '../Card/Card.jsx';
import styles from './Cards.module.css';

const Cards = ({ dogs }) => {
  return (
    <div className={styles.cardsContainer}>
      {dogs.map((dog) => (
        <Card key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default Cards;
