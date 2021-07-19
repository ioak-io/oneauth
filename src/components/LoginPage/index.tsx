import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { currentRealmEventSubject } from '../../events/CurrentRealmEvent';
import FullLayout from './layout/FullLayout';
import SplitLayout from './layout/SplitLayout';
import { getClient } from './service';

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
  const [currentClient, setCurrentClient] = useState<any>(null);
  const [queryParam, setQueryParam] = useState<any>();
  const [isClientCheckFinished, setIsClientCheckFinished] = useState(false);

  useEffect(() => {
    currentRealmEventSubject.asObservable().subscribe((message) => {
      setCurrentRealm(message);
    });
  }, []);

  // useEffect(() => {
  //   if (props.location.search) {
  //     const query = queryString.parse(props.location.search);
  //     setQueryParam({ ...query });
  //   }
  // }, [props.location.search]);

  useEffect(() => {
    getClient(props.match.params.client_id).then((data) => {
      if (data) {
        setCurrentClient(data);
      }
      setIsClientCheckFinished(true);
    });
  }, []);

  return (
    <div className="login-page">
      {isClientCheckFinished &&
        currentRealm?.realm === props.realm &&
        currentRealm?.site?.layout === 'split' && (
          <SplitLayout
            cookies={props.cookies}
            history={props.history}
            location={props.location}
            match={props.match}
            realm={props.realm}
            currentRealm={currentRealm}
            currentClient={currentClient}
          />
        )}
      {isClientCheckFinished &&
        currentRealm?.realm === props.realm &&
        currentRealm?.site?.layout === 'full' && (
          <FullLayout
            cookies={props.cookies}
            history={props.history}
            location={props.location}
            match={props.match}
            realm={props.realm}
            currentRealm={currentRealm}
            currentClient={currentClient}
          />
        )}
    </div>
  );
};

export default LoginPage;
