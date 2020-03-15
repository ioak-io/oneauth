import * as React from 'react';
import { shallow } from 'enzyme';

import OakPagination from './OakPagination';

// jest.spyOn(React, 'useEffect').mockImplementation(f => f());

describe('pagination component interaction', () => {
  let mockChangeHandlerFunction;
  beforeEach(() => {
    mockChangeHandlerFunction = jest.fn();
  });

  it('should load when initialized', () => {
    const wrapper = shallow(
      <OakPagination totalRows={10} onChangePage={mockChangeHandlerFunction} />
    );
    expect(wrapper.find('.oak-pagination')).toHaveLength(1);
  });

  //   it('should invoke oage change handler function when next page navigation is clicked', () => {
  //     const wrapper = shallow(
  //       <OakPagination totalRows={100} onChangePage={mockChangeHandlerFunction} />
  //     );
  //     wrapper.find('[data-test="action-page-next"]').simulate('click');
  //     expect(mockChangeHandlerFunction).toBeCalledTimes(1);
  //   });
});
