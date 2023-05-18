import { Fingerprint, PowerSettingsNew } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './NavAccountIcon.scss';

interface Props {
  logout: any;
  login: any;
}

const NavAccountIcon = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  return (
    <div
      className={`nav-account-icon ${profile.theme}`}
      onClick={authorization.isAuth ? props.logout : props.login}
    >
      {authorization.isAuth && (
        <div className="nav-account-icon--username">
          <div>{`${authorization.given_name} ${authorization.family_name}`}</div>
          <PowerSettingsNew className="cursor-pointer" />
        </div>
      )}
      {!authorization.isAuth && <Fingerprint className="cursor-pointer" />}
    </div>
  );
};

export default NavAccountIcon;
