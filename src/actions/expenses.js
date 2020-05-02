import { v4 as uuidv4 } from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense = {}) => (
  {
    type: 'ADD_EXPENSE',
    expense
  }
);

export const startAddExpense = (expense = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = "",
      amount = 0,
      createdAt = 0  
    } = expense;
    const expenseData = { description, note, amount, createdAt };

    return database.ref('expenses').push(expenseData).then(
      (ref) => {
        dispatch(addExpense(
          {
            id: ref.key,
            ...expenseData
          }
        ));
      }
    );
  }
}

export const removeExpense = ({ id } = {}) => (
  {
    type: 'REMOVE_EXPENSE',
    id
  }
);

export const startRemoveExpense = ({ id }) => {
  console.log(id)
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  }
}

export const editExpense = (id, updates) => (
  {
    type: 'EDIT_EXPENSE',
    id,
    updates
  }
);

export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    });
  }
}

export const setExpenses = (expenses) => (
  {
    type: 'SET_EXPENSES',
    expenses
  }
);

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((snapshotElem) => {
        expenses.push({
          id: snapshotElem.key,
          ...snapshotElem.val()
        });
      })
      dispatch(setExpenses(expenses));
    });
  }
}