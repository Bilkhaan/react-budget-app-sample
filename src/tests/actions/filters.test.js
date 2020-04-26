import { updateTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';
import moment from 'moment';

test('Should set text filter', () => {
  const action = updateTextFilter('Rent');

  expect(action).toEqual({
    type: 'UPDATE_TEXT_FILTER',
    text: 'Rent'
  })
});

test('Should set text filter with default', () => {
  const action = updateTextFilter();

  expect(action).toEqual({
    type: 'UPDATE_TEXT_FILTER',
    text: ''
  })
});

test('Should set sort by amount', () => {
  const action = sortByAmount();

  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

test('Should set sort by date', () => {
  const action = sortByDate();

  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  });
});

test('Should set start date filter', () => {
  const action = setStartDate(moment(0));

  expect(action).toEqual({
    type: 'SET_START_DATE',
    date: moment(0)
  });
});

test('Should set end date filter', () => {
  const action = setEndDate(moment(0));

  expect(action).toEqual({
    type: 'SET_END_DATE',
    date: moment(0)
  });
});