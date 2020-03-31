import React from 'react';
import './style.scss';
import Navigation from '../Navigation';
import OakButton from '../../oakui/OakButton';
import OakPopoverMenu from '../../oakui/OakPopoverMenu';

interface Props {
  label?: string;
  logout: Function;
}
const ManageSpace = (props: Props) => {
  const action = () => {
    console.log('action clicked');
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
        </div>
      </div>
    </div>
  );
};

export default ManageSpace;
