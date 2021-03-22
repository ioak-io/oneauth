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
  space: string;
  history: any;
}

const UpdateProfile = (props: Props) => {
  const authorization = useSelector((state) => state.authorization);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
  });

  const [stage, setStage] = useState('form');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    console.log(authorization);
    setData({
      firstName: authorization.firstName,
      lastName: authorization.lastName,
    });
  }, [authorization]);

  const handleChange = (event) => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const updateProfile = (event) => {
    event.preventDefault();
    const baseUserUrl = `/user/${props.space}`;
    const errorState = {
      firstName: '',
      lastName: '',
    };
    let error = false;
    sendMessage('notification', false);
    sendMessage('login-spinner');
    if (isEmptyOrSpaces(data.firstName)) {
      error = true;
      errorState.firstName = 'Cannot be empty';
    }
    if (isEmptyOrSpaces(data.lastName)) {
      error = true;
      errorState.lastName = 'Cannot be empty';
    }
    if (!error) {
      httpPost(
        `${baseUserUrl}/updateprofile`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        {
          headers: {
            Authorization: authorization.token,
          },
        }
      )
        .then((response: any) => {
          if (response.status === 200) {
            setData({
              firstName: '',
              lastName: '',
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
        className="space-change-password-link"
      >
        {stage === 'form' && <></>}
        {stage === 'form' && (
          <div className="form-changepassword">
            <div>
              <div className="label">
                {!errors.firstName && (
                  <div className="label-text">First name</div>
                )}
                {errors.firstName && (
                  <div className="error-text">
                    <Warning />
                    {errors.firstName}
                  </div>
                )}
              </div>
              <OakInput
                name="firstName"
                value={data.firstName}
                handleChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="label">
                {!errors.lastName && (
                  <div className="label-text">Last name</div>
                )}
                {errors.lastName && (
                  <div className="error-text">
                    <Warning />
                    {errors.lastName}
                  </div>
                )}
              </div>
              <OakInput
                name="lastName"
                value={data.lastName}
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
