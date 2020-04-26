import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseForm } from '../../components/expense-form';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('Should render expense form with default values', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render expense form with values', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}  />);
  expect(wrapper).toMatchSnapshot();
});

test('Should test sumbit error on form expense', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('Should test description change on form expense', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#description').simulate('change', {
    target: {
      value: 'test description here'
    }
  });
  expect(wrapper.state('description')).toBe('test description here');
  expect(wrapper).toMatchSnapshot();
});

test('Should test note change on form expense', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#note').simulate('change', {
    target: {
      value: 'test note here'
    }
  });
  expect(wrapper.state('note')).toBe('test note here');
  expect(wrapper).toMatchSnapshot();
});

test('Should test amount change with valid amount on form expense', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#amount').simulate('change', {
    target: {
      value: '23.56'
    }
  });
  expect(wrapper.state('amount')).toBe('23.56');
  expect(wrapper).toMatchSnapshot();
});

test('Should test amount change with invalid amount on form expense', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#amount').simulate('change', {
    target: {
      value: '23.8888'
    }
  });
  expect(wrapper.state('amount')).toBe('');
  expect(wrapper).toMatchSnapshot();
});

test('Should test form submitted values', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm  expense={expenses[0]} onsubmitExpense={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    note: expenses[0].note,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt,
  });
});

test('Should test on select date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const now = moment();
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toBe(now);
});

test('Should test focused change on date picker', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});