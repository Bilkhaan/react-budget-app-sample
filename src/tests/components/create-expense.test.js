import React from 'react';
import { shallow } from 'enzyme';
import { CreateExpense } from '../../components/create-expense';
import expenses from '../fixtures/expenses';

let onSubmitSpy, historySpy, wrapper;

beforeEach(() => {
  onSubmitSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(<CreateExpense  onSubmit={onSubmitSpy} history={historySpy} />);
});

test('Should test render of CreateExpense', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should test onsubmit CreateExpense', () => {
  wrapper.find('ExpenseForm').prop('onsubmitExpense')(expenses[0]);
  expect(onSubmitSpy).toHaveBeenLastCalledWith(expenses[0]);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
});