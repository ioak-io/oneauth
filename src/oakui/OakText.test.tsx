import * as React from 'react';
import { shallow } from 'enzyme';

import OakText from './OakText';

// jest.spyOn(React, 'useEffect').mockImplementation(f => f());

describe('text field component interaction', () => {
  let mockHandleChangeFucntion;
  beforeEach(() => {
    mockHandleChangeFucntion = jest.fn();
  });

  it('should load when initialized', () => {
    const data = { testfield: 'test' };
    const wrapper = shallow(
      <OakText
        id="testfield"
        label="test label"
        data={data}
        handleChange={mockHandleChangeFucntion}
      />
    );
    expect(wrapper.find('.oak-text')).toHaveLength(1);
  });

  it('should show textarea if multiline is set', () => {
    const data = { testfield: 'test' };
    const wrapper = shallow(
      <OakText
        id="testfield"
        label="test label"
        data={data}
        multiline
        handleChange={mockHandleChangeFucntion}
      />
    );
    expect(wrapper.find('input')).toHaveLength(0);
    expect(wrapper.find('textarea')).toHaveLength(1);
  });

  it('should not show textarea if multiline is not set', () => {
    const data = { testfield: 'test' };
    const wrapper = shallow(
      <OakText
        id="testfield"
        label="test label"
        data={data}
        handleChange={mockHandleChangeFucntion}
      />
    );
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('textarea')).toHaveLength(0);
  });

  it('should invoke handle change handler function if text is typed id', () => {
    const data = { testfield: 'test' };
    const wrapper = shallow(
      <OakText
        id="testfield"
        label="test label"
        data={data}
        handleChange={mockHandleChangeFucntion}
      />
    );
    wrapper.find('input').simulate('change', { target: { value: 'a' } });
    expect(mockHandleChangeFucntion).toBeCalledWith({ target: { value: 'a' } });
  });

  it('should default input to text if type is not specified', () => {
    const data = { testfield: 'test' };
    const wrapper = shallow(
      <OakText
        id="testfield"
        label="test label"
        data={data}
        handleChange={mockHandleChangeFucntion}
      />
    );
    expect(wrapper.find('input').props().type).toBe('text');
  });

  it('should set the type of input to the type, when type is specified', () => {
    const data = { testfield: 'test' };
    const wrapper = shallow(
      <OakText
        id="testfield"
        label="test label"
        data={data}
        type="password"
        handleChange={mockHandleChangeFucntion}
      />
    );
    expect(wrapper.find('input').props().type).toBe('password');
  });

  //   it('should show content when in expanded state', () => {
  //     const wrapper = shallow(
  //       <OakText label="test label" icon="open" show={false} />
  //     );
  //     const contentHolder = wrapper.find('[data-test="content-holder"]');
  //     console.log(contentHolder.html());
  //     expect(contentHolder.hasClass('content')).toBeTruthy();
  //     expect(contentHolder.hasClass('show')).toBeTruthy();
  //   });
});
