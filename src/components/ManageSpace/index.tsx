import React, { useState, useEffect } from 'react';
import './style.scss';
import Navigation from '../Navigation';
import OakButton from '../../oakui/OakButton';
import OakPopoverMenu from '../../oakui/OakPopoverMenu';
import OakAutoComplete from '../../oakui/OakAutoComplete';

interface Props {
  label?: string;
  logout: Function;
}
const ManageSpace = (props: Props) => {
  const [data, setData] = useState({
    autoCompleteDropdownData: [
      { key: 'one', value: 'one odfdf value' },
      { key: 'two', value: 'two value' },
      { key: 'three', value: 'three value' },
      { key: 'four', value: 'four value' },
      { key: 'one1', value: 'one value' },
      { key: 'two2', value: 'two value' },
      { key: 'three3', value: 'three value' },
      { key: 'four4', value: 'four value' },
      { key: 'one9', value: 'one value' },
      { key: 'two9', value: 'two value' },
      { key: 'thre9', value: 'three value' },
      { key: 'fou9r', value: 'four value' },
      { key: 'one0', value: 'one value' },
      { key: 't0wo', value: 'two value' },
      { key: 'thr0ee', value: 'three value' },
      { key: 'fou0r', value: 'four value' },
    ],
  });
  const action = () => {
    console.log('action clicked');
  };
  const handleAutoCompleteChange = (value: string) => {
    console.log(value);
  };
  return (
    <div className="app-page">
      <div>
        <Navigation {...props} logout={props.logout} />
      </div>
      <div className="app-container">
        <div className="home">
          <div className="typography-2">Manage space</div>
          <div className="typography-5">Content</div>
          <div>
            <OakButton theme="primary" variant="animate in" icon="add">
              Create
            </OakButton>
          </div>
          <div className="popover-test space-top-4">
            <OakPopoverMenu
              label="dropout menu zsdcsa sd "
              id="popover-test"
              theme="primary"
              elements={[
                {
                  label: 'Task',
                  action,
                  icon: 'library_add_check',
                },
                {
                  label: 'Project',
                  action,
                  icon: 'apps',
                },
                {
                  label: 'Team',
                  action,
                  icon: 'people_alt',
                },
                {
                  label: 'Stage / Lane',
                  action,
                  icon: 'vertical_split',
                },
              ]}
              iconLeft="playlist_add"
              labelVariant="on"
              right
              mobilize
            />
          </div>
          <div className="autocomplete-test">
            <OakAutoComplete
              data={data}
              label="auto complete search"
              id="criteria"
              handleChange={handleAutoCompleteChange}
              objects={data.autoCompleteDropdownData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSpace;
