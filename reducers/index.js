import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import tableReducer from './tableReducer';

const rootReducer = combineReducers({
  tableReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
