import { Fingerprint, PowerSettingsNew } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';
import { receiveMessage } from '../../events/MessageService';
import { removeAuth } from '../../actions/AuthActions';
import './NavAccountIcon.scss';

interface Props {
  cookies: any;
}

const NavAccountIcon = (props: Props) => {
  const [realm, setRealm] = useState(100);
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'realmChange') {
        setRealm(event.data);
      }
    });
  }, []);

  const handleClick = () => {
    if (authorization.isAuth) {
      props.cookies.remove(`${authorization.realm}-refresh_token`);
      props.cookies.remove(`${authorization.realm}-access_token`);
      dispatch(removeAuth());
      authorization.realm === 100
        ? history.push('/')
        : history.push(`/realm/${authorization.realm}/home`);
    } else {
      history.push(`/realm/100/login/oneauth`);
    }
  };

  return (
    <div className={`nav-account-icon ${profile.theme}`} onClick={handleClick}>
      {authorization.isAuth && (
        <div className="nav-account-icon--username">
          <div>{authorization.name}</div>
          <PowerSettingsNew className="cursor-pointer" />
        </div>
      )}
      {!authorization.isAuth && <Fingerprint className="cursor-pointer" />}
    </div>
  );
};

export default NavAccountIcon;
