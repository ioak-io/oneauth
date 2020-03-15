import * as React from 'react';
import { shallow } from 'enzyme';

import OakTable from './OakTable';

describe('table component interaction', () => {
  it('should load when initialized', () => {
    const wrapper = shallow(<OakTable header={[]} data={[]} />);
    expect(wrapper.find('.oak-table')).toHaveLength(1);
  });
  it('should show in material style when material is set as true', () => {
    const wrapper = shallow(<OakTable header={[]} data={[]} material />);
    expect(wrapper.find('.oak-table').hasClass('material')).toBe(true);
  });
  it('should not show in material style when material is set as false', () => {
    const wrapper = shallow(<OakTable header={[]} data={[]} />);
    expect(wrapper.find('.oak-table').hasClass('material')).toBe(false);
  });
});
