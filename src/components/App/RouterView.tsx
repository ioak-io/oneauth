import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import './RouterView.scss';
import Home from '../Home';
import { loginPageSubject } from '../../events/LoginPageEvent';
import ProtectedRouteApp from '../ProtectedRouteApp';
import LandingPage from '../Page/LandingPage';
import OaLogin from '../Auth/OaLogin';
import UnauthorizedPage from '../Page/UnauthorizedPage';
import Permissions from '../Page/SettingsPage/Permissions';
import BackupAndRestore from '../Page/SettingsPage/BackupAndRestore';
import LoginPage from '../Page/LoginPage';
import EditRealmPage from '../Page/EditRealmPage';
import EditRealm from '../Page/SettingsPage/EditRealm';
import ApiAccessPage from '../Page/ApiAccessPage';
import RolePage from '../Page/RolePage';
import UserListPage from '../Page/UserListPage';
import AttributedefPage from '../Page/AttributedefPage';

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
      className={`router-view ${loginPage ? 'on-login-page' : 'not-on-login-page'}`}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={LandingPage} />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={LandingPage} />
          }
        />
        <Route
          path="/create-realm"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={EditRealmPage} />
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRouteApp
              middleware={[]} component={LoginPage} />}
        />
        <Route
          path="/:space/unauthorized"
          element={
            <ProtectedRouteApp
              middleware={['isAuthenticated']} component={UnauthorizedPage} />}
        />
        <Route
          path="/:space/home"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={EditRealm} />}
        />
        <Route
          path="/:space/edit-realm"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={EditRealm} />}
        />
        <Route
          path="/:space/apitoken"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={ApiAccessPage} />}
        />
        <Route
          path="/:space/custom-attributes"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={AttributedefPage} />}
        />
        <Route
          path="/:space/user"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={UserListPage} />}
        />
        <Route
          path="/:space/role"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={RolePage} />}
        />
        <Route
          path="/:space/settings/user"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={Permissions} />}
        />
        <Route
          path="/:space/settings/backup"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={BackupAndRestore} />}
        />
      </Routes>
    </div>
  );
};

export default RouterView;
