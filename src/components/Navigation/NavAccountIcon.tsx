import { Fingerprint, PowerSettingsNew } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import {
  useNavigate,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';
import { removeSessionValue } from '../../utils/SessionUtils';
import { receiveMessage } from '../../events/MessageService';
import { removeAuth } from '../../store/actions/AuthActions';
import './NavAccountIcon.scss';

interface Props {
}

const NavAccountIcon = (props: Props) => {
  const [realm, setRealm] = useState(100);
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'realmChange') {
        setRealm(event.data);
      }
    });
  }, []);

  const onClick = () => {
    if (authorization.isAuth) {
      removeSessionValue(`${authorization.realm}-refresh_token`);
      removeSessionValue(`${authorization.realm}-access_token`);
      dispatch(removeAuth());
      authorization.realm === 100
        ? history('/')
        : history(`/realm/${authorization.realm}/home`);
    } else {
      history(`/realm/100/login/oneauth`);
    }
  };

  return (
    <div className={`nav-account-icon ${profile.theme}`} onClick={onClick}>
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
