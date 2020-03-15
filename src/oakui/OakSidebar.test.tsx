import * as React from 'react';
import { shallow } from 'enzyme';

import OakSidebar from './OakSidebar';

// jest.spyOn(React, 'useEffect').mockImplementation(f => f());

describe('sidebar component interaction', () => {
  it('should load when initialized', () => {
    const wrapper = shallow(<OakSidebar label="test label" icon="open" />);
    expect(wrapper.find('.oak-sidebar')).toHaveLength(1);
  });

  //   it('should show content when in expanded state', () => {
  //     const wrapper = shallow(
  //       <OakSidebar label="test label" icon="open" show={false} />
  //     );
  //     const contentHolder = wrapper.find('[data-test="content-holder"]');
  //     console.log(contentHolder.html());
  //     expect(contentHolder.hasClass('content')).toBeTruthy();
  //     expect(contentHolder.hasClass('show')).toBeTruthy();
  //   });
});
