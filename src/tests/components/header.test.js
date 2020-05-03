import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/header';

let logoutClickedSpy, wrapper;

beforeEach(() => {
  logoutClickedSpy = jest.fn();
  wrapper = shallow(<Header logoutClicked={logoutClickedSpy} />);
});

test('Should render header component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should test logout clicked', () => {
  wrapper.find('#logout-btn').simulate('click');
  expect(logoutClickedSpy).toHaveBeenCalled();
})