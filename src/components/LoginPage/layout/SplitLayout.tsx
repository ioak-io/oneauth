import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import './SplitLayout.scss';
import oneauthWhite from '../../../images/oneauth_white.svg';
import oneauthBlack from '../../../images/oneauth_black.svg';
import LoginFormContainer from '../form/LoginFormContainer';

const queryString = require('query-string');

interface Props {
  cookies: any;
  history: any;
  match: any;
  location: any;
  realm: number;
  currentRealm: any;
}

const SplitLayout = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  useEffect(() => {
    if (props.currentRealm) {
      const el = document.getElementById('image-container');
      if (el) {
        el.style.background = `url('${props.currentRealm.site?.background}') no-repeat center center`;
        el.style.backgroundSize = 'cover';
      }
    }
  }, [props.currentRealm]);

  return (
    <div className="split-layout">
      <div className="split-layout__side" id="image-container" />
      <div className="split-layout__main">
        <div className="overlay">
          <div className="split-layout__main__header">
            {/* <img className="logo" src={oneauthBlack} alt="Oneauth logo" /> */}
          </div>
          <div className="content smooth-page">
            <div className="content__container">
              <img className="logo" src={oneauthBlack} alt="Oneauth logo" />
              {/* {props.profile.theme === 'theme_dark' && (
                <img className="logo" src={oneauthWhite} alt="Oneauth logo" />
              )} */}

              <LoginFormContainer
                cookies={props.cookies}
                history={props.history}
                location={props.location}
                match={props.match}
                realm={props.realm}
                currentRealm={props.currentRealm}
                background="light"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;
