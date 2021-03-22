import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';

import Chart from 'chart.js';

import './style.scss';
import { withCookies } from 'react-cookie';

import Notification from '../Notification';
import { fetchAllSpaces } from '../../actions/SpaceActions';
import Init from './Init';
import { fetchAllAssets } from '../../actions/AssetActions';
import TopbarContainer from './TopbarContainer';
import SidebarContainer from './SidebarContainer';
import BodyContainer from './BodyContainer';
import { receiveMessage } from '../../events/MessageService';
import OakNotification from '../../oakui/wc/OakNotification';
import OakAppLayout from '../../oakui/wc/OakAppLayout';
import { setProfile } from '../../actions/ProfileActions';

interface Props {
  cookies: any;
}

const Content = (props: Props) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [usingMouse, setUsingMouse] = useState(false);

  useEffect(() => {
    receiveMessage().subscribe((message) => {
      if (message.name === 'usingMouse') {
        setUsingMouse(message.signal);
      }
    });

    dispatch(fetchAllSpaces());
    dispatch(fetchAllAssets());
  }, []);

  useEffect(() => {
    Chart.defaults.global.defaultFontColor =
      profile.theme === 'theme_dark' ? '#e0e0e0' : '#626262';
  }, [profile]);

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
      className={`App ${profile.theme} ${profile.textSize} ${
        profile.themeColor
      } ${usingMouse ? 'using-mouse' : ''}`}
    >
      <HashRouter>
        <Init />
        {/* <Notification /> */}
        <OakNotification
          indicator="fill"
          outlined
          rounded
          // paddingVertical={10}
          elevation={5}
          displayCount={5}
        />

        <OakAppLayout
          topbarVariant="static"
          sidebarVariant="side"
          topbarElevation={2}
          sidebarElevation={2}
        >
          <div slot="sidebar">
            <SidebarContainer />
          </div>
          <div slot="topbar">
            <TopbarContainer cookies={props.cookies} />
          </div>
          <div slot="toolbar">
            <TopbarContainer cookies={props.cookies} />
          </div>
          <div slot="main">
            <BodyContainer {...props} />
          </div>
        </OakAppLayout>
      </HashRouter>
    </div>
  );
};

export default withCookies(Content);
