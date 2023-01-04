import { MenuOpen } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import { getProfile, setProfile } from '../../store/actions/ProfileActions';
import './ExpandIcon.scss';

interface Props {
  controls: 'left' | 'right';
}

const ExpandIcon = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    switch (props.controls) {
      case 'left':
        dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
        break;
      case 'right':
        dispatch(
          setProfile({ ...profile, rightSidebar: !profile.rightSidebar })
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="expand-icon">
      <MenuOpen
        className={
          profile.sidebar
            ? 'menu-icon sidebar-shown'
            : 'menu-icon sidebar-hidden'
        }
        onClick={toggleSidebar}
      />
    </div>
  );
};

export default ExpandIcon;
