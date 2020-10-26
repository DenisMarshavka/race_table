import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import racesReducer from './racesReducer';
import driversReducer from './driversReducer';

const rootReducer = combineReducers({
  racesReducer,
  driversReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
