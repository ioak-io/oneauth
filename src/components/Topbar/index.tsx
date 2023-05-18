import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../store/actions/ProfileActions';
import MobileSidebar from '../MobileSidebar';
import './style.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  children?: any;
  space?: string;
}

const Topbar = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  }

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  }

  const toggleSidebar = () => {
    sessionStorage.setItem(
      'oneauth_pref_sidebar_status',
      profile.sidebar ? 'collapsed' : 'expanded'
    );

    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  const openNewNotePage = () => {
    navigate(`/${props.space}/new-note`);
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar__left">
          <button className="button desktop-only" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <button className="button mobile-only" onClick={toggleMobileSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* <button className="button topbar__left__nav" onClick={openNewNotePage}>
            <FontAwesomeIcon icon={faPlus} /> New note
          </button> */}
          <div>{props.title}</div>
        </div>
        <div className="topbar__right">{props.children}</div>
      </div>
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />
    </>
  );
};

export default Topbar;
