import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDog } from '../../redux/actions/actions'; // Asegúrate de que esta acción esté definida en tus actions de Redux
import styles from './FormPage.module.css';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
    life_span: '',
    image: '',
    temperaments: [],
  });
  const [tempInput, setTempInput] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTempInputChange = (e) => {
    setTempInput(e.target.value);
  };

  const handleAddTemperament = () => {
    if (tempInput && !formData.temperaments.includes(tempInput)) {
      setFormData({ ...formData, temperaments: [...formData.temperaments, tempInput] });
      setTempInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data before dispatching
    if (!formData.name || /\d/.test(formData.name)) {
      return alert('Please enter a valid breed name without numbers.');
    }
    if (parseInt(formData.heightMin) >= parseInt(formData.heightMax)) {
      return alert('Minimum height should be less than maximum height.');
    }
    if (parseInt(formData.weightMin) >= parseInt(formData.weightMax)) {
      return alert('Minimum weight should be less than maximum weight.');
    }
    // Construct the dog object
    const newDog = {
      name: formData.name,
      height: { metric: `${formData.heightMin} - ${formData.heightMax}` },
      weight: { metric: `${formData.weightMin} - ${formData.weightMax}` },
      life_span: formData.life_span,
      image: { url: formData.image },
      temperaments: formData.temperaments,
    };
    dispatch(createDog(newDog));
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.paw}></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="heightMin">Minimum Height</label>
        <input
          type="number"
          id="heightMin"
          name="heightMin"
          value={formData.heightMin}
          onChange={handleInputChange}
        />

        <label htmlFor="heightMax">Maximum Height</label>
        <input
          type="number"
          id="heightMax"
          name="heightMax"
          value={formData.heightMax}
          onChange={handleInputChange}
        />

        <label htmlFor="weightMin">Minimum Weight</label>
        <input
          type="number"
          id="weightMin"
          name="weightMin"
          value={formData.weightMin}
          onChange={handleInputChange}
        />

        <label htmlFor="weightMax">Maximum Weight</label>
        <input
          type="number"
          id="weightMax"
          name="weightMax"
          value={formData.weightMax}
          onChange={handleInputChange}
        />

        <label htmlFor="life_span">Life Span</label>
        <input
          type="text"
          id="life_span"
          name="life_span"
          value={formData.life_span}
          onChange={handleInputChange}
        />

        <div className={styles.temperamentSection}>
          <label htmlFor="temperament">Temperament</label>
          <input
            type="text"
            id="temperament"
            value={tempInput}
            onChange={handleTempInputChange}
          />
          <button type="button" onClick={handleAddTemperament}>
            Add Temperament
          </button>
        </div>

        <div className={styles.addedTemperaments}>
          {formData.temperaments.map((temp, index) => (
            <div key={index} className={styles.temperamentTag}>
              {temp}
            </div>
          ))}
        </div>

        <button type="submit" className={styles.createButton}>
          Create Dog
        </button>
      </form>
    </div>
  );
};

export default FormPage;