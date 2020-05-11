import * as React from 'react';
import { shallow } from 'enzyme';

import OakCheckbox from './OakCheckbox';

describe('checkbox component interaction', () => {
  let mockHandleChange;

  beforeEach(() => {
    mockHandleChange = jest.fn();
  });

  it('should load when initialized', () => {
    const data = { testfield: false };
    const wrapper = shallow(
      <OakCheckbox id="testfield" data={data} handleChange={mockHandleChange} />
    );
    expect(wrapper.find('.oak-check-box')).toHaveLength(1);
  });

  it('should invoke handle change handler with value as true when checkbox toggled from off state', () => {
    const data = { testfield: false };
    const wrapper = shallow(
      <OakCheckbox id="testfield" data={data} handleChange={mockHandleChange} />
    );

    const mockEventToTurnOn = { target: { checked: true } };
    wrapper.find('input').simulate('change', mockEventToTurnOn);
    expect(mockHandleChange.mock.calls.length).toBe(1);
    expect(mockHandleChange).toBeCalledWith({
      target: { checked: true },
    });
  });

  it('should invoke handle change handler with value as true when checkbox toggled from off state', () => {
    const data = { testfield: true };
    const wrapper = shallow(
      <OakCheckbox id="testfield" data={data} handleChange={mockHandleChange} />
    );

    const mockEventToTurnOff = { target: { checked: false } };
    wrapper.find('input').simulate('change', mockEventToTurnOff);
    expect(mockHandleChange.mock.calls.length).toBe(1);
    expect(mockHandleChange).toBeCalledWith({
      target: { checked: false },
    });
  });

  it('should not turn on the check box when the input data is false', () => {
    const data = { testfield: false };
    const wrapper = shallow(
      <OakCheckbox id="testfield" data={data} handleChange={mockHandleChange} />
    );
    const checkbox = wrapper.find({ type: 'checkbox' });
    expect(checkbox.props().checked).toBeFalsy();
  });

  it('should turn on the check box when the input data is false', () => {
    const data = { testfield: true };
    const wrapper = shallow(
      <OakCheckbox id="testfield" data={data} handleChange={mockHandleChange} />
    );
    const checkbox = wrapper.find({ type: 'checkbox' });
    expect(checkbox.props().checked).toBeTruthy();
  });
});

describe('button component conditional styling', () => {
  let mockHandleChange;
  let data;

  beforeEach(() => {
    data = { testfield: false };
    mockHandleChange = jest.fn();
  });

  it('should have choosen theme', () => {
    const wrapperWithPrimaryTheme = shallow(
      <OakCheckbox
        id="testfield"
        data={data}
        handleChange={mockHandleChange}
        theme="primary"
      />
    );
    expect(wrapperWithPrimaryTheme.hasClass('primary')).toBeTruthy();
    expect(wrapperWithPrimaryTheme.hasClass('default')).toBeFalsy();
    const wrapperWithDefaultTheme = shallow(
      <OakCheckbox
        id="testfield"
        data={data}
        handleChange={mockHandleChange}
        theme="default"
      />
    );
    expect(wrapperWithDefaultTheme.hasClass('primary')).toBeFalsy();
    expect(wrapperWithDefaultTheme.hasClass('default')).toBeTruthy();
    const wrapperWithNoTheme = shallow(
      <OakCheckbox id="testfield" data={data} handleChange={mockHandleChange} />
    );
    expect(wrapperWithNoTheme.hasClass('primary')).toBeFalsy();
    expect(wrapperWithNoTheme.hasClass('default')).toBeFalsy();
  });

  it('should render the chosen variant', () => {
    const wrapper = shallow(
      <OakCheckbox
        id="testfield"
        data={data}
        handleChange={mockHandleChange}
        variant="circle"
      />
    );
    expect(wrapper.hasClass('circle')).toBeTruthy();
    expect(wrapper.hasClass('square')).toBeFalsy();
  });
});
