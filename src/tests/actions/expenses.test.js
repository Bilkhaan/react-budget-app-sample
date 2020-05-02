import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses.js';
import database from '../../firebase/firebase';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

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
  const expenseData = expenses[0];
  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('Should test add expense to database', (done) => {
  const store = createMockStore({});
  const expense = {
    description: 'rent fee',
    note: 'big time expense',
    amount: 1222,
    createdAt: 0
  }

  store.dispatch(startAddExpense(expense)).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense : {
        id: expect.any(String),
        ...expense
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expense);
    done();
  });
});

test('Should setup add expense action with defaults', () => {
  const store = createMockStore({});
  const expense = {
    description: '',
    note:  "",
    amount: 0,
    createdAt: 0
  }

  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense : {
        id: expect.any(String),
        ...expense
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expense);
    done();
  });
  // const action = addExpense();
  // const defaultExpense = {
  //   description: '',
  //   note: "",
  //   amount: 0,
  //   createdAt: 0
  // };

  // expect(action).toEqual({
  //   type: 'ADD_EXPENSE',
  //   expense: {
  //     ...defaultExpense,
  //     id: expect.any(String)
  //   }
  // });
});