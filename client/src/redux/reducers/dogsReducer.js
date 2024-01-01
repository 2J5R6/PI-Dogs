// Reductor de Redux para manejar el estado de las razas de perros

import {
  GET_ALL_DOGS_REQUEST,
  GET_ALL_DOGS_SUCCESS,
  GET_ALL_DOGS_FAILURE,
  CREATE_DOG_REQUEST,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  dogs: [],
  error: null
};

// Reductor para operaciones con razas de perros
const dogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_DOGS_SUCCESS:
      return { ...state, loading: false, dogs: action.payload };
    case GET_ALL_DOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case CREATE_DOG_REQUEST:
        return { ...state, loading: true };
      case CREATE_DOG_SUCCESS:
        // Puedes decidir si quieres añadir el nuevo perro al estado o no
        return { ...state, loading: false, dogs: [...state.dogs, action.payload] };
      case CREATE_DOG_FAILURE:
        return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default dogsReducer;