import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';

import './style.scss';

import { receiveMessage, sendMessage } from '../../events/MessageService';

import OakNavElement from '../../oakui/wc/OakNavElement';

const Sidebar = () => {
  const [realm, setRealm] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const history = useNavigate();
  const location = useLocation();
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'realmChange') {
        setRealm(event.data);
      }
    });
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const handleClick = (linkName: string) => {
    switch (linkName) {
      case 'home':
      case 'managerealm':
      case 'manageclient':
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
          handleClick={() => handleClick('managerealm')}
          active={currentPath.startsWith('/managerealm')}
        >
          Realm
        </OakNavElement>
        <OakNavElement
          level={1}
          handleClick={() => handleClick('manageclient')}
          active={currentPath.startsWith('/manageclient')}
        >
          Application
        </OakNavElement>
      </div>
      {/* <div className="sidebar--nav mobile-only">
        <NavElements realm={realm} closeAfterRouteChange />
      </div> */}
    </div>
  );
};

export default Sidebar;
