import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDog } from '../../redux/actions/actions';
import styles from './FormPage.module.css';

const FormPage = () => {
  const dispatch = useDispatch();
  const initialFormState = {
    name: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
    life_span: '',
    image: '',
    temperaments: [],
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [tempInput, setTempInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case 'name':
        errors.name = value.trim() ? '' : 'Name is required.';
        break;
      case 'heightMin':
      case 'heightMax':
        const minHeight = formData.heightMin || value;
        const maxHeight = formData.heightMax || value;
        errors.height = (minHeight < maxHeight) ? '' : 'Invalid height range.';
        break;
      case 'weightMin':
      case 'weightMax':
        const minWeight = formData.weightMin || value;
        const maxWeight = formData.weightMax || value;
        errors.weight = (minWeight < maxWeight) ? '' : 'Invalid weight range.';
        break;
      case 'life_span':
        errors.life_span = value ? '' : 'Life span is required.';
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
      height: `${formData.heightMin} - ${formData.heightMax}`,
      weight: `${formData.weightMin} - ${formData.weightMax}`,
      life_span: `${formData.life_span} years`,
      image: formData.image,
      temperaments: formData.temperaments.join(", "),
    };
    try {
      const response = await dispatch(createDog(dogData));
      if (response.type.includes('SUCCESS')) {
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
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {formErrors.name && <div className={styles.error}>{formErrors.name}</div>}

         {/* Height fields */}
         <label htmlFor="heightMin">Minimum Height</label>
        <input
          type="number"
          id="heightMin"
          name="heightMin"
          value={formData.heightMin}
          onChange={handleInputChange}
        />
        {formErrors.height && <div className={styles.error}>{formErrors.height}</div>}

            {/* Weight fields */}
            <label htmlFor="weightMin">Minimum Weight</label>
            <input
              type="number"
              id="weightMin"
              name="weightMin"
              value={formData.weightMin}
              onChange={handleInputChange}
            />
            {formErrors.weight && <div className={styles.error}>{formErrors.weight}</div>}

            <label htmlFor="weightMax">Maximum Weight</label>
            <input
              type="number"
              id="weightMax"
              name="weightMax"
              value={formData.weightMax}
              onChange={handleInputChange}
            />

            {/* Life span field */}
            <label htmlFor="life_span">Life Span (years)</label>
            <input
              type="number"
              id="life_span"
              name="life_span"
              value={formData.life_span}
              onChange={handleInputChange}
            />
            {formErrors.life_span && <div className={styles.error}>{formErrors.life_span}</div>}

            {/* Image URL field */}
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
            {formData.image && (
              <img src={formData.image} alt="Dog preview" className={styles.imagePreview} />
            )}

            {/* Temperaments field */}
            <label htmlFor="temperament">Temperament</label>
            <input
              type="text"
              id="temperament"
              name="temperament"
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
            />
            <button type="button" onClick={handleAddTemperament}>Add Temperament</button>
            <div className={styles.temperamentTags}>
              {formData.temperaments.map((temp, index) => (
                <span key={index} className={styles.temperamentTag}>{temp}</span>
              ))}
            </div>


        <button type="submit">Create Dog</button>
        <button type="button" onClick={() => setFormData(initialFormState)}>Cancel</button>
      </form>
    </div>
  );
};

export default FormPage;
