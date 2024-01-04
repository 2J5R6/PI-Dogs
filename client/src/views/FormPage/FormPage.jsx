import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDog } from '../../redux/actions/actions';
import { CREATE_DOG_SUCCESS } from '../../redux/actions/actionTypes';
import styles from './FormPage.module.css';

const FormPage = () => {
  const dispatch = useDispatch();
  const initialFormState = {
    name: '',
    heightMin: 10,
    heightMax: 20,
    weightMin: 5,
    weightMax: 10,
    life_span: 10,
    image: '',
    description: 'A cutty',
    temperaments: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [tempInput, setTempInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };
    
    // Ajustar el rango mínimo y máximo para los sliders de altura y peso
    if (name === "heightMin" && parseInt(value) >= parseInt(formData.heightMax)) {
      newFormData.heightMax = parseInt(value) + 1;
    }
    if (name === "heightMax" && parseInt(value) <= parseInt(formData.heightMin)) {
      newFormData.heightMin = parseInt(value) - 1;
    }
    if (name === "weightMin" && parseInt(value) >= parseInt(formData.weightMax)) {
      newFormData.weightMax = parseInt(value) + 1;
    }
    if (name === "weightMax" && parseInt(value) <= parseInt(formData.weightMin)) {
      newFormData.weightMin = parseInt(value) - 1;
    }
    
    setFormData(newFormData);
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };
    const isNumber = /^\d+$/; // RegEx para verificar si el valor es numérico
    switch (name) {
      case 'name':
        errors.name = value.trim() && !isNumber.test(value) ? '' : 'Name is required.';
        break;
      case 'heightMin':
      case 'heightMax':
        errors.height = (formData.heightMin < formData.heightMax) ? '' : 'Invalid height range.';
        break;
      case 'weightMin':
      case 'weightMax':
        errors.weight = (formData.weightMin < formData.weightMax) ? '' : 'Invalid weight range.';
        break;
      case 'life_span':
        errors.life_span = value ? '' : 'Life span is required.';
        break;
      case 'temperament':
        errors.temperament = value.trim() && !isNumber.test(value) ? '' : 'Temperament must be text.';
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const handleAddTemperament = () => {
    if (tempInput && !formData.temperaments.includes(tempInput)) {
      setFormData({ ...formData, temperaments: [...formData.temperaments, tempInput] });
      setTempInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formErrors).some(error => error)) {
      alert('Please correct the errors in the form.');
      return;
    }
  
    const dogData = {
      name: formData.name,
      height: { metric: `${formData.heightMin} - ${formData.heightMax}` },
      weight: { metric: `${formData.weightMin} - ${formData.weightMax}` },
      life_span: `${formData.life_span} years`,
      image: formData.image ,
      description: formData.description,
      temperaments: formData.temperaments
    };
  
    try {
      const actionResult = await dispatch(createDog(dogData));
      console.log('Dispatch action result:', actionResult);
      if (actionResult.type === CREATE_DOG_SUCCESS) {
        alert("Dog created successfully!");
        setFormData(initialFormState);
      } else {
        alert("Failed to create dog. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        {/* Fields are now added without comments */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={formErrors.name ? styles.inputError : ''}
        />
        {formErrors.name && <div className={styles.error}>{formErrors.name}</div>}

        {/* Height and Weight fields with sliders */}
        {/* ... */}
        <div className={styles.rangeField}>
          <label htmlFor="heightMin">Minimum Height (cm): {formData.heightMin}</label>
          <input
            type="range"
            id="heightMin"
            name="heightMin"
            min="10"
            max={formData.heightMax}
            value={formData.heightMin}
            onChange={handleInputChange}
            className={styles.slider}
          />
        </div>

        <div className={styles.rangeField}>
          <label htmlFor="heightMax">Maximum Height (cm): {formData.heightMax}</label>
          <input
            type="range"
            id="heightMax"
            name="heightMax"
            min={formData.heightMin}
            max="90"
            value={formData.heightMax}
            onChange={handleInputChange}
            className={styles.slider}
          />
        </div>

        {/*Weight fields */}
        {/* ... */}
        <div className={styles.rangeField}>
          <label htmlFor="weightMin">Minimum Weight (kg): {formData.weightMin}</label>
          <input
            type="range"
            id="weightMin"
            name="weightMin"
            min="1"
            max={formData.weightMax}
            value={formData.weightMin}
            onChange={handleInputChange}
            className={styles.slider}
          />
        </div>

<div className={styles.rangeField}>
  <label htmlFor="weightMax">Maximum Weight (kg): {formData.weightMax}</label>
  <input
    type="range"
    id="weightMax"
    name="weightMax"
    min={formData.weightMin}
    max="90"
    value={formData.weightMax}
    onChange={handleInputChange}
    className={styles.slider}
  />
</div>

        {/* Life Span field */}
        {/* ... */}
        <div className={styles.rangeField}>
          <label htmlFor="life_span">Life Span (years): {formData.life_span}</label>
          <input
            type="range"
            id="life_span"
            name="life_span"
            min="1"
            max="20"
            value={formData.life_span}
            onChange={handleInputChange}
            className={styles.slider}
          />
        </div>

        {/* Image URL field */}
        {/* ... */}
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className={formErrors.image ? styles.inputError : ''}
        />
        {formData.image && (
          <img src={formData.image} alt="Dog preview" className={styles.imagePreview} />
        )}

        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className={formErrors.description ? styles.inputError : ''}
        />
        {formErrors.description && <div className={styles.error}>{formErrors.description}</div>}

        {/* Temperaments field */}
        {/* ... */}
        <label htmlFor="temperament">Temperament</label>
        <input
          type="text"
          id="temperament"
          name="temperament"
          value={tempInput}
          onChange={(e) => {
            setTempInput(e.target.value);
            validateField(e.target.name, e.target.value);
          }}
          className={formErrors.temperament ? styles.inputError : ''}
        />
        {formErrors.temperament && <div className={styles.error}>{formErrors.temperament}</div>}
        <button type="button" onClick={handleAddTemperament} className={styles.addButton}>Add Temperament</button>
        <div className={styles.temperamentTags}>
          {formData.temperaments.map((temp, index) => (
            <span key={index} className={styles.temperamentTag}>{temp}</span>
          ))}
        </div>

        <button type="submit" className={styles.createButton}>Create Dog</button>
        <button type="button" onClick={() => setFormData(initialFormState)} className={styles.cancelButton}>Cancel</button>
      </form>
    </div>
  );
};

export default FormPage;
