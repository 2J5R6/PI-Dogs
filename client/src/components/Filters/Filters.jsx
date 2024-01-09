import React, { useState, useEffect } from 'react';
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
    const selectedOptions = Array.from(e.target.options)
                                 .filter(option => option.selected)
                                 .map(option => option.value);
    setSelectedTemperaments(selectedOptions);
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
    setSelectedTemperaments([]); // Cambiar a un array vacío
    setSelectedOrigin('');
    setSortOrder('');
    setLifeSpanRange('');
    dispatch(resetFiltersAndSort());
  };
  

  const removeTemperament = (tempToRemove) => {
    // Filtra el temperamento que se quiere eliminar
    const updatedTemperaments = selectedTemperaments.filter(temp => temp !== tempToRemove);
    setSelectedTemperaments(updatedTemperaments);
    // No olvides actualizar el store de Redux si es necesario
    dispatch(filterByTemperament(updatedTemperaments));
  };
  


  return (
    <div className={styles.filtersContainer}>
      {/* ...otros filtros... */}
      {/* Temperament Filter */}
      <div className={styles.filterItem}>
        <label htmlFor="temperament-select">Temperament:</label>
        <select
          multiple={true}
          value={selectedTemperaments}
          onChange={handleTemperamentChange}
          className={styles.filterSelect}
          id="temperament-select"
        >
          {temperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>{temp.name}</option>
          ))}
        </select>
        {/* Etiquetas de temperamentos seleccionados */}
        <div className={styles.selectedTemperaments}>
          {selectedTemperaments.map((temp, index) => (
            <span key={index} className={styles.temperamentTag}>
              {temp}
              <button
                onClick={() => removeTemperament(temp)}
                className={styles.removeTagButton}
              >
                &times;
              </button>
            </span>
          ))}
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
