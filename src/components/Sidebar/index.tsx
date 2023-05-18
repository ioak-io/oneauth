import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import './style.scss';

import { Profile } from '../Types/GeneralTypes';
import { receiveMessage, sendMessage } from '../../events/MessageService';

import Header from './Header';
import NavElements from './NavElements';

const Sidebar = () => {
  const [space, setSpace] = useState('');
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'spaceChange') {
        setSpace(event.data);
      }
    });
  }, []);

  return (
    <div className="sidebar">
      {/* <div className="sidebar--header">
        <Header />
      </div> */}
      <div className="sidebar--nav desktop-only">
        <NavElements space={space} />
      </div>
      <div className="sidebar--nav mobile-only">
        <NavElements space={space} closeAfterRouteChange />
      </div>
    </div>
  );
};

export default Sidebar;
