import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import './profile-settings.scss';
import { NavLink } from 'react-router-dom';
import { Authorization, Profile } from '../Types/GeneralTypes';
import OakTab from '../../oakui/OakTab';
import OakText from '../../oakui/OakText';
import OakButton from '../../oakui/OakButton';
import { httpPost } from '../Lib/RestTemplate';
import { sendMessage } from '../../events/MessageService';

interface Props {
  space: string;
}

const ProfileSettings = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });
  const [meta, setMeta] = useState([
    { slotName: 'details', label: 'Basic details', icon: 'subject' },
    { slotName: 'password', label: 'Change Password', icon: 'security' },
  ]);

  const handlePasswordChange = event => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    });
  };
  const update = () => {
    let baseAuthUrl = '/auth';
    if (props.space) {
      baseAuthUrl = `/auth/${props.space}`;
    }
    httpPost(
      `${baseAuthUrl}/changepassword`,
      {
        userId: authorization.userId,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      },
      {
        headers: {
          Authorization: authorization.token,
        },
      }
    )
      .then((response: any) => {
        if (response.status === 200) {
          setPasswordData({
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
          });
        } else {
          sendMessage('notification', true, {
            type: 'failure',
            message: 'Failed with error',
            duration: 3000,
          });
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          sendMessage('notification', true, {
            type: 'failure',
            message:
              'Password incorrect. Please enter your right credentials to update password',
            duration: 3000,
          });
        } else {
          sendMessage('notification', true, {
            type: 'failure',
            message: 'Failed with error',
            duration: 3000,
          });
        }
      });
  };
  return (
    <div className="profile-settings">
      <OakTab meta={meta}>
        <div slot="details">details</div>
        <div slot="password" className="change-password">
          <OakText
            type="password"
            label="Old password"
            data={passwordData}
            id="oldPassword"
            handleChange={e => handlePasswordChange(e)}
          />
          <OakText
            type="password"
            label="New password"
            data={passwordData}
            id="newPassword"
            handleChange={e => handlePasswordChange(e)}
          />
          <OakText
            type="password"
            label="Retype password"
            data={passwordData}
            id="repeatPassword"
            handleChange={e => handlePasswordChange(e)}
          />
          <OakButton theme="primary" variant="drama" action={update}>
            Update password
          </OakButton>
        </div>
      </OakTab>
    </div>
  );
};

export default ProfileSettings;
