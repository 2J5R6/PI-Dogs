import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import styles from './Favorites.module.css';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites);

  return (
    <div className={styles.favoritesContainer}>
      <h1 className={styles.title}>Mis Pokémon Favoritos</h1>
      <div className={styles.cardsContainer}>
        {favorites && favorites.length > 0 ? (
          favorites.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />)
        ) : (
          <p>No tienes ningún Pokémon en tus favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
