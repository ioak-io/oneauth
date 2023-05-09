import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import { Button, Input, ThemeType } from 'basicui';
import Logo from '../../../components/Logo';
import { signin } from './service';
import { setSessionValue } from '../../../utils/SessionUtils';

interface Props {
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || '';

const LoginPage = (props: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const onInput = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onSignin = (event: any) => {
    event.preventDefault();
    signin(state.email, state.password).then((response) => {
      console.log(response);
      setSessionValue(`fortuna-access_token`, response.access_token);
      setSessionValue(`fortuna-refresh_token`, response.refresh_token);
      navigate(searchParams.get("from") || '/home');
    })
  }

  return <div className='login-page basicui-light'>
    <div className="login-page__left" />
    <div className="login-page__right">
      <div className="login-page__right__overlay">
        <div className="login-page__right__overlay__content">
          <Logo />
          <form onSubmit={onSignin} className="login-page__right__overlay__content__form">
            <Input name="email" value={state.email} onInput={onInput} label='Username or Email Address' />
            <Input name="password" value={state.password} onInput={onInput} type="password" label='Password' />
            <Button type="submit" theme={ThemeType.primary}>Sign in</Button>
            <input />
          </form>
        </div>
      </div>
    </div>
  </div >;
};

export default LoginPage;
