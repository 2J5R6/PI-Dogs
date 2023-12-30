import { combineReducers } from 'redux';
import dogsReducer from './dogsReducer'; // Importa el reductor de perros que definimos anteriormente

const rootReducer = combineReducers({
  dogs: dogsReducer,
  // Aquí puedes añadir más reductores según sea necesario
});

export default rootReducer;