import React from 'react';
import './styles/oak-icon.scss';
import SendIcon from './icons/SendIcon';
import VpnIcon from './icons/VpnIcon';

interface Props {
  mat?: string;
  svg?: string;
  size?: string;
  color?: string;
  theme?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'failure';
}
const OakIcon = (props: Props) => {
  const getStyle = () => {
    const style: any = {};
    style.fontSize = `${props.size}px`;
    style.height = `${props.size}px`;
    style.width = 'auto';
    switch (props.theme) {
      case 'primary':
        style.fill = 'var(--color-primary-1)';
        style.color = 'var(--color-primary-1)';
        break;
      case 'secondary':
        style.fill = 'var(--color-secondary-1)';
        style.color = 'var(--color-secondary-1)';
        break;
      case 'tertiary':
        style.fill = 'var(--color-tertiary-1)';
        style.color = 'var(--color-tertiary-1)';
        break;
      case 'success':
        style.fill = 'var(--color-success)';
        style.color = 'var(--color-success)';
        break;
      case 'failure':
        style.fill = 'var(--color-failure)';
        style.color = 'var(--color-failure)';
        break;
      case 'warning':
        style.fill = 'var(--color-warning)';
        style.color = 'var(--color-warning)';
        break;
      default:
        style.fill = 'var(--color-foreground-1)';
        style.color = 'var(--color-foreground-1)';
    }
    if (props.color) {
      style.fill = props.color;
      style.color = props.color;
    }
    return style;
  };
  return (
    <div className="oak-icon">
      {props.mat && (
        <i className="material-icons" style={getStyle()}>
          {props.mat}
        </i>
      )}
      {props.svg && props.svg === 'send' && <SendIcon style={getStyle()} />}
      {props.svg && props.svg === 'vpn' && <VpnIcon style={getStyle()} />}
    </div>
  );
};

export default OakIcon;
