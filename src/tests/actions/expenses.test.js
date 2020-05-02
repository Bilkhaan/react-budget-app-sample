import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, startEditExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses } from '../../actions/expenses.js';
import database from '../../firebase/firebase';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};

  expenses.forEach(({ id, description, amount,  note, createdAt }) => {
    expenseData[id] = { id, description, amount,  note, createdAt };
  })

  database.ref('expenses').set(expenseData).then(() => {
    done();
  });
});

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

test('Should setup add expense action with defaults', (done) => {
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
});

test('Should test setExpenses correctly', () => {
  const action = setExpenses(expenses);

  expect(action.expenses).toEqual(expenses);
})

test('Should test startSetExpenses', (done) => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    const action = store.getActions();

    expect(action[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
})

test('Should test startRemoveExpense', (done) => {
  const store = createMockStore({});

  store.dispatch(startRemoveExpense({ id: expenses[0].id })).then(() => {
    const action = store.getActions();

    expect(action[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: expenses[0].id
    });

    return database.ref(`expenses/${expenses[0].id}`).once('value');
  }).then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('Should test startEditExpense', (done) => {
  const store = createMockStore({});
  const updates = { description: 'Rent Bill', amount: 2200, note: "Missed the chance" };

  store.dispatch(startEditExpense(expenses[0].id, updates)).then(() => {
    const action = store.getActions();

    expect(action[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: expenses[0].id,
      updates: updates
    });
    done();
  });
})

