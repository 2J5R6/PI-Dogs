import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterByTemperament,
  filterByOrigin,
  sortByWeight,
  sortDogsAlphabetically,
  // filterByLifeSpan,
  resetFiltersAndSort,
  applyFilters
} from '../../redux/actions/actions';
import styles from './Filters.module.css'; 

const Filters = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.dogs.temperaments);

  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  // const [lifeSpanRange, setLifeSpanRange] = useState('');

  const handleApplyFilters = () => {
    dispatch(applyFilters());
  };

  const handleTemperamentChange = (temperament) => {
    const currentIndex = selectedTemperaments.indexOf(temperament);
    const newSelectedTemperaments = [...selectedTemperaments];

    if (currentIndex === -1) {
      newSelectedTemperaments.push(temperament);
    } else {
      newSelectedTemperaments.splice(currentIndex, 1);
    }

    setSelectedTemperaments(newSelectedTemperaments);
    dispatch(filterByTemperament(newSelectedTemperaments));
  };

  useEffect(() => {
    dispatch(filterByTemperament(selectedTemperaments));
  }, [selectedTemperaments, dispatch]);

  const handleOriginChange = (e) => {
    setSelectedOrigin(e.target.value);
    dispatch(filterByOrigin(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    if (e.target.value.includes('name')) {
      dispatch(sortDogsAlphabetically(e.target.value.includes('asc') ? 'name_asc' : 'name_desc'));
    } else if (e.target.value.includes('weight')) {
      dispatch(sortByWeight(e.target.value.includes('asc') ? 'weight_asc' : 'weight_desc'));
    }
  };

  // const handleLifeSpanChange = (e) => {
  //   setLifeSpanRange(e.target.value);
  //   dispatch(filterByLifeSpan(e.target.value));
  // };


  const resetFilters = () => {
    setSelectedTemperaments([]); // Cambiar a un array vacío
    setSelectedOrigin('');
    setSortOrder('');
    // setLifeSpanRange('');
    dispatch(resetFiltersAndSort());
  };
  


  return (
    <div className={styles.filtersContainer}>
       {/* Temperament Filter */}
       <div className={styles.filterItem}>
        <label htmlFor="temperament-select">Temperament:</label>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>Select Temperaments</button>
          <div className={styles.dropdownContent}>
            {temperaments.map((temp) => (
              <a 
                key={temp.id}
                href="#!"
                onClick={() => handleTemperamentChange(temp.name)}
                className={selectedTemperaments.includes(temp.name) ? styles.selected : ''}
              >
                {temp.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Origin Filter */}
      <div className={styles.filterItem}>
        <label>Origin:</label>
        <select value={selectedOrigin} onChange={handleOriginChange} className={styles.filterSelect}>
          <option value="">All Origins</option>
          <option value="api">API</option>
          <option value="db">Database</option>
        </select>
      </div>

      {/* Life Span Filter
      <div className={styles.filterItem}>
        <label>Life Span:</label>
        <input
          type="text"
          value={lifeSpanRange}
          onChange={handleLifeSpanChange}
          placeholder="e.g., 10-12"
          className={styles.filterInput}
        />
      </div> */}

      {/* Sorting Options */}
      <div className={styles.filterItem}>
        <label>Sort By:</label>
        <select value={sortOrder} onChange={handleSortChange} className={styles.filterSelect}>
          <option value="">Default</option>
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
          <option value="weight_asc">Weight (Ascending)</option>
          <option value="weight_desc">Weight (Descending)</option>
        </select>
      </div>

      {/* Reset Filters Button */}
      <button onClick={resetFilters}>Reset Filters</button>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
