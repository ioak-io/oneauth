import React from 'react';
import './styles/ActionButton.scss';

interface Props {
  icon?: string;
  leftLabel?: string;
  leftAction?: any;
  rightLabel?: string;
  rightAction?: any;
  type?: string;
}
const ActionButton = (props: Props) => {
  const icon = <i className="material-icons">{props.icon}</i>;
  return (
    <div className="action-button">
      {props.leftLabel && props.rightLabel && (
        <button
          type="button"
          className={`left ${props.type}`}
          onClick={props.leftAction}
        >
          {props.icon && icon}
          {props.leftLabel}
        </button>
      )}
      {props.leftLabel && props.rightLabel && (
        <button
          type="button"
          className={`right ${props.type}`}
          onClick={props.rightAction}
        >
          {props.icon && icon}
          {props.rightLabel}
        </button>
      )}
      {props.leftLabel && !props.rightLabel && (
        <button
          type="button"
          className={`center ${props.type}`}
          onClick={props.leftAction}
        >
          {props.icon && icon}
          {props.leftLabel}
        </button>
      )}
    </div>
  );
};

export default ActionButton;
