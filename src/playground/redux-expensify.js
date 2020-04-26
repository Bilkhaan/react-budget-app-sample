import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';

const expenseReducerDefaultState = [];
const filtersDeafultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};


const addExpense = (
  {
    description = '',
    note = "",
    amount = 0,
    createdAt = 0
  }) => (
  {
    type: 'ADD_EXPENSE',
    expense: {
      id: uuidv4(),
      description,
      note,
      amount,
      createdAt
    }
  }
)

const removeExpense = ({ id } = {}) => (
  {
    type: 'REMOVE_EXPENSE',
    id
  }
);

const editExpense = (id, updates) => (
  {
    type: 'EDIT_EXPENSE',
    id,
    updates
  }
);

const updateTextFilter = (text = "") => (
  {
    type: "UPDATE_TEXT_FILTER",
    text
  }
);

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

const setStartDate = (date) => (
  {
    type: "SET_START_DATE",
    date
  }
);

const setEndDate = (date) => (
  {
    type: "SET_END_DATE",
    date
  }
);

const expenseReducer = (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [
        ...state,
        action.expense
      ]
    case "REMOVE_EXPENSE":
      return [ ...state.filter(({id}) => id !== action.id) ];
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense
        }
      })
    default:
      return state;
  }
};

const filtersReducer = (state = filtersDeafultState, action) => {
  switch (action.type) {
    case "UPDATE_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      }
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: 'amount'
      }
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: 'date'
      }
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date
      }
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date
      }
    default:
      return state;
  }
};

const store = createStore(
  combineReducers(
    {
      expenses: expenseReducer,
      filters: filtersReducer
    }
  )
);

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatched = typeof startDate !== "number" || expense.createdAt >= startDate;
    const endDateMatched = typeof endDate !== "number" || expense.createdAt <= endDate;
    const textMatched = expense.description.toLowerCase().includes(text.toLowerCase())

    console.log(startDateMatched, endDateMatched, textMatched)
    return startDateMatched && endDateMatched && textMatched;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? -1 : 1;
    }
  })
}


store.subscribe(() => {
  const st = store.getState();
  console.log(getVisibleExpenses(st.expenses, st.filters));
})

const expense1 = store.dispatch(addExpense({ description: "Rent", note: "Dues this month", amount: 1230, createdAt: 1250}));
const expense2 = store.dispatch(addExpense({ description: "Bills rent", note: "Dues this month", amount: 1000, createdAt: 2000}));
// store.dispatch(removeExpense({ id: expense1.expense.id }));
store.dispatch(editExpense(expense2.expense.id, { amount: 455 }));

store.dispatch(updateTextFilter("rent"));
// store.dispatch(updateTextFilter());
// store.dispatch(sortByDate());
store.dispatch(sortByAmount());
store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
store.dispatch(setEndDate(2550));

const demoState = {
  expenses: [
    {
      id: 'lolololo',
      description: "Hello world here we go",
      note: "Last payment",
      amount: 45333,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
};

