import React, { ReactNode } from 'react';
import './styles/oak-button-slide.scss';

interface Props {
  icon?: string;
  action?: any;
  variant?:
    | 'block'
    | 'outline'
    | 'animate in'
    | 'animate out'
    | 'animate none'
    | 'disabled';
  theme?: 'primary' | 'secondary' | 'tertiary' | 'default';
  align?: 'left' | 'right' | 'center';
  small?: boolean;
  invert?: boolean;
  children?: ReactNode;
  type?: 'button' | 'submit';
}

const OakButton = (props: Props) => {
  const getStyle = () => {
    let style = props.theme ? props.theme : '';
    style += props.variant ? ` ${props.variant}` : '';

    if (!props.children) {
      style += ' icon';
    }

    style += props.invert ? ' invert' : '';

    style += props.small ? ' small' : '';

    style += props.align ? ` align-${props.align}` : '';

    return style;
  };

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`oak-button ${getStyle()}`} onClick={props.action}>
      {props.icon && <i className="material-icons">{props.icon}</i>}
      {props.children && props.children}
    </button>
  );
};

export default OakButton;
