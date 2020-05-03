import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../components/login';

let loginClickedSpy, wrapper;

beforeEach(() => {
  loginClickedSpy = jest.fn();
  wrapper = shallow(<Login loginClicked={loginClickedSpy} />);
});

test('Should  test rendering login component', () => {
  expect(wrapper).toMatchSnapshot();
})

test('Should test login clicked', () => {
  wrapper.find('#login-btn').simulate('click');
  expect(loginClickedSpy).toHaveBeenCalled();
})