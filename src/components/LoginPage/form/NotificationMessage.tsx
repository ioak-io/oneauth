import {
  CheckCircleOutline,
  ErrorOutline,
  MailOutline,
} from '@material-ui/icons';
import React from 'react';
import './style.scss';

interface Props {
  notification: any;
}

const NotificationMessage = (props: Props) => {
  return (
    <>
      {props.notification.type && props.notification.message && (
        <div className="login-notification">
          {props.notification.type === 'email-main' && (
            <div className="record-prominent email">
              <div>
                <MailOutline />
              </div>
              <div>{props.notification.message}</div>
            </div>
          )}
          {props.notification.type === 'success-main' && (
            <div className="record-prominent success">
              <div>
                <CheckCircleOutline />
              </div>
              <div>{props.notification.message}</div>
            </div>
          )}
          {props.notification.type === 'failure-main' && (
            <div className="record-prominent failure">
              <div>
                <ErrorOutline />
              </div>
              <div>{props.notification.message}</div>
            </div>
          )}
          {props.notification.type === 'success' && (
            <div className="record success">{props.notification.message}</div>
          )}
          {props.notification.type === 'failure' && (
            <div className="record failure">
              <div>
                <ErrorOutline />
              </div>
              <div>{props.notification.message}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NotificationMessage;
