import React, { useState, useEffect } from 'react';
import './style.scss';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import OakSpinner from '../../oakui/OakSpinner';
import NotificationMessage from './NotificationMessage';

const Notification = () => {
  const [spinner, setSpinner] = useState(false);
  const [notificationList, setNotificationList] = useState<any | undefined>([]);
  const [data, setData] = useState<any>({ notificationList: [] });

  const removeNotification = notificationData => {
    setNotificationList(
      notificationList.filter(item => {
        return item.id !== notificationData.id;
      })
    );
  };
  const addNotification = notificationData => {
    const localCopy = [...notificationList];
    localCopy.unshift(notificationData);
    // setNotificationList([notificationData].concat(notificationList));
    setNotificationList(localCopy);
    // console.log(localCopy);
    if (notificationData.duration) {
      setTimeout(() => {
        removeNotification(notificationData);
      }, notificationData.duration);
    } else if (!notificationData.id) {
      setTimeout(() => {
        removeNotification(notificationData);
      }, 5000);
    }
    // console.log(notificationList.splice(0, 100));
  };

  useEffect(() => {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'notification') {
        if (!message.signal) {
          removeNotification(message.data);
        } else {
          removeNotification(message.data);
          addNotification(message.data);
          // turn off spinner when a notification arrives
          setSpinner(false);

          // if (message.data && message.data.duration) {
          //   setTimeout(() => {
          //     sendMessage('notification', false);
          //   }, message.data.duration);
          // }
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
      {notificationList && notificationList.length > 0 && (
        <div className="notification">
          {notificationList
            .slice(0, 5)
            .reverse()
            .map(notification => (
              <div key={notification.id || notification.message}>
                <NotificationMessage
                  notification={notification}
                  handleRemove={removeNotification}
                />
              </div>
            ))}
        </div>
      )}
      {/* {spinner && <div data-test="spinner" className="lds-dual-ring" />} */}
      {spinner && <OakSpinner data-test="spinner" />}
    </>
  );
};

export default Notification;
