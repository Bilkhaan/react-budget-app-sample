import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from './expense-form';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpense extends React.Component {
  startEditExpense = (expense) => {
    this.props.startEditExpense(this.props.match.params.id, expense);
    this.props.history.push('/');
  }

  onRemoveClicked = () => {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div>
      this is Edit view
      <ExpenseForm
        expense={this.props.expense}
        onsubmitExpense={this.startEditExpense}
      />
      <button
        id="remove-expense"
        onClick={this.onRemoveClicked}
      >
        Remove
      </button>
    </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    expense: state.expenses.find((expense) => {
      return id == expense.id;
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);