import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expenseReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    combineReducers(
      {
        expenses: expenseReducer,
        filters: filtersReducer,
        auth: authReducer
      }
    ),
    composeEnhancer(applyMiddleware(thunk))
  );

  return store;
}