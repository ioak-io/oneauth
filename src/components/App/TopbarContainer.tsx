import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './TopbarContainer.scss';
import Topbar from '../Topbar';
import { receiveMessage } from '../../events/MessageService';

interface Props {
}

const TopbarContainer = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);
  const [realm, setRealm] = useState('');

  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'realmChange') {
        setRealm(event.data);
      }
    });
  }, []);

  return (
    <div
      className={`topbar-container ${
        profile.sidebar ? 'sidebar-shown' : 'sidebar-hidden'
      }`}
    >
      <Topbar
        realm={realm}
        hideSidebarOnDesktop={profile.hideSidebarOnDesktop}
      />
    </div>
  );
};

export default TopbarContainer;
