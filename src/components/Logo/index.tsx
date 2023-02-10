import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import oneauthWhite from '../../images/oneauth_white.svg';
import oneauthBlack from '../../images/oneauth_black.svg';

const Logo = () => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      {profile.theme === 'basicui-light' && (
        <img className="logo--image" src={oneauthWhite} alt="Oneauth logo" />
      )}
      {profile.theme !== 'basicui-light' && (
        <img className="logo--image" src={oneauthWhite} alt="Oneauth logo" />
      )}
    </div>
  );
};

export default Logo;
