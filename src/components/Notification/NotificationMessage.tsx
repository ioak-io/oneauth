import React from 'react';
import './style.scss';

interface Props {
  notification: any;
  handleRemove: any;
}

const NotificationMessage = (props: Props) => {
  return (
    <div className={`message ${props.notification.type}`}>
      {props.notification.type === 'running' && (
        <div
          className={`message-icon ${
            props.notification.type === 'running' ? 'running' : ''
          }`}
        >
          <i className="material-icons">rotate_right</i>
        </div>
      )}
      {props.notification.type === 'success' && (
        <div className="message-icon">
          <i className="material-icons">check_circle_outline</i>
        </div>
      )}
      {props.notification.type === 'warning' && (
        <div className="message-icon">
          <i className="material-icons">warning</i>
        </div>
      )}
      {props.notification.type === 'failure' && (
        <div className="message-icon">
          <i className="material-icons">error_outline</i>
        </div>
      )}
      <div className="message-text">{props.notification?.message}</div>
      <div className="message-action">
        <i className="material-icons" onClick={props.handleRemove}>
          clear
        </i>
      </div>
    </div>
  );
};

export default NotificationMessage;
