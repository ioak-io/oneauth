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
import { loginPageSubject } from '../../events/LoginPageEvent';
import ReachInstance from '../ReachInstance';
import ProtectedRoute from '../ProtectedRoute';
import Landing from '../Landing';
import LoginPage from '../Page/LoginPage';

interface Props {
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
          path="/login"
          element={
            <ProtectedRoute
              middleware={['']}>
              <LoginPage />
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
        <Route
          path="/manageclient"
          element={
            <ProtectedRoute middleware={['authenticate']} component={ClientListing} />
          }
        />
        <Route
          path="/manageclient/:id"
          element={
            <ProtectedRoute middleware={['authenticate']} component={ClientDetail} />
          }
        />
        <Route
          path="/manageclient/:id/permission/:userId"
          element={
            <ProtectedRoute middleware={['authenticate']} component={ClientPermission} />
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute middleware={['authenticate']} component={ReachInstance} />
          }
        />

        <Route
          path="/realm/:realm/home"
          element={
            <ProtectedRoute middleware={['readAuthentication']} component={RealmHome} />
          }
        />
        <Route
          path="/realm/:realm"
          element={
            <ProtectedRoute middleware={['readAuthentication']} component={RealmHome} />
          }
        />
        <Route
          path="/realm/:realm/unauthorized"
          element={
            <ProtectedRoute middleware={['isAuthenticated']} component={Unauthorized} />
          }
        />

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
