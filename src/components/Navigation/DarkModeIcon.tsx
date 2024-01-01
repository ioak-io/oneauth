import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DarkModeIcon.scss';
import { setProfile } from '../../store/actions/ProfileActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const DarkModeIcon = () => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const toggleMode = () => {
    dispatch(
      setProfile({
        theme: profile.theme === 'basicui-dark' ? 'basicui-light' : 'basicui-dark',
      })
    );

    sessionStorage.setItem(
      'fortuna_pref_profile_colormode',
      profile.theme === 'basicui-dark' ? 'basicui-light' : 'basicui-dark'
    );
  };
  return (
    <div className={`dark-mode-icon ${profile.theme}`} onClick={toggleMode}>
      {profile.theme === 'basicui-dark' && <FontAwesomeIcon icon={faSun} />}
      {profile.theme !== 'basicui-dark' && (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </div>
  );
};

export default DarkModeIcon;
