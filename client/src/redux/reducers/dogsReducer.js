// Reductor de Redux para manejar el estado de las razas de perros

import {
  GET_ALL_DOGS_REQUEST,
  GET_ALL_DOGS_SUCCESS,
  GET_ALL_DOGS_FAILURE,
  CREATE_DOG_REQUEST,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAILURE,
  GET_DOG_BY_ID_SUCCESS,
  GET_DOG_BY_NAME_SUCCESS,
  GET_DOG_DETAIL_REQUEST,
  GET_DOG_DETAIL_SUCCESS,
  GET_DOG_DETAIL_FAILURE,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  SORT_DOGS_ALPHABETICALLY,
  SORT_DOGS_BY_WEIGHT,
  SORT_DOGS_BY_LIFE_SPAN,
  RESET_FILTERS_AND_SORT,
  GET_TEMPERAMENTS_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  currentDog: null,
  loading: false,
  dogs: [],
  error: null,
  temperaments: [],
  filteredDogs: [], 
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
    case GET_DOG_BY_ID_SUCCESS:
      // Asegúrate de actualizar el estado con la tarjeta del perro encontrado
      return { ...state, loading: false, dogs: [action.payload] };
    case GET_DOG_BY_NAME_SUCCESS:
      return { ...state, loading: false, dogs: action.payload };
    case GET_DOG_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_DOG_DETAIL_SUCCESS:
      return { ...state, loading: false, currentDog: action.payload };
    case GET_DOG_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_TEMPERAMENTS_SUCCESS:
      return {
          ...state,
          temperaments: action.payload, // Esto debe ser un array
        };
    case FILTER_BY_TEMPERAMENT:
      //* Filtra los perros por el temperamento proporcionado en action.payload
      const filteredByTemperament = state.dogs.filter(dog => 
        dog.temperaments.some(temp => temp.name === action.payload)
      );
      return { ...state, filteredDogs: filteredByTemperament };


    case FILTER_BY_ORIGIN:
      const filteredByOrigin = state.dogs.filter(dog => 
        action.payload === 'api' ? typeof dog.id === 'number' : typeof dog.id === 'string'
      );
      return {
        ...state,
        filteredDogs: filteredByOrigin
      };

    case SORT_DOGS_ALPHABETICALLY:
      const sortedAlphabetically = [...state.dogs].sort((a, b) => {
        if (action.payload === 'asc') {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });
      return { ...state, dogs: sortedAlphabetically };

    case SORT_DOGS_BY_WEIGHT:
      const sortedByWeight = state.dogs
        .filter(dog => dog.weight && dog.weight.metric)
        .sort((a, b) => {
          const weightA = parseInt(a.weight.metric.split(' - ')[0]);
          const weightB = parseInt(b.weight.metric.split(' - ')[0]);
          return action.payload === 'asc' ? weightA - weightB : weightB - weightA;
        });
      return { ...state, dogs: sortedByWeight };

    case SORT_DOGS_BY_LIFE_SPAN:
      const range = action.payload.split('-').map(Number);
      const filteredByLifeSpan = state.dogs.filter(dog => {
        const lifeSpanYears = dog.life_span.match(/\d+/g).map(Number);
        return lifeSpanYears.some(year => year >= range[0] && year <= range[1]);
      });
      return { ...state, dogs: filteredByLifeSpan };

      case RESET_FILTERS_AND_SORT:
        return {
          ...state,
          filteredDogs: []
        };  

    
    default:
      return state;
  }
};

export default dogsReducer;