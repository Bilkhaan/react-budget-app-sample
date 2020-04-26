import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import expenseTotal from '../selectors/expense-total';
import {getVisibleExpenses} from '../selectors/expenses';

export const ExpenseSummary = (props) => {
  const expenseWord = props.expenseCount == 1 ? 'expense' : 'expenses';
  const expenseTotalFormated = numeral(props.expenseTotal).format('$0,0.00');

  return (
    <div>
      <h3>
      {`Showing ${props.expenseCount} ${expenseWord} totalling to ${expenseTotalFormated}`}
      </h3>
    </div>
  );
}

const mapStateToProp = (state) => {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expenseTotal: expenseTotal(visibleExpenses)
  }
}

export default connect(mapStateToProp)(ExpenseSummary);
