import React, { useState, useEffect } from 'react';
import { receiveMessage } from '../../events/MessageService';

const Backdrop = () => {
  const [backdrop, setBackdrop] = useState('');
  useEffect(() => {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'dialog') {
        if (message.signal) {
          setBackdrop('backdrop-fade');
        } else {
          setBackdrop('');
        }
      }
    });
    return () => eventBus.unsubscribe();
  }, []);

  return <div className={backdrop} />;
};

export default Backdrop;
