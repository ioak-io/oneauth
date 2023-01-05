import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
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
import ReachInstance from '../ReachInstance';
import ProtectedRoute from '../ProtectedRoute';
import Landing from '../Landing';

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
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              middleware={['readAuthenticationOa']}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              middleware={['readAuthenticationOa']}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/landing"
          element={
            <ProtectedRoute
              middleware={[]}>
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/realm/:realm/login/:client_id"
          element={
            <ProtectedRoute
              middleware={['readRealm']} component={LoginPage} />
          }
        />
        <Route
          path="/managerealm"
          element={
            <ProtectedRoute middleware={['authenticate']} component={RealmListing} />
          }
        />
        <Route
          path="/managerealm/:realmId"
          element={
            <ProtectedRoute middleware={['authenticate']} component={RealmDetail} />
          }
        />
        {/* 
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
          path="/blog"
          exact
          render={(propsLocal) => (
            <OakRoute
              {...propsLocal}
              {...props}
              // logout={() => logout}
              component={ReachInstance}
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
        /> */}

        {/* <Route
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
        /> */}
      </Routes>
    </div>
  );
};

export default RouterView;
