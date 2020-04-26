import moment from "moment";
import { getVisibleExpenses } from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

test('Should filter expenses by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };

  const results = getVisibleExpenses(expenses, filters);
  expect(results).toEqual([expenses[1], expenses[0], expenses[2]]);
});

test('Should filter expenses by startDate value', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };

  const results = getVisibleExpenses(expenses, filters);
  expect(results).toEqual([expenses[3], expenses[1], expenses[0]]);
});

test('Should filter expenses by endDate value', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  };

  const results = getVisibleExpenses(expenses, filters);
  expect(results).toEqual([expenses[0], expenses[2]]);
});

test('Should sort expenses by date value', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };

  const results = getVisibleExpenses(expenses, filters);
  expect(results).toEqual([expenses[3], expenses[1], expenses[0], expenses[2]]);
});

test('Should sort expenses by amount value', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };

  const results = getVisibleExpenses(expenses, filters);
  expect(results).toEqual([expenses[1], expenses[2], expenses[0], expenses[3]]);
});