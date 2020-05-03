import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { withCookies } from 'react-cookie';
import { getProfile, setProfile } from '../../actions/ProfileActions';

import './style.scss';
import Desktop from './Desktop';
import Mobile from './Mobile';

import { Authorization, Profile } from '../Types/GeneralTypes';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import { httpPost } from '../Lib/RestTemplate';

interface Props {
  sendEvent: Function;
  getAuth: Function;
  addAuth: Function;
  removeAuth: Function;
  authorization: Authorization;
  getProfile: Function;
  setProfile: Function;
  profile: Profile;
  login: Function;
  transparent: boolean;
  logout: Function;
  toggleSettings: any;
  history: any;
  cookies: any;
  location: any;
  match: any;
  isSpace: boolean;
  space: string;
}

const Navigation = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const [data, setData] = useState({
    visible: false,
    mobilemenu: 'hide',
    chooseTheme: false,
    showSettings: false,
    transparentNavBar: false,
    firstLoad: true,
  });

  useEffect(() => {
    props.getProfile();
  }, []);

  useEffect(() => {
    receiveMessage().subscribe(message => {
      if (message.name === 'navbar-transparency') {
        setData({ ...data, transparentNavBar: message.signal });
      }
      if (message.name === 'loggedin') {
        // props.reloadProfile(nextProps.authorization);
        setData({ ...data, firstLoad: false });
      }
    });
  }, []);

  useEffect(() => {
    if (data.firstLoad && props.authorization && props.authorization.isAuth) {
      setData({ ...data, firstLoad: false });
    }
  }, [props.authorization.isAuth]);

  const toggleDarkMode = () => {
    if (props.profile.theme === 'theme_dark') {
      props.setProfile({
        ...props.profile,
        theme: 'theme_light',
      });
    } else {
      props.setProfile({
        ...props.profile,
        theme: 'theme_dark',
      });
    }
  };

  const login = type => {
    if (props.isSpace) {
      props.history.push(`/space/${props.space}/login?type=${type}`);
    } else {
      props.history.push(`/login?type=${type}`);
    }
  };

  const logout = () => {
    let baseAuthUrl = '/auth';
    let authKey = props.cookies.get('oneauth');
    if (props.isSpace) {
      authKey = props.cookies.get(props.space);
      baseAuthUrl = `/auth/${props.space}`;
    }

    httpPost(`${baseAuthUrl}/session/${authKey}/invalidate`, null, null).then(
      (response: any) => {
        if (response.status === 200 || response.status === 404) {
          props.removeAuth();
          if (props.isSpace) {
            props.cookies.remove(props.space);
            props.history.push(`/space/${props.space}/home`);
            sendMessage('notification', true, {
              type: 'success',
              message: `Signed out of space ${props.space}`,
              duration: 3000,
            });
          } else {
            props.cookies.remove('oneauth');
            props.history.push(`/home`);
            sendMessage('notification', true, {
              type: 'success',
              message: `Signed out of oneauth`,
              duration: 3000,
            });
          }
        }
      }
    );
  };

  const toggleSettings = () => {
    setData({ ...data, showSettings: !data.showSettings });
  };

  return (
    <div className="nav">
      <Desktop
        {...props}
        logout={logout}
        login={login}
        toggleSettings={toggleSettings}
        transparent={data.transparentNavBar}
        toggleDarkMode={toggleDarkMode}
      />
      <Mobile
        {...props}
        logout={logout}
        login={login}
        toggleSettings={toggleSettings}
        transparent={data.transparentNavBar}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile, setProfile })(
  withCookies(withRouter(Navigation))
);
