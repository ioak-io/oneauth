import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, BrowserRouter, HashRouter } from 'react-router-dom';
import Home from '../Home';
import Landing from '../Landing';
import Init from './Init';

import TopbarContainer from './TopbarContainer';
import BodyContainer from './BodyContainer';
import { loginPageSubject } from '../../events/LoginPageEvent';
import { setProfile } from '../../store/actions/ProfileActions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

interface Props {
}

const Content = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const [usingMouse, setUsingMouse] = useState(false);
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
    // receiveMessage().subscribe((message) => {
    //   if (message.name === 'usingMouse') {
    //     setUsingMouse(message.signal);
    //   }
    // });

    loginPageSubject.subscribe((message) => {
      setLoginPage(message.state);
    });
  }, []);

  // useEffect(() => {
  //   Chart.defaults.global.defaultFontColor =
  //     profile.theme === 'basicui-dark' ? '#181818' : '#626262';
  // }, [profile]);

  const handleClose = (detail: any) => {
    switch (detail.name) {
      case 'left':
        dispatch(setProfile({ ...profile, sidebar: !detail.value }));
        break;
      case 'right':
        dispatch(setProfile({ ...profile, rightSidebar: !detail.value }));
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`App ${profile.theme} ${profile.textSize} ${profile.themeColor
        } ${usingMouse ? 'using-mouse' : ''}`}
    >
      <HashRouter>
        <Init />
        {/* <Notification /> */}
        {/* <OakNotification
          indicator="fill"
          outlined
          rounded
          // paddingVertical={10}
          elevation={5}
          displayCount={5}
        /> */}
        <TopbarContainer />
        <BodyContainer {...props} />
      </HashRouter>
    </div>
  );
};

export default Content;
