import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DarkModeIcon.scss';
import { NightsStay, WbSunny } from '@material-ui/icons';
import { setProfile } from '../../store/actions/ProfileActions';

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
      'oneauth_pref_profile_colormode',
      profile.theme === 'basicui-dark' ? 'basicui-light' : 'basicui-dark'
    );
  };
  return (
    <div className={`dark-mode-icon ${profile.theme}`} onClick={toggleMode}>
      {profile.theme === 'basicui-dark' && <WbSunny className="cursor-pointer" />}
      {profile.theme !== 'basicui-dark' && (
        <NightsStay className="cursor-pointer" />
      )}
    </div>
  );
};

export default DarkModeIcon;
