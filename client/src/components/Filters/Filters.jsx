import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterByTemperament,
  filterByOrigin,
  sortByWeight,
  sortDogsAlphabetically,
  filterByLifeSpan,
  resetFiltersAndSort,
  applyFilters
} from '../../redux/actions/actions';
import styles from './Filters.module.css'; 

const Filters = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.dogs.temperaments);

   // Cambia esto para manejar un array de temperamentos seleccionados
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [lifeSpanRange, setLifeSpanRange] = useState('');

  const handleApplyFilters = () => {
    dispatch(applyFilters());
  };

  const handleTemperamentChange = (e) => {
    // Actualiza esto para manejar un array de temperamentos seleccionados
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTemperaments(selectedOptions);
    dispatch(filterByTemperament(selectedOptions));
  };

  const handleOriginChange = (e) => {
    setSelectedOrigin(e.target.value);
    dispatch(filterByOrigin(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    if (e.target.value.includes('name')) {
      dispatch(sortDogsAlphabetically(e.target.value.includes('asc') ? 'asc' : 'desc'));
    } else if (e.target.value.includes('weight')) {
      dispatch(sortByWeight(e.target.value.includes('asc') ? 'asc' : 'desc'));
    }
  };

  const handleLifeSpanChange = (e) => {
    setLifeSpanRange(e.target.value);
    dispatch(filterByLifeSpan(e.target.value));
  };


  const resetFilters = () => {
    setSelectedTemperaments('');
    setSelectedOrigin('');
    setSortOrder('');
    setLifeSpanRange('');
    dispatch(resetFiltersAndSort());
  };

  return (
    <div className={styles.filtersContainer}>
      {/* Temperament Filter */}
      <div className={styles.filterItem}>
        <label>Temperament:</label>
        <select multiple={true} value={selectedTemperaments} onChange={handleTemperamentChange} className={styles.filterSelect}>
          <option value="">All Temperaments</option>
          {temperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>{temp.name}</option>
          ))}
        </select>
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

      {/* Life Span Filter */}
      <div className={styles.filterItem}>
        <label>Life Span:</label>
        <input
          type="text"
          value={lifeSpanRange}
          onChange={handleLifeSpanChange}
          placeholder="e.g., 10-12"
          className={styles.filterInput}
        />
      </div>

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
