import { createStore } from 'redux';

const increment = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrement = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

const reset = () => ({
  type: 'RESET'
});

const store = createStore((state = { count: 10 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  } 
});

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(increment({ incrementBy: 20 }));
store.dispatch(decrement({ decrementBy: 25 }));
store.dispatch(reset());