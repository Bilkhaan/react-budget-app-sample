import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('Should test the default state filters', () => {
  const state = filterReducer(undefined, { tyep: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should set sort by amount filter', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' })
  expect(state.sortBy).toBe('amount');
});

test('Should set sort by date filter', () => {
  const defaultState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const state = filterReducer(defaultState, { type: 'SORT_BY_DATE' })
  expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
  const state = filterReducer(undefined, { type: 'UPDATE_TEXT_FILTER', text: 'rent' })
  expect(state.text).toBe('rent');
});

test('Should set start date filter', () => {
  const date = moment().startOf('month').add(2, 'days');
  const state = filterReducer(undefined, { type: 'SET_START_DATE', date })
  expect(state.startDate).toEqual(date);
});

test('Should set end date filter', () => {
  const date = moment().endOf('month').add(2, 'days');
  const state = filterReducer(undefined, { type: 'SET_END_DATE', date })
  expect(state.endDate).toEqual(date);
});