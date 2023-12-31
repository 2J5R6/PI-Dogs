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
    let { dogs, filterTemperaments, filterOrigin, weightOrder, alphabetOrder, lifeSpanRange } = getState().dogs;
    let filteredDogs = dogs;

    // Aplicar filtros de temperamento
    if (filterTemperaments.length) {
      filteredDogs = filteredDogs.filter(dog =>
        dog.temperaments.some(temp =>
          filterTemperaments.includes(temp.name)
        )
      );
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
        const dogLifeSpan = dog.life_span.split('-')[0];
        return dogLifeSpan >= minLifeSpan && (!maxLifeSpan || dogLifeSpan <= maxLifeSpan);
      });
    }

    // Aplicar ordenamiento alfabético
    if (alphabetOrder) {
      filteredDogs.sort((a, b) => {
        return alphabetOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
    }

    // Aplicar ordenamiento por peso
    if (weightOrder) {
      filteredDogs.sort((a, b) => {
        const weightA = parseInt(a.weight.metric.split(' - ')[0]);
        const weightB = parseInt(b.weight.metric.split(' - ')[0]);
        return weightOrder === 'asc' ? weightA - weightB : weightB - weightA;
      });
    }

    // Actualizar el estado con los perros filtrados
    dispatch({ type: APPLY_FILTERS, payload: filteredDogs });
  };
};