import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expenseReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    combineReducers(
      {
        expenses: expenseReducer,
        filters: filtersReducer
      }
    ),
    composeEnhancer(applyMiddleware(thunk))
  );

  return store;
}