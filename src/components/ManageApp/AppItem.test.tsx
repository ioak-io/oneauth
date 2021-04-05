import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createShallow } from '@material-ui/core/test-utils';
import * as Redux from 'react-redux';
import { Action } from 'redux';

import AppItem from './AppItem';

enzyme.configure({ adapter: new Adapter() });

describe('ManageApp App item component interaction', () => {
  let shallow: typeof enzyme.shallow;
  let useSelectorSpy: jest.SpyInstance;
  let useDispatchSpy: jest.SpyInstance;
  beforeEach(() => {
    shallow = createShallow();
    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
    useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockImplementation(() => (cb: Action) => cb);
  });

  it('should load when initialized', () => {
    useSelectorSpy.mockReturnValue({
      data: {
        data: [{ domainId: '1' }, { domainId: '2' }],
      },
    });
    const app = { _id: '1' };
    const wrapper = shallow(<AppItem app={app} />);
    expect(wrapper.find('.oaapp-item')).toHaveLength(1);
  });
});
