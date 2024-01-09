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
  GET_TEMPERAMENTS_SUCCESS,
  APPLY_FILTERS
} from '../actions/actionTypes';

const initialState = {
  currentDog: null,
  loading: false,
  dogs: [],
  error: null,
  temperaments: [],
  filteredDogs: [], 
  filterTemperaments: [],
  filterOrigin: null,
  sortOrder: '',
  lifeSpanRange: '',
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
//* Inicio Filtros
    case FILTER_BY_TEMPERAMENT:
      // Actualiza el estado con el array de temperamentos seleccionados
      return { ...state, filterTemperaments: action.payload };

    case FILTER_BY_ORIGIN:
      // Actualiza el estado con el origen seleccionado
      return { ...state, filterOrigin: action.payload };

    case SORT_DOGS_ALPHABETICALLY:
      // Actualiza el estado con el orden alfabético seleccionado
      return { ...state, sortOrder: action.payload };

    case SORT_DOGS_BY_WEIGHT:
      // Actualiza el estado con el orden de peso seleccionado
      return { ...state, sortOrder: action.payload };

    case SORT_DOGS_BY_LIFE_SPAN:
      // Actualiza el estado con el rango de vida seleccionado
      return { ...state, lifeSpanRange: action.payload };

    case RESET_FILTERS_AND_SORT:
      // Restablece los filtros y ordenamientos a su estado inicial
      return {
          ...state,
          filteredDogs: [],
          filterTemperaments: [],
          filterOrigin: null,
          sortOrder: '',
          lifeSpanRange: '',
      };

    case APPLY_FILTERS:
      // Aplica todos los filtros almacenados en el estado
      let filteredDogs = state.dogs;

      // Filtrar por temperamentos
      if (state.filterTemperaments.length) {
        filteredDogs = filteredDogs.filter(dog =>
          state.filterTemperaments.every(temp =>
            dog.temperaments.map(t => t.name).includes(temp)
          )
        );
      }

      // Filtrar por origen
      if (state.filterOrigin) {
        filteredDogs = filteredDogs.filter(dog =>
          state.filterOrigin === 'api' ? typeof dog.id === 'number' : typeof dog.id === 'string'
        );
      }

      // Ordenar por peso o alfabéticamente
      if (state.sortOrder) {
        filteredDogs.sort((a, b) => {
          // Comparación basada en el sortOrder
        });
      }

      // Filtrar por rango de vida
      if (state.lifeSpanRange) {
        const [min, max] = state.lifeSpanRange.split('-').map(Number);
        filteredDogs = filteredDogs.filter(dog => {
          const lifeSpan = parseInt(dog.life_span.split(' ')[0]);
          return lifeSpan >= min && (!max || lifeSpan <= max);
        });
      }

      return { ...state, filteredDogs };
    
    default:
      return state;
  }
};

export default dogsReducer;