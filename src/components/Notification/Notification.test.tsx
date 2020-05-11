import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Notification from './index';
import { sendMessage } from '../../events/MessageService';

jest.spyOn(React, 'useEffect').mockImplementation(f => f());
jest.useFakeTimers();

describe('notification component interaction', () => {
  it('should be empty initially', () => {
    const wrapper = shallow(<Notification />);
    expect(wrapper.html()).toBe('');
  });
  it('should remove notification after the set time duration', () => {
    const wrapper = shallow(<Notification />);
    expect(wrapper.html()).toBe('');
    sendMessage('notification', true, {
      type: 'success',
      message: 'test message',
      duration: 3000,
    });
    expect(wrapper.html()).not.toBe('');
    setTimeout(() => {
      expect(wrapper.html()).toBe('');
    }, 5000);
    jest.runAllTimers();
  });
});

// describe('notification component message types', () => {
//   it('should show a notification when a notification event is received', () => {
//     const wrapper = shallow(<Notification />);
//     sendMessage('notification', true, {
//       type: 'success',
//       message: 'test message',
//     });
//     expect(wrapper.find('.notification').toHaveLength(1));
//   });
// });

describe('notification component spinner interaction', () => {
  it('should start spinner when a spinner event is received', () => {
    const wrapper = shallow(<Notification />);
    expect(wrapper.find('[data-test="spinner"]')).toHaveLength(0);
    sendMessage('spinner');
    expect(wrapper.find('[data-test="spinner"]')).toHaveLength(1);
  });
  it('should stop spinner when a spinner stop event is received', () => {
    const wrapper = shallow(<Notification />);
    sendMessage('spinner');
    expect(wrapper.find('[data-test="spinner"]')).toHaveLength(1);
    sendMessage('spinner', false);
    expect(wrapper.find('[data-test="spinner"]')).toHaveLength(0);
  });
  it('should stop spinner when a notification event is received', () => {
    const wrapper = shallow(<Notification />);
    sendMessage('spinner');
    expect(wrapper.find('[data-test="spinner"]')).toHaveLength(1);
    // sendMessage('notification', true);
    // expect(wrapper.find('[data-test="spinner"]')).toHaveLength(0);
  });
});
