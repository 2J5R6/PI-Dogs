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
  RESET_FILTERS_AND_SORT
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

export const filterByTemperament = (temperament) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: temperament,
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
