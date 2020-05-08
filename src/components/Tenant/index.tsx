import React, { useEffect, useState } from 'react';
import './style.scss';
import OakText from '../../oakui/OakText';
import { sendMessage } from '../../events/MessageService';
import { sentTenantUrl } from './TenantService';
import { preSignup, createTenant } from '../Auth/AuthService';
import { Profile } from '../Types/GeneralTypes';
import { isEmptyOrSpaces } from '../Utils';
import OakButton from '../../oakui/OakButton';
import { httpGet, httpPost } from '../Lib/RestTemplate';
import constants from '../Constants';

interface Props {
  getProfile: Function;
  profile: Profile;
  history: any;
}
interface State {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  created: boolean;
  errorFields: {
    name: boolean;
    email: boolean;
    password: boolean;
    repeatPassword: boolean;
  };
}

const Tenant = (props: Props) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    created: false,
  });

  const [errorFields, setErrorFields] = useState({
    name: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  useEffect(() => {
    props.getProfile();
  }, []);

  const handleChange = event => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const clearError = () => {
    setErrorFields({
      name: false,
      email: false,
      password: false,
      repeatPassword: false,
    });
  };

  const setError = fieldName => {
    setErrorFields({ ...errorFields, [fieldName]: true });
  };

  const validate = () => {
    if (isEmptyOrSpaces(data.name)) {
      setError('name');
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Tenant name cannot be empty',
        duration: 3000,
      });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      setError('email');
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Email ID is invalid',
        duration: 3000,
      });
      return false;
    }

    if (isEmptyOrSpaces(data.password)) {
      setError('password');
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Password cannot be empty',
        duration: 3000,
      });
      return false;
    }

    if (data.password !== data.repeatPassword) {
      setError('repeatPassword');
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Password and repeat password should be same',
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  const submit = event => {
    event.preventDefault();
    sendMessage('spinner');
    clearError();

    if (!validate()) {
      return;
    }

    httpPost(
      constants.API_SPACE_CREATE,
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      null
    ).then(response => {
      if (response.status === 200) {
        sendMessage('notification', true, {
          type: 'success',
          message: `Space (${data.name}) has been setup`,
        });
        setData({ ...data, created: true });
      }
    });
  };

  const gotoTenantPage = () => {
    props.history.push(`/${data.name}/home`);
  };

  return (
    <div className="tenant boxed">
      {!data.created && (
        <>
          <div className="typography-3 space-bottom-4">Tenant creation</div>
          <div className="form">
            <OakText
              id="name"
              data={data}
              label="Tenant Name"
              handleChange={e => handleChange(e)}
              errorFields={errorFields}
            />
            <OakText
              id="email"
              data={data}
              label="Administrator Email"
              handleChange={e => handleChange(e)}
              errorFields={errorFields}
            />
            <OakText
              id="password"
              type="password"
              data={data}
              label="Administrator Password"
              handleChange={e => handleChange(e)}
              errorFields={errorFields}
            />
            <OakText
              id="repeatPassword"
              type="password"
              data={data}
              label="Repeat Password"
              handleChange={e => handleChange(e)}
              errorFields={errorFields}
            />
            <div className="action">
              <OakButton theme="primary" variant="appear" action={submit}>
                Create Tenant
              </OakButton>
            </div>
          </div>
        </>
      )}
      {data.created && (
        <>
          <div className="typography-3 space-bottom-4">
            Tenant [{data.name}] available now
          </div>
          <OakButton
            theme="primary"
            variant="disappear"
            action={gotoTenantPage}
          >
            Take me to my tenant
          </OakButton>
        </>
      )}
    </div>
  );
};

export default Tenant;
