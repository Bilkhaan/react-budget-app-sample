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

export const editExpense = (id, updates) => (
  {
    type: 'EDIT_EXPENSE',
    id,
    updates
  }
);