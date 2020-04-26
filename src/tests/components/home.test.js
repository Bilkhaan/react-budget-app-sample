import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/home';

test('Should render Home component correctly', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).toMatchSnapshot();
});