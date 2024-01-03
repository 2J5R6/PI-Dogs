import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetailById } from '../../redux/actions/actions'; 
import { useParams } from 'react-router-dom';
import styles from './DetailPage.module.css';

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentDog, loading, error } = useSelector(state => state.dogs);
  useEffect(() => {
    dispatch(getDogDetailById(id));
  }, [dispatch, id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!currentDog) return <div>No se encontró el perro.</div>;

  const { name, image, height, weight, life_span, temperaments, description = 'A good friend' } = currentDog;

  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.title}>{name}</h1>
      <img src={image} alt={name} className={styles.dogImage} />
      <div className={styles.info}>
        <p>ID: {id}</p>
        <p>Height: {height} cm</p>
        <p>Weight: {weight} kg</p>
        <p>Life Span: {life_span}</p>
        <p className={styles.description}>{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
      {description.length > 100 && (
        <button className={styles.moreButton} onClick={() => alert(description)}>More</button>
      )}
        {temperaments && (
          <div className={styles.temperaments}>
            {temperaments.map((temp, index) => (
              <span key={index} className={styles.temperament}>{temp}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;