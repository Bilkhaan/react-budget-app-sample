import React from 'react';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';
import { ExpenseForm } from './expense-form'

export class CreateExpense extends React.Component {
  onSubmit = (expense) => {
    this.props.onSubmit(expense);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
      this is Create view
      <ExpenseForm 
        onsubmitExpense={this.onSubmit}
      />
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (expense) => dispatch(startAddExpense(expense))
  };
};

export default connect(undefined, mapDispatchToProps)(CreateExpense);