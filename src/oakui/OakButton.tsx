import React, { ReactNode } from 'react';
import './styles/oak-button.scss';
import OakIcon from './OakIcon';

interface Props {
  icon?: string; // points to "mat" material icon
  fa?: string;
  svg?: string;
  action?: any;
  variant?:
    | 'block'
    | 'outline'
    | 'appear'
    | 'disappear'
    | 'regular'
    | 'disabled'
    | 'drama';
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
      <div className="button-label-container">
        {props.icon && <OakIcon mat={props.icon} size="1.2em" />}
        {props.fa && <OakIcon fa={props.fa} size="1.2em" />}
        {props.svg && <OakIcon svg={props.svg} size="1.2em" />}
        {props.children && props.children}
      </div>
    </button>
  );
};

export default OakButton;
