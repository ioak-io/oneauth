import {
  faBalanceScaleRight,
  faCalendarAlt,
  faChartArea,
  faChartBar,
  faChevronLeft,
  faChevronRight,
  faCircleInfo,
  faCircleNodes,
  faClock,
  faClone,
  faCog,
  faCogs,
  faCoins,
  faCopy,
  faDatabase,
  faFileExport,
  faFileImport,
  faFingerprint,
  faFolderOpen,
  faHome,
  faInfo,
  faInfoCircle,
  faKey,
  faListUl,
  faMagnifyingGlass,
  faMoneyBillWave,
  faMoneyBillWaveAlt,
  faPalette,
  faPen,
  faPenClip,
  faPlus,
  faReceipt,
  faShield,
  faShieldAlt,
  faShieldBlank,
  faShoppingBag,
  faShoppingCart,
  faSignOutAlt,
  faSkull,
  faStrikethrough,
  faTable,
  faTag,
  faTags,
  faTh,
  faThLarge,
  faUniversity,
  faUserShield,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DarkModeIcon from '../../../components/Navigation/DarkModeIcon';
import NavAccountIcon from '../../../components/Navigation/NavAccountIcon';
import Logo from '../../../components/Logo';
import SideNavLink from '../SideNavLink';

import './style.scss';
import { removeAuth } from '../../../store/actions/AuthActions';
import { sendMessage } from '../../../events/MessageService';
import SideNavSubHeading from '../SideNavSubHeading';
import { removeSessionValue } from '../../../utils/SessionUtils';
import { useNavigate } from 'react-router-dom';
import { setProfile } from '../../../store/actions/ProfileActions';

interface Props {
  space: string;
}

const SideContent = (props: Props) => {
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const logout = (
    event: any,
    type = 'success',
    message = 'You have been logged out'
  ) => {
    dispatch(removeAuth());
    removeSessionValue(
      `oneauth-access_token`
    );
    removeSessionValue(
      `oneauth-refresh_token`
    );
    navigate(`/`);
  };

  const login = (type: string) => {
    navigate('/login');
  };

  const chooseCompany = () => {
    navigate('/home');
  };

  const toggleSidebar = () => {
    sessionStorage.setItem(
      'oneauth_pref_sidebar_status',
      profile.sidebar ? 'collapsed' : 'expanded'
    );

    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  return (
    <div
      className={`side-content ${profile.sidebar
          ? 'side-content__sidebar-active'
          : 'side-content__sidebar-inactive'
        } ${profile.theme === 'basicui-dark'
          ? 'side-content__theme-dark'
          : 'side-content__theme-light'
        }`}
    >
      <div className="side-content__header">
        <div className="side-content__header__logo">
          <Logo variant={profile.sidebar ? 'full' : 'short'} />
        </div>
        {profile.sidebar && (
          <div className="side-content__header__button">
            <button className="button" onClick={chooseCompany}>
              <FontAwesomeIcon icon={faTh} />
            </button>
          </div>
        )}
      </div>
      <div className="side-content__menu">
        <button className='side-content__menu__toggle' onClick={toggleSidebar}>
          {profile.sidebar && <FontAwesomeIcon icon={faChevronLeft} />}
          {!profile.sidebar && <FontAwesomeIcon icon={faChevronRight} />}
        </button>
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
      </div>
      <div className="side-content__footer">
        <div className="side-content__footer__left">
          {authorization.isAuth && (
            <button className="button" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
          {!authorization.isAuth && (
            <button className="button" onClick={() => login('signin')}>
              <FontAwesomeIcon icon={faFingerprint} />
            </button>
          )}
          {profile.sidebar && (
            <div>{`${authorization.given_name} ${authorization.family_name}`}</div>
          )}
        </div>
        {profile.sidebar && (
          <div className="side-content__footer__right">
            <DarkModeIcon />
          </div>
        )}
        {/* <NavAccountIcon logout={logout} login={login} /> */}
      </div>
    </div>
  );
};

export default SideContent;
