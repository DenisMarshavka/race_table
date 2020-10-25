import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import tableReducer from './tableReducer';
import driversReducer from './driversReducer';

const rootReducer = combineReducers({
  tableReducer,
  driversReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
