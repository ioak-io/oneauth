import * as React from 'react';
import { shallow, mount } from 'enzyme';

import OakPrompt from './OakPrompt';

describe('prompt component interaction', () => {
  let mockToggleVisibilityFunction;
  let mockActionHandlerFunction;
  beforeEach(() => {
    mockToggleVisibilityFunction = jest.fn();
    mockActionHandlerFunction = jest.fn();
  });

  it('should load when initialized', () => {
    const wrapper = shallow(
      <OakPrompt
        visible
        toggleVisibility={mockToggleVisibilityFunction}
        action={mockActionHandlerFunction}
      />
    ).dive();
    expect(wrapper.find('.oak-dialog')).toHaveLength(1);
  });

  it('should not invoke action handler function when clicked on close', () => {
    const wrapper = mount(
      <OakPrompt
        visible={false}
        toggleVisibility={mockToggleVisibilityFunction}
        action={mockActionHandlerFunction}
      />
    );
    wrapper.find('[data-test="action-close"]').simulate('click');
    expect(mockToggleVisibilityFunction).toBeCalledTimes(1);
    expect(mockActionHandlerFunction).toBeCalledTimes(0);
  });

  it('should not invoke action handler function when clicked on proceed', () => {
    const wrapper = mount(
      <OakPrompt
        visible={false}
        toggleVisibility={mockToggleVisibilityFunction}
        action={mockActionHandlerFunction}
      />
    );
    wrapper.find('[data-test="action-proceed"]').simulate('click');
    expect(mockToggleVisibilityFunction).toBeCalledTimes(1);
    expect(mockActionHandlerFunction).toBeCalledTimes(1);
  });
});
