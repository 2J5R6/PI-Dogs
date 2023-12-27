// Filters.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDataSource,
  sortByIdAsc,
  sortByIdDesc,
  sortByNameAsc,
  sortByNameDesc,
  filterPokemonsByType
} from '../../redux/actions/pokemonActions';
import styles from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch();
  const dataSource = useSelector(state => state.pokemons.dataSource);
  // const searchedPokemons = useSelector(state => state.pokemons.searchedPokemons);

  const handleDataSourceChange = (e) => {
    dispatch(setDataSource(e.target.value));
  };

  const handleSortChange = (e) => {
    switch (e.target.value) {
      case 'id-asc':
        dispatch(sortByIdAsc());
        break;
      case 'id-desc':
        dispatch(sortByIdDesc());
        break;
      case 'name-asc':
        dispatch(sortByNameAsc());
        break;
      case 'name-desc':
        dispatch(sortByNameDesc());
        break;
      default:
        break;
    }
  };

  const handleTypeFilter = (e) => {
    const selectedType = e.target.value;
    dispatch(filterPokemonsByType(selectedType));
};


  return (
    <div className={styles.filtersContainer}>
      <div className={styles.dataSourceContainer}>
        <label>Data Source:</label>
        <select value={dataSource} onChange={handleDataSourceChange}>
          <option value="db">Database</option>
          <option value="api">API</option>
        </select>
      </div>
      <div className={styles.sortContainer}>
        <label>Sort By:</label>
        <select onChange={handleSortChange}>
          <option value="id-asc">ID Ascending</option>
          <option value="id-desc">ID Descending</option>
          <option value="name-asc">Name Ascending</option>
          <option value="name-desc">Name Descending</option>
        </select>
      </div>
      <div className={styles.typeFilterContainer}>
        <label>Filter by Type:</label>
        <select onChange={handleTypeFilter}>
          <option value="">All</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dark">Dark</option>
          <option value="dragon">Dragon</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
