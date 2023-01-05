import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { currentRealmEventSubject } from '../../events/CurrentRealmEvent';
import FullLayout from './layout/FullLayout';
import SplitLayout from './layout/SplitLayout';
import { getClient } from './service';

const queryString = require('query-string');

interface Props {
  realm: number;
  client_id: string;
}

const LoginPage = (props: Props) => {
  const [currentRealm, setCurrentRealm] = useState<any>(null);
  const [currentClient, setCurrentClient] = useState<any>(null);
  const [queryParam, setQueryParam] = useState<any>();
  const [isClientCheckFinished, setIsClientCheckFinished] = useState(false);

  useEffect(() => {
    currentRealmEventSubject.asObservable().subscribe((message) => {
      console.log(message);
      setCurrentRealm(message);
    });
  }, []);

  useEffect(() => {
    getClient(props.client_id).then((data) => {
      if (data) {
        setCurrentClient(data);
      }
      setIsClientCheckFinished(true);
    });
  }, []);

  return (
    <div className="login-page">
      {typeof currentRealm?.realm}
      {typeof props.realm}
      {isClientCheckFinished &&
        currentRealm?.realm?.toString() === props.realm &&
        currentRealm?.site?.layout === 'split' && (
          <SplitLayout
            realm={props.realm}
            currentRealm={currentRealm}
            currentClient={currentClient}
          />
        )}
      {isClientCheckFinished &&
        currentRealm?.realm?.toString() === props.realm &&
        currentRealm?.site?.layout === 'full' && (
          <FullLayout
            realm={props.realm}
            currentRealm={currentRealm}
            currentClient={currentClient}
          />
        )}
    </div>
  );
};

export default LoginPage;
