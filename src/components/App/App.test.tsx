import * as React from 'react';
import { shallow } from 'enzyme';

import App from './index';
import Content from './Content';

it('renders without crashing', () => {
  const result = shallow(<App />).containsMatchingElement(<Content />);
  expect(result).toBeTruthy();
});
