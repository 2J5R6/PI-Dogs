import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs } from '../../redux/actions/actions';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';
import Filters from '../../components/Filters/Filters';
import Pagination from '../../components/Pagination/Pagination';
import styles from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { dogs, filteredDogs, loading, error } = useSelector((state) => state.dogs);
  const dogsToDisplay = filteredDogs.length > 0 ? filteredDogs : dogs;
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  // Obtener los perros actuales basados en filtrado o no
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogsToDisplay.slice(indexOfFirstDog, indexOfLastDog);

  // Cambia la página actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.homePageContainer}>
      <SearchBar />
      <Filters />
      <div className={styles.contentArea}>
        <div className={styles.cardsContainer}>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && <Cards dogs={currentDogs} />}
        </div>
        <Pagination
          dogsPerPage={dogsPerPage}
          totalDogs={dogsToDisplay.length} // Asegúrate de usar dogsToDisplay para el total
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
