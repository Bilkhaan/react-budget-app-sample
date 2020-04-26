import React from 'react';
import { shallow } from 'enzyme';
import { EditExpense } from '../../components/edit-expense';
import expenses from '../fixtures/expenses';

let wrapper, editExpenseSpy, removeExpenseSpy, historySpy, expense;

beforeEach(() => {
  expense = expenses[0];
  editExpenseSpy = jest.fn();
  removeExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() }
  wrapper = shallow(<EditExpense expense={expense} editExpense={editExpenseSpy} removeExpense={removeExpenseSpy} match={{params: {id: expense.id}}} history={historySpy} />);
});

test('Should render edit expense correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should test oneditExpense of edit expense', () => {
  wrapper.find('ExpenseForm').prop('onsubmitExpense')(expense);
  expect(editExpenseSpy).toHaveBeenLastCalledWith(expense.id, expense);
});

test('Should test oneditExpense of edit expense', () => {
  wrapper.find('#remove-expense').simulate('click');
  expect(removeExpenseSpy).toHaveBeenLastCalledWith({ id: expense.id });
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
});