import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './NavAccountIcon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      )}
      {!authorization.isAuth && <FontAwesomeIcon icon={faRightToBracket} />}
    </div>
  );
};

export default NavAccountIcon;
