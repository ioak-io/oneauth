import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import './FullLayout.scss';
import oneauthWhite from '../../../images/oneauth_white.svg';
import oneauthBlack from '../../../images/oneauth_black.svg';
import LoginFormContainer from '../form/LoginFormContainer';

const queryString = require('query-string');

interface Props {
  clientId: string;
  realm: number;
  currentRealm: any;
  currentClient: any;
}

const FullLayout = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [background, setBackground] =
    useState<'image' | 'light' | 'dark'>('light');

  useEffect(() => {
    if (props.currentRealm) {
      const el = document.getElementById('full-layout-image-container');
      let _background: any = 'light';
      if (el && props.currentRealm.site?.background) {
        el.style.background = `url('${props.currentRealm.site?.background}') no-repeat center center`;
        el.style.backgroundSize = 'cover';
        _background = 'image';
      }
      setBackground(_background);
    }
  }, [props.currentRealm]);

  return (
    <div className="full-layout" id="full-layout-image-container">
      <div
        className={background === 'image' ? 'overlay overlay-image' : 'overlay'}
      >
        <div className="full-layout__header">
          {/* <img className="logo" src={oneauthBlack} alt="Oneauth logo" /> */}
        </div>
        <div className="content smooth-page">
          <div className="content__container">
            <img
              className="logo"
              src={props.currentRealm.site.logo || oneauthWhite}
              alt="Oneauth logo"
            />
            {/* {props.profile.theme === 'theme_dark' && (
                <img className="logo" src={oneauthWhite} alt="Oneauth logo" />
              )} */}

            {props.currentRealm && (
              <LoginFormContainer
                realm={props.realm}
                clientId={props.clientId}
                background={background}
                currentRealm={props.currentRealm}
                currentClient={props.currentClient}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullLayout;