import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateExpense from '../components/create-expense';
import EditExpense from '../components/edit-expense';
import Header from '../components/header';
import Home from '../components/home';
import Help from '../components/help';
import NotFound from '../components/not-found';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/create" component={CreateExpense} />
        <Route path="/edit/:id" component={EditExpense} />
        <Route path="/help" component={Help} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;