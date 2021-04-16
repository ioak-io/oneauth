import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import './style.scss';

import { Profile } from '../Types/GeneralTypes';
import { receiveMessage, sendMessage } from '../../events/MessageService';

import Header from './Header';
import NavElements from './NavElements';
import OakNavGroup from '../../oakui/wc/OakNavGroup';
import OakNavElement from '../../oakui/wc/OakNavElement';

const Sidebar = () => {
  const [space, setSpace] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const history = useHistory();
  const location = useLocation();
  const authorization = useSelector((state) => state.authorization);

  const profile = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'spaceChange') {
        setSpace(event.data);
      }
    });
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const handleClick = (linkName: string) => {
    switch (linkName) {
      case 'home':
      case 'managespace':
      case 'manageapp':
        history.push(`/${linkName}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="sidebar">
      {/* <div className="sidebar--header">
        <Header />
      </div> */}
      <div className="sidebar--nav">
        <OakNavElement
          level={1}
          handleClick={() => handleClick('home')}
          active={currentPath.startsWith('/home')}
        >
          Home
        </OakNavElement>
        <OakNavElement
          level={1}
          handleClick={() => handleClick('managespace')}
          active={currentPath.startsWith('/managespace')}
        >
          Space
        </OakNavElement>
        <OakNavElement
          level={1}
          handleClick={() => handleClick('manageapp')}
          active={currentPath.startsWith('/manageapp')}
        >
          Application
        </OakNavElement>
      </div>
      {/* <div className="sidebar--nav mobile-only">
        <NavElements space={space} closeAfterRouteChange />
      </div> */}
    </div>
  );
};

export default Sidebar;
