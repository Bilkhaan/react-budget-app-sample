import React from 'react';
import ExpenseList from './expense-list';
import ExpenseFilter from './expense-filters';

const Home = () => (
  <div>
    this is dashboard
    <ExpenseFilter />
    <ExpenseList />
  </div>
);

export default Home;