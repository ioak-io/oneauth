import * as React from 'react';
import { shallow } from 'enzyme';

import OakViewResolver from './OakViewResolver';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
describe('view resolver component interaction', () => {
  it('should load when initialized', () => {
    const wrapper = shallow(
      <OakViewResolver>
        <div>child one</div>
        <div>child two</div>
      </OakViewResolver>
    );
    expect(wrapper.find('.view-content')).toHaveLength(1);
  });
});
