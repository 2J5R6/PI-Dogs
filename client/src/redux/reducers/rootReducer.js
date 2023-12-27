import { combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';


const rootReducer = combineReducers({
  pokemons: pokemonReducer,
});

export default rootReducer;
