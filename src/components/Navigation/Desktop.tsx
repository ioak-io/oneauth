import React, { useEffect, useState } from 'react';

import './style.scss';
import mirrorWhite from '../../images/ioak_white.svg';
import mirrorBlack from '../../images/ioak_black.svg';
import OaLinks from './OaLinks';
import SpaceLinks from './SpaceLinks';
import { Authorization, Profile } from '../Types/GeneralTypes';
// import SearchBar from '../Ux/SearchBar';
import { receiveMessage } from '../../events/MessageService';
import SearchBar from '../../oakui/SearchBar';
import OakButton from '../../oakui/OakButton';

interface Props {
  sendEvent: Function;
  getAuth: Function;
  addAuth: Function;
  removeAuth: Function;
  authorization: Authorization;
  getProfile: Function;
  toggleDarkMode: Function;
  profile: Profile;
  login: Function;
  transparent: boolean;
  logout: Function;
  toggleSettings: any;
  space: string;
}

const Desktop = (props: Props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    props.getProfile();
  }, []);

  useEffect(() => {
    receiveMessage().subscribe(message => {
      if (message.name === 'show-navbar-element') {
        setShowSearchBar(message.signal);
      }
    });
  }, []);

  const signin = type => {
    props.login(type);
  };

  return (
    <div
      className={
        props.transparent ? 'navbar desktop transparent' : 'navbar desktop'
      }
    >
      <div className="left">
        {!props.transparent && props.profile.theme === 'theme_light' && (
          <img className="logo" src={mirrorBlack} alt="Mirror logo" />
        )}
        {(props.transparent || props.profile.theme === 'theme_dark') && (
          <img className="logo" src={mirrorWhite} alt="Mirror logo" />
        )}
        {!props.space && (
          <OaLinks
            authorization={props.authorization}
            profile={props.profile}
          />
        )}
        {props.space && (
          <SpaceLinks
            authorization={props.authorization}
            profile={props.profile}
            space={props.space}
          />
        )}
        {showSearchBar && <SearchBar alt />}
      </div>
      <div className="right">
        <div className="action">
          {props.authorization.isAuth && (
            <OakButton
              theme="primary"
              variant="disabled"
              small
              action={props.logout}
            >
              <i className="material-icons">power_settings_new</i>Logout
            </OakButton>
          )}
          {!props.authorization.isAuth && (
            <OakButton
              theme="primary"
              variant="animate in"
              align="left"
              small
              action={() => signin('signin')}
            >
              <i className="material-icons">person</i>Login
            </OakButton>
          )}
          {!props.authorization.isAuth && (
            <OakButton
              theme="primary"
              variant="animate in"
              align="right"
              small
              action={() => signin('signup')}
            >
              <i className="material-icons">person_add</i>Signup
            </OakButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
