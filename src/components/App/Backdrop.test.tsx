import * as React from 'react';
import { shallow } from 'enzyme';

import Backdrop from './Backdrop';
import { sendMessage } from '../../events/MessageService';

jest.spyOn(React, 'useEffect').mockImplementation(f => f());

describe('backdrop interaction with dialog component', () => {
  it('should not fade by default', () => {
    const wrapper = shallow(<Backdrop />);
    expect(wrapper.find('.backdrop-fade')).toHaveLength(0);
  });

  it('should fade when dialog is active', () => {
    const wrapper = shallow(<Backdrop />);
    sendMessage('dialog', true);
    expect(wrapper.find('.backdrop-fade')).toHaveLength(1);
  });

  it('should not fade when dialog is changed from active to inactive', () => {
    const wrapper = shallow(<Backdrop />);
    sendMessage('dialog', true);
    sendMessage('dialog', false);
    expect(wrapper.find('.backdrop-fade')).toHaveLength(0);
  });
});
