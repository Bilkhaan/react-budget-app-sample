import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseFilters } from '../../components/expense-filters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, setStartDate, setEndDate, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  wrapper = shallow(<ExpenseFilters
    filters={filters}
    setEndDate={setEndDate}
    setStartDate={setStartDate}
    updateTextFilter={setTextFilter}
    sortByAmount={sortByAmount}
    sortByDate={sortByDate}
  />);
});

test('Should test component render', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should test component with alt filters render', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
  wrapper.find('#text-filter').simulate('change', { target: { value: 'bills'}});
  expect(setTextFilter).toHaveBeenLastCalledWith('bills');
});

test('Should sort by date test', () => {
  wrapper.find('#sort-filter').simulate('change', { target: { value: 'date'}});
  expect(sortByDate).toBeCalled();
});

test('Should sort by amount test', () => {
  wrapper.find('#sort-filter').simulate('change', { target: { value: 'amount'}});
  expect(sortByAmount).toBeCalled();
});

test('Should test date change', () => {
  const startDate = moment(0).add(4, 'days');
  const endDate = moment(0).add(8, 'days');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});