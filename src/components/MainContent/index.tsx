import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";

import Notification from "../Notification";
import NavigationContainer from "../App/NavigationContainer";
import BodyContainer from "../App/BodyContainer";
import SideContent from "./SideContent";
import { useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faClock,
  faDatabase,
  faKey,
  faList,
  faShieldAlt,
  faSkull,
  faTh,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

import logoIconWhite from "../../images/oneauth_white_small.svg";
import logoTextWhite from "../../images/oneauth_white_text.svg";
import logoIconBlack from "../../images/oneauth_black_small.svg";
import logoTextBlack from "../../images/oneauth_black_text.svg";

import SideNavSubHeading from "./SideNavSubHeading";
import SideNavLink from "./SideNavLink";
import { setProfile } from "../../store/actions/ProfileActions";
import { removeAuth } from "../../store/actions/AuthActions";
import { removeSessionValue } from "../../utils/SessionUtils";

interface Props {
  space: string;
}

const MainContent = (props: Props) => {
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleMode = () => {
    dispatch(
      setProfile({
        theme:
          profile.theme === "basicui-dark" ? "basicui-light" : "basicui-dark",
      })
    );

    sessionStorage.setItem(
      "fortuna_pref_profile_colormode",
      profile.theme === "basicui-dark" ? "basicui-light" : "basicui-dark"
    );
  };

  const chooseCompany = () => {
    navigate("/home");
  };

  const toggleSidebar = () => {
    sessionStorage.setItem(
      "oneauth_pref_sidebar_status",
      profile.sidebar ? "collapsed" : "expanded"
    );

    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  const logout = () => {
    dispatch(removeAuth());
    removeSessionValue(`oneauth-access_token`);
    removeSessionValue(`oneauth-refresh_token`);
    navigate(`/`);
  };

  const login = (type: string) => {
    navigate("/login");
  };

  return (
    <AppShell
      isDarkMode={profile.theme === "basicui-dark"}
      isSidebarExpanded={profile.sidebar}
      onSidebarToggle={toggleSidebar}
      onSignin={login}
      onSignout={logout}
      onDarkModeToggle={toggleMode}
      logoIconBlack={logoIconBlack}
      logoIconWhite={logoIconWhite}
      logoTextBlack={logoTextBlack}
      logoTextWhite={logoTextWhite}
      hideNavbar={location.pathname === "/login"}
      location={location}
    >
      <AppShell.Navbar>
        <AppShell.Navbar.Header>
          <div className="side-content__header__button">
            <button className="button" onClick={chooseCompany}>
              <FontAwesomeIcon icon={faTh} />
            </button>
          </div>
        </AppShell.Navbar.Header>
        <AppShell.Navbar.Body>
          {/* <SideContent space={props.space} /> */}
          {props.space && (
            <>
              <SideNavSubHeading short="Realm" long="Realm" />
              <SideNavLink
                link={`/${props.space}/edit-realm`}
                icon={faCircleInfo}
                label="Details"
              />
              <SideNavLink
                link={`/${props.space}/token-expiry`}
                icon={faClock}
                label="Token lifespan"
              />
              <SideNavLink
                link={`/${props.space}/apitoken`}
                icon={faKey}
                label="API access"
              />
              <SideNavLink
                link={`/${props.space}/custom-attributes`}
                icon={faList}
                label="Custom attributes"
              />
              <SideNavSubHeading short="Roles" long="Users and Roles" />
              <SideNavLink
                link={`/${props.space}/user`}
                icon={faUserShield}
                label="Users"
              />
              <SideNavLink
                link={`/${props.space}/role`}
                icon={faShieldAlt}
                label="Roles"
              />
              <SideNavSubHeading short="System" long="System" />
              <SideNavLink
                link={`/${props.space}/settings/user`}
                icon={faSkull}
                label="Realm Administrators"
              />
              <SideNavLink
                link={`/${props.space}/settings/backup`}
                icon={faDatabase}
                label="Backup and restore"
              />
              {/* <SideNavLink
              link={`/${props.space}/settings?link=backup`}
              icon={faFileImport}
              label="Export and import"
            /> */}
            </>
          )}
        </AppShell.Navbar.Body>
        <AppShell.Navbar.Footer />
      </AppShell.Navbar>
      <AppShell.Topbar />
      <AppShell.MobileNavbar>
        <AppShell.MobileNavbar.Body>
          {/* <MobileSidebar space={props.space} /> */}
          mobile
        </AppShell.MobileNavbar.Body>
        <AppShell.MobileNavbar.Footer>Footer</AppShell.MobileNavbar.Footer>
      </AppShell.MobileNavbar>
      <AppShell.Body>
        <BodyContainer {...props} />
      </AppShell.Body>
    </AppShell>
  );
};

export default MainContent;
