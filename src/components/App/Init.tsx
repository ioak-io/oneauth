import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from '../../actions/ProfileActions';
import { receiveMessage, sendMessage } from '../../events/MessageService';

const Init = () => {
  const authorization = useSelector((state) => state.authorization);
  const profile = useSelector((state) => state.profile);
  const [
    previousAuthorizationState,
    setPreviousAuthorizationState,
  ] = useState<any>();
  const [space, setSpace] = useState<string>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      authorization.isAuth &&
      authorization.isAuth !== previousAuthorizationState.isAuth &&
      space
    ) {
      initialize();
    }
    setPreviousAuthorizationState(authorization);
  }, [authorization]);

  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'spaceChange') {
        setSpace(event.data);
      }
      if (event.name === 'spaceChange' && authorization.isAuth) {
        initialize();
      }
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener('mousedown', () => {
      sendMessage('usingMouse', true);
    });

    // Re-enable focus styling when Tab is pressed
    document.body.addEventListener('keydown', (event: any) => {
      if (event.keyCode === 9) {
        sendMessage('usingMouse', false);
      }
    });
  }, [profile]);

  useEffect(() => {
    if (profile.theme === 'theme_light') {
      document.body.style.backgroundColor = 'var(--color-global-lightmode)';
    } else {
      document.body.style.backgroundColor = 'var(--color-global-darkmode)';
    }
  }, [profile.theme]);

  const initialize = () => {
    console.log('Initialization logic here');
  };
  return <></>;
};

export default Init;
