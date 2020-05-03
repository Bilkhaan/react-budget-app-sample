import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/app-router';
import { configureStore } from './store/configure_store';
import { startSetExpenses } from './actions/expenses';
import { login, onLogout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading....</p>, document.getElementById("app"));

let rendered = false;

const renderApp = () => {
  if (!rendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    rendered = true;
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname == '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(onLogout());
    renderApp();
    history.push('/');
  }
});
