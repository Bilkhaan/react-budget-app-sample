import React from 'react';
import ExpenseList from './expense-list';
import ExpenseFilter from './expense-filters';
import ExpenseSummary from './expenses-summary';

const Home = () => (
  <div>
    this is dashboard
    <ExpenseSummary />
    <ExpenseFilter />
    <ExpenseList />
  </div>
);

export default Home;