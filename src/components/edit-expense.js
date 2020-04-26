import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from './expense-form';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpense extends React.Component {
  editExpense = (expense) => {
    this.props.editExpense(this.props.match.params.id, expense);
    this.props.history.push('/');
  }

  onRemoveClicked = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div>
      this is Edit view
      <ExpenseForm
        expense={this.props.expense}
        onsubmitExpense={this.editExpense}
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
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (id) => dispatch(removeExpense({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);