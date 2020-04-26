import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/expense-list';
import expenses from '../fixtures/expenses';

test('Should test expense list with data', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should test expense list with no data', () => {
  const wrapper = shallow(<ExpenseList />);
  expect(wrapper).toMatchSnapshot();
});