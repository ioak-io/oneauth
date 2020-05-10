import * as React from 'react';
import { shallow } from 'enzyme';

import OakButton from './OakButton';

describe('button component interaction', () => {
  it('should load when initialized', () => {
    const wrapper = shallow(<OakButton />);
    expect(wrapper.find('.oak-button')).toHaveLength(1);
  });

  it('should invoke the callback function when clicked', () => {
    const mockAction = jest.fn();
    const wrapper = shallow(<OakButton action={mockAction} />);
    expect(mockAction.mock.calls.length).toEqual(0);
    wrapper.find('button').simulate('click');
    expect(mockAction.mock.calls.length).toEqual(1);
    wrapper.find('button').simulate('click');
    expect(mockAction.mock.calls.length).toEqual(2);
  });
});

describe('button component conditional styling', () => {
  it('should have choosen theme', () => {
    const wrapperWithPrimaryTheme = shallow(<OakButton theme="primary" />);
    expect(wrapperWithPrimaryTheme.hasClass('primary')).toBeTruthy();
    expect(wrapperWithPrimaryTheme.hasClass('default')).toBeFalsy();
    const wrapperWithDefaultTheme = shallow(<OakButton theme="default" />);
    expect(wrapperWithDefaultTheme.hasClass('primary')).toBeFalsy();
    expect(wrapperWithDefaultTheme.hasClass('default')).toBeTruthy();
    const wrapperWithNoTheme = shallow(<OakButton />);
    expect(wrapperWithNoTheme.hasClass('primary')).toBeFalsy();
    expect(wrapperWithNoTheme.hasClass('default')).toBeFalsy();
  });

  it('should render child elements as label', () => {
    const wrapper = shallow(<OakButton>Test label</OakButton>);
    expect(wrapper.text()).toEqual('Test label');
  });

  it('should align the text to direction passed as input', () => {
    const wrapper = shallow(<OakButton align="left" />);
    expect(wrapper.hasClass('align-left')).toBeTruthy();
    expect(wrapper.hasClass('align-right')).toBeFalsy();
  });

  it('should render the chosen variant', () => {
    const wrapper = shallow(<OakButton variant="appear" />);
    expect(wrapper.hasClass('appear')).toBeTruthy();
    expect(wrapper.hasClass('outline')).toBeFalsy();
  });

  it('should render as small button when small is passed as input', () => {
    const smallWrapper = shallow(<OakButton small />);
    const normalWrapper = shallow(<OakButton />);
    expect(smallWrapper.hasClass('small')).toBeTruthy();
    expect(normalWrapper.hasClass('small')).toBeFalsy();
  });
});
