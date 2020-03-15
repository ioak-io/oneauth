import React, { useState, useEffect } from 'react';
import './style.scss';
import { receiveMessage, sendMessage } from '../../events/MessageService';

const Notification = () => {
  const [spinner, setSpinner] = useState(false);
  const [notification, setNotification] = useState<
    { type?: string; message?: any } | undefined
  >(undefined);

  useEffect(() => {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'notification') {
        if (!message.signal) {
          setNotification(undefined);
        } else {
          setNotification(message.data);
          setSpinner(false);

          if (message.data && message.data.duration) {
            setTimeout(() => {
              sendMessage('notification', false);
            }, message.data.duration);
          }
        }
      }

      if (message.name === 'spinner') {
        setSpinner(message.signal);
      }
    });
    return () => eventBus.unsubscribe();
  }, []);

  return (
    <>
      {notification && (
        <div className={`notification ${notification?.type}`}>
          <div className="message">{notification?.message}</div>
        </div>
      )}
      {spinner && <div data-test="spinner" className="lds-dual-ring" />}
    </>
  );
};

export default Notification;
