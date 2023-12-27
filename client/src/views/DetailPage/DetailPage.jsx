import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './DetailPage.module.css';

function DetailPage() {
  const { id } = useParams();
  const pokemon = useSelector(state => state.pokemons.pokemons.find(p => p.id === parseInt(id)));
  if (!pokemon) return <div>Loading...</div>;

  return (
  <>
    <NavBar />
  
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
        <h1 className={styles.name}>{pokemon.name.toUpperCase()}</h1>
        <p><strong>ID:</strong> {pokemon.id}</p>
        <div className={styles.stat}>
          <strong>Vida:</strong>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{width: `${pokemon.hp}%`}}>{pokemon.hp}</div>
          </div>
        </div>
        <div className={styles.stat}>
          <strong>Ataque:</strong>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{width: `${pokemon.attack}%`}}>{pokemon.attack}</div>
          </div>
        </div>
        <div className={styles.stat}>
          <strong>Defensa:</strong>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{width: `${pokemon.defense}%`}}>{pokemon.defense}</div>
          </div>
        </div>
        <div className={styles.stat}>
          <strong>Velocidad:</strong>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{width: `${pokemon.speed}%`}}>{pokemon.speed}</div>
          </div>
        </div>
        <div className={styles.stat}>
          <strong>Altura:</strong> {pokemon.height}
        </div>
        <div className={styles.stat}>
          <strong>Peso:</strong> {pokemon.weight}
        </div>
        <div>
          <strong>Tipo:</strong> 
          {pokemon.types && pokemon.types.map(type => (
              <div key={type.id} className={styles.type}>
                  {type.name.toUpperCase()}
              </div>
            ))}
        </div>
      </div>
    </div>
</>
  );
}
export default DetailPage;
