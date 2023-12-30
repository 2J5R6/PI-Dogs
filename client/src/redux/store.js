// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Asegúrate de que esta ruta apunte al index.js de tu carpeta reducers

// Habilita las herramientas de desarrollo de Redux en modo desarrollo
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Crea la tienda con el reductor raíz y middleware aplicado
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
