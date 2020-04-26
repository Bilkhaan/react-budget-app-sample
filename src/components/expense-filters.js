import React from 'react';
import { connect } from 'react-redux';
import { updateTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';

export class ExpenseFilters extends React.Component {
  state = {
    calendarFocused: null
  }

  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}));
  }

  onTextChange = (e) => {
    this.props.updateTextFilter(e.target.value);
  }

  onSortByChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy == 'amount')
      this.props.sortByAmount();
    else if (sortBy == 'date')
    this.props.sortByDate();
  }

  render() {
    return (
      <div>
        <input id="text-filter" type="text" value={this.props.filters.text} onChange={this.onTextChange}/>
        <select id="sort-filter" value={this.props.filters.sortBy} onChange={this.onSortByChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
          startDateId="your_unique_start_date_id"
          endDateId="enddate-id"
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  updateTextFilter: (text) => dispatch(updateTextFilter(text)),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByDate: () => dispatch(sortByDate())
})

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFilters);