import React from 'react';
import './style.scss';

interface Props {
  action: Function;
  label: string;
  icon?: string;
  svgIcon?: any;
}

const LoginMethod = (props: Props) => {
  return (
    <div className="login-method" onClick={() => props.action()}>
      {props.icon && <i className="material-icons">{props.icon}</i>}
      {props.svgIcon && (
        <img
          className="login-method--icon"
          src={props.svgIcon}
          alt={`Login via ${props.label}`}
        />
      )}
      <div className="typography-7">{props.label}</div>
    </div>
  );
};

export default LoginMethod;
