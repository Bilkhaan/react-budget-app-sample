import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
// import 'react-dates/initialize';

export class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense && props.expense.description || '',
      amount: props.expense && props.expense.amount/100 || '',
      note: props.expense && props.expense.note || '',
      createdAt: props.expense && moment(props.expense.createdAt) || moment(),
      calendarFocused: false,
      error: ''
    }

  }

  setDescription = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  setAmount = (e) => {
    const amount = e.target.value;

    if (amount.match(/^\d*(\.\d{0,2})?$/))
      this.setState(() => ({ amount }));
  }

  onDateChange = (createdAt) => {
    this.setState(() => ({ createdAt }));
  }

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  }

  setNote = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  }

  onSubmit = (e) => {
    e.preventDefault();
  
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please fill in descripton and amount' }));
    } else {
      this.setState(() => ({ error: '' }));

      this.props.onsubmitExpense({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.setDescription}
          />
          <input
            type="text"
            placeholder="Amount"
            id="amount"
            value={this.state.amount}
            onChange={this.setAmount}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add note (optional)"
            id="note"
            value={this.state.note}
            onChange={this.setNote}
          >
          </textarea>

          <button >Submit Expense</button>
        </form>
      </div>
    );
  }
}