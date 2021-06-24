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
import AppListing from '../ManageApp/AppListing';
import ApprealmHome from '../ApprealmHome';
import ApprealmLogin from '../Login/ApprealmLogin';
import RealmDetail from '../ManageRealm/RealmDetail';
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

      {/* Apprealm based routes */}
      <Route
        path="/apprealm/:apprealm/login"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            // logout={() => logout}
            component={ApprealmLogin}
          />
        )}
      />
      <Route
        exact
        path="/apprealm/:apprealm/home"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            //  logout={() => logout}
            component={ApprealmHome}
            middleware={['readAuthenticationApprealm']}
          />
        )}
      />
      <Route
        exact
        path="/apprealm/:apprealm"
        render={(propsLocal: any) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={ApprealmHome}
            middleware={['readAuthenticationApprealm']}
          />
        )}
      />
    </div>
  );
};

export default RouterView;
