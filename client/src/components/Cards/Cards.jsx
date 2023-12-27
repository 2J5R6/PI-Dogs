import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from '../../redux/actions/pokemonActions';
import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = ({ pokemon }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pokemon) {
      dispatch(fetchPokemons());
    }
  }, [dispatch, pokemon]);
  console.log("Pokemons en Cards:", pokemon);
  if (!pokemon) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  return (
    <div className={styles.cardsContainer}>
      <Card pokemon={pokemon} />
    </div>
  );
};

export default Cards;
