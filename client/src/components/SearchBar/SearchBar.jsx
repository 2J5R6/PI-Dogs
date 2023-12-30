import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogByName, getDogDetailById } from '../../redux/actions/actions'; 
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isNaN(searchTerm)) {
      dispatch(getDogDetailById(searchTerm));
    } else {
      dispatch(getDogByName(searchTerm));
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <input
        type="text"
        placeholder="Search for a dog by name or ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
  );
};

export default SearchBar;