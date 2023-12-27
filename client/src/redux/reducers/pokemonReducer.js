import {
  FETCH_POKEMONS_REQUEST,
  FETCH_POKEMONS_SUCCESS,
  FETCH_POKEMONS_FAILURE,
  CREATE_POKEMON_SUCCESS,
  CREATE_POKEMON_FAILURE,
  TOGGLE_FAVORITE,
  FETCH_POKEMON_BY_NAME_OR_ID_REQUEST,
  FETCH_POKEMON_BY_NAME_OR_ID_SUCCESS,
  FETCH_POKEMON_BY_NAME_OR_ID_FAILURE,
  SET_DATA_SOURCE,
  SORT_BY_ID_ASC,
  SORT_BY_ID_DESC,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  SET_SEARCHED_POKEMONS,
  SET_POKEMONS,
  ADD_TO_SEARCHED_POKEMONS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES
} from '../actions/actionTypes';

const initialState = {
  pokemons: [],
  searchedPokemons: [],
  isLoading: false,
  error: null,
  createdPokemon: null,
  favorites: [],
  selectedPokemon: null,
  dataSource: 'db'  // Fuente de datos por defecto
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMONS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_POKEMONS_SUCCESS:
      return { ...state, isLoading: false, pokemons: action.payload };
    case FETCH_POKEMONS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case CREATE_POKEMON_SUCCESS:
      return { ...state, createdPokemon: action.payload };
    case CREATE_POKEMON_FAILURE:
      return { ...state, error: action.payload };
    case TOGGLE_FAVORITE:
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite 
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload]
      };
    case FETCH_POKEMON_BY_NAME_OR_ID_REQUEST:
      return { ...state, isLoading: true, error: null, selectedPokemon: null };
    case FETCH_POKEMON_BY_NAME_OR_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemons: [...state.pokemons,action.payload], // Asegúrate de que los datos se almacenen en un array
        searchedPokemons: [...state.searchedPokemons, action.payload],
        selectedPokemon: action.payload
    };
    case FETCH_POKEMON_BY_NAME_OR_ID_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case SET_DATA_SOURCE:
      return { ...state, dataSource: action.payload };
    case SORT_BY_ID_ASC:
      const sortedByIdAsc = [...state.pokemons].sort((a, b) => a.id - b.id);
      return {
        ...state,
        pokemons: sortedByIdAsc,
        searchedPokemons: sortedByIdAsc
      };
    case SORT_BY_ID_DESC:
      const sortedByIdDesc = [...state.pokemons].sort((a, b) => b.id - a.id);
      return {
        ...state,
        pokemons: sortedByIdDesc,
        searchedPokemons: sortedByIdDesc
      };
    case SORT_BY_NAME_ASC:
      const sortByIDNameAsc = [...state.pokemons].sort((a, b) => a.name.localeCompare(b.name))
      return {
        ...state,
        pokemons: sortByIDNameAsc,
        searchedPokemons: sortByIDNameAsc
      };
    case SORT_BY_NAME_DESC:
      const sortByIDNameDesc = [...state.pokemons].sort((a, b) => b.name.localeCompare(a.name))
      return {
        ...state, 
        pokemons: sortByIDNameDesc,
        searchedPokemons: sortByIDNameDesc
      };
    case SET_SEARCHED_POKEMONS:
      return {
        ...state,
        searchedPokemons: action.payload,
      };
    case SET_POKEMONS:
      return{
        ...state,
        pokemons: action.payload
        }
    case ADD_TO_SEARCHED_POKEMONS:
      return {
        ...state,
        searchedPokemons: [...state.searchedPokemons, action.payload]
      };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(pokemon => pokemon.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default pokemonReducer;
