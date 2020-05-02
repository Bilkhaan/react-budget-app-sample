import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/app-router';
import { configureStore } from './store/configure_store';
import { addExpense } from './actions/expenses';
import { updateTextFilter } from './actions/filters';
import { getVisibleExpenses } from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 100, createdAt: 10000 }));
store.dispatch(addExpense({ description: 'Water bill', amount: 109500 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 50 }));

store.dispatch(updateTextFilter('gas'));

const state = store.getState();

console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
