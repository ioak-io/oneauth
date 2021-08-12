import React, { useEffect, useState } from 'react';

import { Route } from 'react-router-dom';
import './RouterView.scss';
import Home from '../Home';
import OakRoute from '../Auth/OakRoute';
import Unauthorized from '../Auth/Unauthorized';
import RealmHome from '../RealmHome';
import RealmListing from '../ManageRealm/RealmListing';
import ClientListing from '../ManageClient/ClientListing';
import ClientrealmHome from '../ClientrealmHome';
import RealmDetail from '../ManageRealm/RealmDetail';
import ClientDetail from '../ManageClient/ClientDetail';
import ClientPermission from '../ClientPermission';
import LoginPage from '../LoginPage';
import { loginPageSubject } from '../../events/LoginPageEvent';

interface Props {
  cookies: any;
}

const RouterView = (props: Props) => {
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
    loginPageSubject.subscribe((message) => {
      setLoginPage(message.state);
    });
  }, []);

  return (
    <div
      className={`router-view ${loginPage ? 'login-page' : 'not-login-page'}`}
    >
      <Route
        path="/"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={Home}
            middleware={['readAuthenticationOa']}
          />
        )}
      />
      <Route
        path="/home"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={Home}
            middleware={['readAuthenticationOa']}
          />
        )}
      />
      {/* Realm based routes */}
      <Route
        path="/realm/:realm/login/:client_id"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={LoginPage}
            middleware={['readRealm']}
          />
        )}
      />
      <Route
        exact
        path="/realm/:realm/home"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={RealmHome}
            middleware={['readAuthentication']}
          />
        )}
      />
      <Route
        exact
        path="/realm/:realm"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={RealmHome}
            middleware={['readAuthentication']}
          />
        )}
      />
      <Route
        path="/realm/:realm/unauthorized"
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={Unauthorized}
            middleware={['isAuthenticated']}
          />
        )}
      />
      <Route
        path="/managerealm"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={RealmListing}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/managerealm/:realmId"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={RealmDetail}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/manageclient"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            // logout={() => logout}
            component={ClientListing}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/manageclient/:id"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={ClientDetail}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/manageclient/:id/permission/:userId"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={ClientPermission}
            middleware={['authenticate']}
          />
        )}
      />

      {/* Clientrealm based routes */}
      {/* <Route
        path="/clientrealm/:clientrealm/login"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            // logout={() => logout}
            component={ClientrealmLogin}
          />
        )}
      /> */}
      <Route
        exact
        path="/clientrealm/:clientrealm/home"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            //  logout={() => logout}
            component={ClientrealmHome}
            middleware={['readAuthenticationClientrealm']}
          />
        )}
      />
      <Route
        exact
        path="/clientrealm/:clientrealm"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={ClientrealmHome}
            middleware={['readAuthenticationClientrealm']}
          />
        )}
      />
    </div>
  );
};

export default RouterView;
