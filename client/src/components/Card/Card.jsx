import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../../redux/actions/pokemonActions';
import styles from './Card.module.css';

const Card = ({ pokemon }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.pokemons.favorites);

  const isFavorite = favorites.some(fav => fav.id === pokemon.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(pokemon));
    } else {
      dispatch(addToFavorites(pokemon));
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.heartIcon} onClick={handleFavoriteClick}>
        {isFavorite ? (
          <i className={`fas fa-heart ${styles.favorite}`}>❤️</i>
        ) : (
          <i className="far fa-heart">🤍</i>
        )}
      </div>
      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemon.image} alt={pokemon.name} className={styles.pokemonImage} />
        <div className={styles.pokemonDetails}>
          <h2 className={styles.pokemonName}>{pokemon.name.toUpperCase()}</h2>
          {pokemon.types && pokemon.types.map(type => (
            <span key={type.id} className={styles.pokemonType}>
              {type.name.toUpperCase()}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Card;
