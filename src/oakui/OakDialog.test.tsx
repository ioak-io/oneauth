import * as React from 'react';
import { shallow } from 'enzyme';

import OakDialog from './OakDialog';

describe('dialog component interaction', () => {
  let mockToggleVisibilityFunction;
  beforeEach(() => {
    mockToggleVisibilityFunction = jest.fn();
  });

  it('should load when initialized', () => {
    const wrapper = shallow(
      <OakDialog visible toggleVisibility={mockToggleVisibilityFunction} />
    );
    expect(wrapper.find('.oak-dialog')).toHaveLength(1);
  });

  it('should be visible when visibility is ON', () => {
    const wrapper = shallow(
      <OakDialog visible toggleVisibility={mockToggleVisibilityFunction} />
    );
    expect(
      wrapper
        .find('.oak-dialog')
        .find('.dialog')
        .hasClass('show')
    ).toBeTruthy();
    expect(
      wrapper
        .find('.oak-dialog')
        .find('.dialog')
        .find('.container')
        .first()
        .hasClass('hidetext')
    ).toBeFalsy();
  });

  it('should not be visible when visibility is OFF', () => {
    const wrapper = shallow(
      <OakDialog
        visible={false}
        toggleVisibility={mockToggleVisibilityFunction}
      />
    );
    expect(
      wrapper
        .find('.oak-dialog')
        .find('.dialog')
        .hasClass('show')
    ).toBeFalsy();
    expect(
      wrapper
        .find('.oak-dialog')
        .find('.dialog')
        .find('.container')
        .first()
        .hasClass('hidetext')
    ).toBeTruthy();
  });

  it('should invoke togglevisibility handler function when clicked on close icon', () => {
    const wrapper = shallow(
      <OakDialog
        visible={false}
        toggleVisibility={mockToggleVisibilityFunction}
      />
    );
    wrapper.find('[data-test="toggle-visibility"]').simulate('click');
    expect(mockToggleVisibilityFunction).toBeCalledTimes(1);
  });
});
