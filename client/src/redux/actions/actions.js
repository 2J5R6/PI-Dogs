import axios from 'axios';
import {
  GET_ALL_DOGS_REQUEST,
  GET_ALL_DOGS_SUCCESS,
  GET_ALL_DOGS_FAILURE,
  GET_DOG_DETAIL_REQUEST,
  GET_DOG_DETAIL_SUCCESS,
  GET_DOG_DETAIL_FAILURE,
  GET_DOG_BY_NAME_REQUEST,
  GET_DOG_BY_NAME_SUCCESS,
  GET_DOG_BY_NAME_FAILURE,
  GET_DOG_BY_ID_REQUEST,
  GET_DOG_BY_ID_SUCCESS,
  GET_DOG_BY_ID_FAILURE,
  CREATE_DOG_REQUEST,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAILURE,
  GET_TEMPERAMENTS_REQUEST,
  GET_TEMPERAMENTS_SUCCESS,
  GET_TEMPERAMENTS_FAILURE,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  SORT_DOGS_ALPHABETICALLY,
  SORT_DOGS_BY_WEIGHT,
  SORT_DOGS_BY_LIFE_SPAN,
  RESET_FILTERS_AND_SORT,
  APPLY_FILTERS
} from './actionTypes';

const BASE_URL = 'http://localhost:3001/DOGS';

export const getAllDogs = () => async (dispatch) => {
  dispatch({ type: GET_ALL_DOGS_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/dogs`);
    dispatch({ type: GET_ALL_DOGS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ALL_DOGS_FAILURE, payload: error.message });
  }
};

export const getDogDetailById = (id) => async (dispatch) => {
  dispatch({ type: GET_DOG_DETAIL_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/dogs/${id}`);
    dispatch({ type: GET_DOG_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_DOG_DETAIL_FAILURE, payload: error.message });
  }
};

export const getDogByName = (name) => async (dispatch) => {
  dispatch({ type: GET_DOG_BY_NAME_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/dogs/name/${name}`);
    dispatch({ type: GET_DOG_BY_NAME_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_DOG_BY_NAME_FAILURE, payload: error.message });
  }
};

export const getDogCardById = (id) => async (dispatch) => {
  dispatch({ type: GET_DOG_BY_ID_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/dogs/${id}`);
    // Asegúrate de que esta respuesta coincida con lo que esperas en el front-end
    dispatch({ type: GET_DOG_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_DOG_BY_ID_FAILURE, payload: error.message });
  }
};

export const getTemperaments = () => async (dispatch) => {
  dispatch({ type: GET_TEMPERAMENTS_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/temperaments`);
    dispatch({ type: GET_TEMPERAMENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TEMPERAMENTS_FAILURE, payload: error.message });
  }
};

export const createDog = (dogData) => async (dispatch) => {
  dispatch({ type: CREATE_DOG_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/dogs`, dogData);
    if (response.status === 201) {
      const action = { type: CREATE_DOG_SUCCESS, payload: response.data };
      dispatch(action);
      return action;  // Devuelve el objeto de acción
    } else {
      const action = { type: CREATE_DOG_FAILURE, payload: 'Failed to create dog.' };
      dispatch(action);
      return action;  // Devuelve el objeto de acción en caso de fallo
    }
  } catch (error) {
    const action = { type: CREATE_DOG_FAILURE, payload: error.message };
    dispatch(action);
    return action;  // Devuelve el objeto de acción en caso de error
  }
};

//* Actions for Filter componenet

export const filterByTemperament = (temperaments) => {
 
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: temperaments,
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const sortDogsAlphabetically = (order) => {
  return {
    type: SORT_DOGS_ALPHABETICALLY,
    payload: order,
  };
};

export const sortByWeight = (order) => {
  return {
    type: SORT_DOGS_BY_WEIGHT,
    payload: order,
  };
};

export const filterByLifeSpan = (lifeSpanRange) => {
  return {
    type: SORT_DOGS_BY_LIFE_SPAN,
    payload: lifeSpanRange,
  };
};

export const resetFiltersAndSort = () => {
  return {
    type: RESET_FILTERS_AND_SORT,
  };
};

export const applyFilters = () => {
  return (dispatch, getState) => {
    let { dogs, filterTemperaments, filterOrigin, sortOrder, lifeSpanRange } = getState().dogs;
    let filteredDogs = dogs;
    console.log('Initial dogs:', dogs); 
    // Aplicar filtros de temperamento
    if (filterTemperaments.length) {
      filteredDogs = filteredDogs.filter(dog => {
        // Verificar si los temperamentos son un array de strings (API) o de objetos (DB)
        if (dog.temperaments && dog.temperaments.length > 0) {
          if (typeof dog.temperaments[0] === 'string') {
            // Caso de la API: array de strings
            return dog.temperaments.some(temp => filterTemperaments.includes(temp));
          } else {
            // Caso de la base de datos: array de objetos
            return dog.temperaments.some(temp => filterTemperaments.includes(temp.name));
          }
        }
        return false;
      });
    }

    // Aplicar filtro de origen
    if (filterOrigin) {
      filteredDogs = filteredDogs.filter(dog =>
        filterOrigin === 'api' ? !isNaN(dog.id) : isNaN(dog.id)
      );
    }

    // Aplicar filtro de vida
    if (lifeSpanRange) {
      const [minLifeSpan, maxLifeSpan] = lifeSpanRange.split('-').map(Number);
      filteredDogs = filteredDogs.filter(dog => {
        let dogLifeSpan;
        if (dog.life_span.includes('-')) {
          const lifeSpanParts = dog.life_span.split(' ')[0].split('-').map(Number);
          dogLifeSpan = (lifeSpanParts[0] + lifeSpanParts[1]) / 2;
        } else {
          dogLifeSpan = parseInt(dog.life_span.split(' ')[0]);
        }
        return dogLifeSpan >= minLifeSpan && (!maxLifeSpan || dogLifeSpan <= maxLifeSpan);
      });
    }

    console.log('Filtered dogs (before sorting):', filteredDogs);
    // Aplicar ordenamiento
    if (sortOrder.includes('name')) {
      filteredDogs.sort((a, b) => {
        return sortOrder === 'name_asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
    } else if (sortOrder.includes('weight')) {
      filteredDogs.sort((a, b) => {
        // Parsear el peso para obtener el promedio en caso de rango
        const parseWeight = (weight) => {
          const weightParts = weight.split(' - ').map(Number);
          return weightParts.length === 2 ? (weightParts[0] + weightParts[1]) / 2 : weightParts[0];
        };
    
        const weightA = parseWeight(a.weight);
        const weightB = parseWeight(b.weight);
        return sortOrder === 'weight_asc' ? weightA - weightB : weightB - weightA;
      });
    }
    
    console.log('Filtered and sorted dogs:', filteredDogs);
    // Actualizar el estado con los perros filtrados
    dispatch({ type: APPLY_FILTERS, payload: filteredDogs });
  };
};