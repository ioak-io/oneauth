import React from 'react';

import { Route } from 'react-router-dom';
import './RouterView.scss';
import Home from '../Home';
import OaLogin from '../Login/OaLogin';
import Landing from '../Landing';
import OakRoute from '../Auth/OakRoute';
import Unauthorized from '../Auth/Unauthorized';
import PlayToolbar from '../PlayToolbar';
import SpaceLogin from '../Login/SpaceLogin';
import SpaceHome from '../SpaceHome';
import SpaceListing from '../ManageSpace/SpaceListing';
import AppListing from '../ManageApp/AppListing';
import AppspaceHome from '../AppspaceHome';
import AppspaceLogin from '../Login/AppspaceLogin';
import SpaceDetail from '../ManageSpace/SpaceDetail';
import AppDetail from '../ManageApp/AppDetail';
import AccessControl from '../AccessControl';
import Member from '../AccessControl/Member';
import AppPermission from '../AppPermission';

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
      {/* Space based routes */}
      <Route
        path="/space/:space/login"
        render={(propsLocal: any) => (
          <OakRoute {...propsLocal} {...props} component={SpaceLogin} />
        )}
      />
      <Route
        exact
        path="/space/:space/home"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={SpaceHome}
            middleware={['readAuthenticationSpace']}
          />
        )}
      />
      <Route
        exact
        path="/space/:space"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={SpaceHome}
            middleware={['readAuthenticationSpace']}
          />
        )}
      />
      <Route
        path="/space/:space/unauthorized"
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
        path="/managespace"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={SpaceListing}
            middleware={['authenticateOa']}
          />
        )}
      />
      <Route
        path="/managespace/:id"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={SpaceDetail}
            middleware={['authenticateOa']}
          />
        )}
      />
      <Route
        path="/manageapp"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            // logout={() => logout}
            component={AppListing}
            middleware={['authenticateOa']}
          />
        )}
      />
      <Route
        path="/manageapp/:id"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={AppDetail}
            middleware={['authenticateOa']}
          />
        )}
      />
      <Route
        path="/manageapp/:id/permission/:userId"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={AppPermission}
            middleware={['authenticateOa']}
          />
        )}
      />

      {/* Appspace based routes */}
      <Route
        path="/appspace/:appspace/login"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            // logout={() => logout}
            component={AppspaceLogin}
          />
        )}
      />
      <Route
        exact
        path="/appspace/:appspace/home"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            //  logout={() => logout}
            component={AppspaceHome}
            middleware={['readAuthenticationAppspace']}
          />
        )}
      />
      <Route
        exact
        path="/appspace/:appspace"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={AppspaceHome}
            middleware={['readAuthenticationAppspace']}
          />
        )}
      />
    </div>
  );
};

export default RouterView;
