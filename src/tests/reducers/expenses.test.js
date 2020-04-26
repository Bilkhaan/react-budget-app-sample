import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('Should set remove expense', () => {
  const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2], expenses[3]]);
});

test('Should not remove expense if not find id', () => {
  const action = { type: 'REMOVE_EXPENSE', id: -1 };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('Should add expense to list', () => {
  const expense = {
    id: '5',
    description: 'ride bill',
    note: 'next month rent',
    amount: 2400,
    createdAt: 0
  };
  const action = { 
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('Should edit expense by id', () => {
  const action = { 
    type: 'EDIT_EXPENSE',
    id: expenses[2],
    updates: {
      description: 'update in bill',
      note: 'next month rent',
      amount: 2800,
      createdAt: 10000
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[2]).toEqual(expenses[2]);
});

test('Should edit expense by id', () => {
  const action = { 
    type: 'EDIT_EXPENSE',
    id: expenses[2],
    updates: {
      description: 'update in bill',
      note: 'next month rent',
      amount: 2800,
      createdAt: 10000
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[2]).toEqual(expenses[2]);
});

test('Should not edit expense by id if not find', () => {
  const action = { 
    type: 'EDIT_EXPENSE',
    id: -1,
    updates: {
      description: 'update in bill',
      note: 'next month rent',
      amount: 2800,
      createdAt: 10000
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});