import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetailById } from '../../redux/actions/actions'; // Asegúrate de que esta acción esté definida en tus actions de Redux
import { useParams } from 'react-router-dom';
import styles from './DetailPage.module.css';

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dog = useSelector((state) => state.dogs.currentDog);
  const loading = useSelector((state) => state.dogs.loading);
  const error = useSelector((state) => state.dogs.error);

  useEffect(() => {
    dispatch(getDogDetailById(id));
  }, [dispatch, id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.title}>{dog.name}</h1>
      <img src={dog.image} alt={dog.name} className={styles.dogImage} />
      <div className={styles.info}>
        <p>ID: {dog.id}</p>
        <p>Height: {dog.height} cm</p>
        <p>Weight: {dog.weight} kg</p>
        <p>Life Span: {dog.life_span}</p>
        <div className={styles.temperaments}>
          {dog.temperaments.map((temp) => (
            <span key={temp} className={styles.temperament}>{temp}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;