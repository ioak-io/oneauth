import React from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import oneauthWhiteSmall from '../../images/oneauth_white_small.svg';
import oneauthWhiteText from '../../images/oneauth_white.svg';
import oneauthBlackSmall from '../../images/oneauth_black_small.svg';
import oneauthBlackText from '../../images/oneauth_black.svg';
import oneauthBlack from '../../images/oneauth_black.svg';

interface Props {
  variant: 'full' | 'short';
}

const Logo = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      <div className="logo--image">
        {profile.theme === 'basicui-light' && (
          <img src={oneauthBlackSmall} alt="Oneauth logo" />
        )}
        {profile.theme === 'basicui-dark' && (
          <img src={oneauthWhiteSmall} alt="Oneauth logo" />
        )}
      </div>
      {props.variant === 'full' && (
        <div className="logo--text">
          {profile.theme === 'basicui-light' && (
            <img src={oneauthBlackText} alt="Oneauth logo" />
          )}
          {profile.theme === 'basicui-dark' && (
            <img src={oneauthWhiteText} alt="Oneauth logo" />
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
