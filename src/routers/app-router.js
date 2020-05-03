import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CreateHistory from 'history/createBrowserHistory';
import Login from '../components/login';
import CreateExpense from '../components/create-expense';
import EditExpense from '../components/edit-expense';
import Home from '../components/home';
import Help from '../components/help';
import NotFound from '../components/not-found'; 
import PrivateRoutes from './private-routes';
import PublicRoutes from './public-routes';

export const history = CreateHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoutes path="/"  component={Login} exact={true} />
        <PrivateRoutes path="/dashboard" component={Home} />
        <PrivateRoutes path="/create" component={CreateExpense} />
        <PrivateRoutes path="/edit/:id" component={EditExpense} />
        <Route path="/help" component={Help} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;