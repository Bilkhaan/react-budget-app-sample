import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../components/not-found';

test('Should render NotFound component correctly', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});