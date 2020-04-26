import { addExpense, editExpense, removeExpense } from '../../actions/expenses.js';

test('Should setup remobve expense action', () => {
  const action = removeExpense({ id: '123abc4' });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc4'
  });
});

test('Should setup edit expense action', () => {
  const updates = { description: 'Rent Bill', amount: 2200, note: "Missed the chance" };
  const action = editExpense('123abc4', updates);

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc4',
    updates
  });
});

test('Should setup add expense action', () => {
  const expenseData = { description: 'Rent Bill', amount: 2200, note: "Missed the chance", createdAt: 10000 };
  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('Should setup add expense action with defaults', () => {
  const action = addExpense();
  const defaultExpense = {
    description: '',
    note: "",
    amount: 0,
    createdAt: 0
  };

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...defaultExpense,
      id: expect.any(String)
    }
  });
});