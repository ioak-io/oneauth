import * as React from 'react';
import { shallow } from 'enzyme';

import OakView from './OakView';

describe('view component interaction', () => {
  it('should load when initialized', () => {
    const wrapper = shallow(<OakView />);
    expect(wrapper.find('[data-test="oak-view-root"]')).toHaveLength(1);
  });
  it('should render children elements when children are specified', () => {
    const wrapper = shallow(<OakView>test child</OakView>);
    expect(wrapper.find('[data-test="oak-view-root"]').text()).toBe(
      'test child'
    );
  });
});
