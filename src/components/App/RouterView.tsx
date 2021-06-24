import React from 'react';

import { Route } from 'react-router-dom';
import './RouterView.scss';
import Home from '../Home';
import OaLogin from '../Login/OaLogin';
import Landing from '../Landing';
import OakRoute from '../Auth/OakRoute';
import Unauthorized from '../Auth/Unauthorized';
import PlayToolbar from '../PlayToolbar';
import RealmLogin from '../Login/RealmLogin';
import RealmHome from '../RealmHome';
import RealmListing from '../ManageRealm/RealmListing';
import ClientListing from '../ManageClient/ClientListing';
import ClientrealmHome from '../ClientrealmHome';
import ClientrealmLogin from '../Login/ClientrealmLogin';
import RealmDetail from '../ManageRealm/RealmDetail';
import ClientDetail from '../ManageClient/ClientDetail';
import AccessControl from '../AccessControl';
import Member from '../AccessControl/Member';
import ClientPermission from '../ClientPermission';

interface Props {
  cookies: any;
}

const RouterView = (props: Props) => {
  return (
    <div className="router-view">
      <Route
        path="/login"
        render={(propsLocal) => (
          <OakRoute {...propsLocal} {...props} component={OaLogin} />
        )}
      />
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
        path="/realm/:realm/login"
        render={(propsLocal: any) => (
          <OakRoute {...propsLocal} {...props} component={RealmLogin} />
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
            middleware={['readAuthenticationRealm']}
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
            middleware={['readAuthenticationRealm']}
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
            middleware={['authenticateOa']}
          />
        )}
      />
      <Route
        path="/managerealm/:id"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={RealmDetail}
            middleware={['authenticateOa']}
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
            middleware={['authenticateOa']}
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
            middleware={['authenticateOa']}
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
            middleware={['authenticateOa']}
          />
        )}
      />

      {/* Clientrealm based routes */}
      <Route
        path="/clientrealm/:clientrealm/login"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            // logout={() => logout}
            component={ClientrealmLogin}
          />
        )}
      />
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
