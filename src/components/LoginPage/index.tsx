import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { currentRealmEventSubject } from '../../events/CurrentRealmEvent';
import FullLayout from './layout/FullLayout';
import SplitLayout from './layout/SplitLayout';

const queryString = require('query-string');

interface Props {
  cookies: any;
  history: any;
  match: any;
  location: any;
  realm: number;
}

const LoginPage = (props: Props) => {
  const [currentRealm, setCurrentRealm] = useState<any>(null);

  useEffect(() => {
    currentRealmEventSubject.asObservable().subscribe((message) => {
      setCurrentRealm(message);
    });
  }, []);

  return (
    <div className="login-page">
      {currentRealm?.realm === props.realm &&
        currentRealm?.site?.layout === 'split' && (
          <SplitLayout
            cookies={props.cookies}
            history={props.history}
            location={props.location}
            match={props.match}
            realm={props.realm}
            currentRealm={currentRealm}
          />
        )}
      {currentRealm?.realm === props.realm &&
        currentRealm?.site?.layout === 'full' && (
          <FullLayout
            cookies={props.cookies}
            history={props.history}
            location={props.location}
            match={props.match}
            realm={props.realm}
            currentRealm={currentRealm}
          />
        )}
    </div>
  );
};

export default LoginPage;
