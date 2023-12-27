import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByNameOrId } from '../../redux/actions/pokemonActions';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Determinar si el término de búsqueda es un número (ID) o una cadena de texto (nombre)
      const searchType = isNaN(searchTerm) ? "name" : "id";
      dispatch(getPokemonByNameOrId(searchTerm, searchType));
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Buscar Pokémon por nombre o ID"
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
