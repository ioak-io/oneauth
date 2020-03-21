import React from 'react';
import './style.scss';
import Navigation from '../Navigation';
import OakButton from '../../oakui/OakButton';

interface Props {
  label?: string;
  logout: Function;
}
const ManageSpace = (props: Props) => {
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
        </div>
      </div>
    </div>
  );
};

export default ManageSpace;
