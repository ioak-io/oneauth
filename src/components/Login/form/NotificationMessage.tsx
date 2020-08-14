import React from 'react';
import './style.scss';
import OakIcon from '../../../oakui/OakIcon';

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
                <OakIcon mat="mail_outline" size="60px" />
              </div>
              <div>{props.notification.message}</div>
            </div>
          )}
          {props.notification.type === 'success-main' && (
            <div className="record-prominent success">
              <div>
                <OakIcon
                  mat="check_circle_outline"
                  size="60px"
                  color="success"
                />
              </div>
              <div>{props.notification.message}</div>
            </div>
          )}
          {props.notification.type === 'failure-main' && (
            <div className="record-prominent failure">
              <div>
                <OakIcon mat="error_outline" size="60px" color="failure" />
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
                <OakIcon mat="error_outline" color="failure" />
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
