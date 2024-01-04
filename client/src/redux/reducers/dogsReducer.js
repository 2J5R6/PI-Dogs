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

// Función auxiliar para ordenar alfabéticamente
const sortAlphabetically = (dogs, order) => {
  return dogs.sort((a, b) => {
    if (a.name < b.name) return order === 'asc' ? -1 : 1;
    if (a.name > b.name) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Función auxiliar para ordenar por peso
const sortByWeight = (dogs, order) => {
  return dogs.sort((a, b) => {
    // Asegúrate de que el peso está en el formato correcto para la comparación
    const weightA = parseInt(a.weight.metric.split(' - ')[0]);
    const weightB = parseInt(b.weight.metric.split(' - ')[0]);
    return order === 'asc' ? weightA - weightB : weightB - weightA;
  });
};


const initialState = {
  currentDog: null,
  loading: false,
  dogs: [],
  error: null,
  temperaments: [],
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
        dog.temperaments.includes(action.payload)
      );
      return {
        ...state,
        filteredDogs: filteredByTemperament
      };


    case FILTER_BY_ORIGIN:
      const isFromApi = dog => typeof dog.id === 'number';
      const isFromDb = dog => typeof dog.id === 'string';
      const filteredByOrigin = state.dogs.filter(dog => 
        action.payload === 'api' ? isFromApi(dog) : isFromDb(dog)
      );
      return {
        ...state,
        dogs: filteredByOrigin
      };

    case SORT_DOGS_ALPHABETICALLY:
      const sortedAlphabetically = sortAlphabetically([...state.dogs], action.payload);
      return {
        ...state,
        dogs: sortedAlphabetically
      };

    case SORT_DOGS_BY_WEIGHT:
      const sortedByWeight = sortByWeight([...state.dogs], action.payload);
      return {
        ...state,
        dogs: sortedByWeight
      };

    case SORT_DOGS_BY_LIFE_SPAN:
      // Implementa la lógica para ordenar por rango de vida
      // Asegúrate de que el rango de vida está en el formato correcto para la comparación
      // Por ejemplo, puedes usar un rango como "10-12" y comparar con el mínimo y máximo
      return {
        ...state,
        // Implementa la lógica de ordenamiento aquí
      };

    case RESET_FILTERS_AND_SORT:
      return {
        ...initialState
      };  

    
    default:
      return state;
  }
};

export default dogsReducer;