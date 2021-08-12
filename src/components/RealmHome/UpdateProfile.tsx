import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Warning } from '@material-ui/icons';
import './style.scss';
import { sendMessage } from '../../events/MessageService';
import { httpPost } from '../Lib/RestTemplate';
import { Authorization } from '../Types/GeneralTypes';
import { isEmptyOrSpaces } from '../Utils';
import OakInput from '../../oakui/wc/OakInput';
import OakButton from '../../oakui/wc/OakButton';

interface Props {
  goHome: any;
  realm: string;
  history: any;
}

const UpdateProfile = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [data, setData] = useState({
    given_name: '',
    family_name: '',
  });

  const [stage, setStage] = useState('form');

  const [errors, setErrors] = useState({
    given_name: '',
    family_name: '',
  });

  useEffect(() => {
    console.log(authorization);
    setData({
      given_name: authorization.given_name,
      family_name: authorization.family_name,
    });
  }, [authorization]);

  const handleChange = (event) => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const updateProfile = (event) => {
    event.preventDefault();
    const baseUserUrl = `/user/${props.realm}`;
    const errorState = {
      given_name: '',
      family_name: '',
    };
    let error = false;
    sendMessage('notification', false);
    sendMessage('login-spinner');
    if (isEmptyOrSpaces(data.given_name)) {
      error = true;
      errorState.given_name = 'Cannot be empty';
    }
    if (isEmptyOrSpaces(data.family_name)) {
      error = true;
      errorState.family_name = 'Cannot be empty';
    }
    if (!error) {
      httpPost(
        `${baseUserUrl}/updateprofile`,
        {
          given_name: data.given_name,
          family_name: data.family_name,
        },
        {
          headers: {
            Authorization: authorization.access_token,
          },
        }
      )
        .then((response: any) => {
          if (response.status === 200) {
            setData({
              given_name: '',
              family_name: '',
            });
            setStage('profileUpdated');
            sendMessage('login-notification', true, {
              type: 'success-main',
              message:
                'Your account password has been updated. You can login with your new password from next time',
            });
          } else {
            sendMessage('login-notification', true, {
              type: 'failure',
              message: 'Failed to update your password',
            });
          }
        })
        .catch((error) => {
          sendMessage('login-notification', true, {
            type: 'failure',
            message: 'Failed to update your profile',
          });
        })
        .finally(() => {
          setErrors(errorState);
          sendMessage('login-spinner', false);
        });
    } else {
      console.log('error');
      setErrors(errorState);
      sendMessage('login-spinner', false);
    }
  };

  const handleSubmit = (event) => {
    if (stage === 'form') {
      // requestLink(event);
      updateProfile(event);
    }
  };

  return (
    <>
      <form
        method="GET"
        onSubmit={handleSubmit}
        noValidate
        className="realm-change-password-link account-page"
      >
        {stage === 'form' && <></>}
        {stage === 'form' && (
          <div className="form-changepassword">
            <div>
              <div className="label">
                {!errors.given_name && (
                  <div className="label-text">First name</div>
                )}
                {errors.given_name && (
                  <div className="error-text">
                    <Warning />
                    {errors.given_name}
                  </div>
                )}
              </div>
              <OakInput
                name="given_name"
                value={data.given_name}
                handleChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="label">
                {!errors.family_name && (
                  <div className="label-text">Last name</div>
                )}
                {errors.family_name && (
                  <div className="error-text">
                    <Warning />
                    {errors.family_name}
                  </div>
                )}
              </div>
              <OakInput
                name="family_name"
                value={data.family_name}
                handleChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        )}
        <div className="action">
          {['form'].includes(stage) && (
            <OakButton
              variant="regular"
              theme="primary"
              handleClick={handleSubmit}
            >
              Save
            </OakButton>
          )}
          {['form'].includes(stage) && <p className="hr">or</p>}
          <div className="button-link">
            <div className="link" onClick={props.goHome}>
              Back to Home
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;
