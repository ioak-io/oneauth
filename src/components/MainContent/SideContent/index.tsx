import {
  faBalanceScaleRight,
  faCalendarAlt,
  faChartArea,
  faChartBar,
  faChevronLeft,
  faChevronRight,
  faCircleNodes,
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
  faListUl,
  faMagnifyingGlass,
  faMoneyBillWave,
  faMoneyBillWaveAlt,
  faPalette,
  faPlus,
  faReceipt,
  faShoppingBag,
  faShoppingCart,
  faSignOutAlt,
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
            <SideNavSubHeading short="Notes" long="Notes" />
            <SideNavLink
              link={`/${props.space}/new-note`}
              icon={faPlus}
              label="New note"
            />
            <SideNavLink
              link={`/${props.space}/browse`}
              icon={faFolderOpen}
              label="Browse"
            />
            <SideNavLink
              link={`/${props.space}/graph`}
              icon={faCircleNodes}
              label="Graph"
            />
            <SideNavSubHeading short="System" long="System" />
            <SideNavLink
              link={`/${props.space}/color-filter`}
              icon={faPalette}
              label="Color filter"
            />
            <SideNavLink
              link={`/${props.space}/metadata-definition`}
              icon={faListUl}
              label="Metadata"
            />
            <SideNavLink
              link={`/${props.space}/stopwords`}
              icon={faStrikethrough}
              label="Stopwords"
            />
            <SideNavLink
              link={`/${props.space}/settings/company`}
              icon={faCogs}
              label="Company setting"
            />
            <SideNavLink
              link={`/${props.space}/settings/user`}
              icon={faUserShield}
              label="User"
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
