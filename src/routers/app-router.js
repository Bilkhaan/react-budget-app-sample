import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CreateHistory from 'history/createBrowserHistory';
import Login from '../components/login';
import CreateExpense from '../components/create-expense';
import EditExpense from '../components/edit-expense';
import Header from '../components/header';
import Home from '../components/home';
import Help from '../components/help';
import NotFound from '../components/not-found'; 
import PrivateRoutes from './private-routes';

export const history = CreateHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/"  component={Login} exact={true} />
        <PrivateRoutes path="/dashboard" component={Home} />
        <PrivateRoutes path="/create" component={CreateExpense} />
        <PrivateRoutes path="/edit/:id" component={EditExpense} />
        <PrivateRoutes path="/help" component={Help} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;