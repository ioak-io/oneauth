import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import oneauthWhite from '../../images/oneauth_white.svg';
import oneauthBlack from '../../images/oneauth_black.svg';
import OaLinks from './OaLinks';
import SpaceLinks from './SpaceLinks';
import { Authorization, Profile } from '../Types/GeneralTypes';
// import SearchBar from '../Ux/SearchBar';
import { receiveMessage } from '../../events/MessageService';
import SearchBar from '../../oakui/SearchBar';
import OakButton from '../../oakui/OakButton';
import OakAvatar from '../../oakui/OakAvatar';
import OakPopoverMenu from '../../oakui/OakPopoverMenu';

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
  editProfile: Function;
}

const Desktop = (props: Props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const authorization = useSelector(state => state.authorization);
  const [userProfileActions, setUserProfileActions] = useState<any[] | []>([]);

  useEffect(() => {
    if (authorization.isAuth) {
      setUserProfileActions([
        {
          label: 'Profile settings',
          action: props.editProfile,
          icon: 'settings',
        },
        {
          label: 'Sign out',
          action: props.logout,
          icon: 'exit_to_app',
        },
      ]);
    } else {
      console.log(props.space);
      setUserProfileActions([
        {
          label: 'Sign in',
          action: () => signin('signin'),
          icon: 'person',
        },
        {
          label: 'Sign up',
          action: () => signin('signup'),
          icon: 'person_add',
        },
      ]);
    }
  }, [authorization.isAuth, props.space]);

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
          <img className="logo" src={oneauthBlack} alt="Oneauth logo" />
        )}
        {(props.transparent || props.profile.theme === 'theme_dark') && (
          <img className="logo" src={oneauthWhite} alt="Oneauth logo" />
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
      </div>
      <div className="right">
        <div className="action">
          <OakPopoverMenu elements={userProfileActions} theme="primary" right>
            <div slot="label" className="action-item">
              {authorization?.isAuth && (
                <OakAvatar
                  firstName={authorization?.firstName}
                  lastName={authorization?.lastName}
                />
              )}
              {!authorization?.isAuth && (
                <i className="material-icons">person</i>
              )}
            </div>
          </OakPopoverMenu>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
