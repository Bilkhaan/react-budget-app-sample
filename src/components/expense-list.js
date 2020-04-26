import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './expense-list-item'
import { getVisibleExpenses } from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {
      !props.expenses || props.expenses.length == 0 ? 
        (<p>No expenses available</p>) : 
        (props.expenses.map((expense) => (<ExpenseListItem key={expense.id} {...expense} />)))
    }
  </div>
);

const mappedStateToProps = (state) => {
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
  }
};

export default connect(mappedStateToProps)(ExpenseList);
