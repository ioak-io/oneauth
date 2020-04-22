import React, { useEffect, ReactNode, useState } from 'react';
import './styles/oak-dialog.scss';
import { sendMessage } from '../events/MessageService';

interface Props {
  visible: boolean;
  toggleVisibility: any;
  small?: boolean;
  noheader?: boolean;
  fullscreen?: boolean;
  children?: ReactNode;
}

const OakDialog = (props: Props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    sendMessage('modal', props.visible);
    if (visible !== props.visible) {
      if (props.visible) {
        setVisible(props.visible);
      } else {
        setTimeout(() => setVisible(props.visible), 200);
      }
    }
  }, [props.visible]);

  useEffect(() => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${scrollBarWidth}px`
    );
    setVisible(props.visible);
  }, []);

  useEffect(() => {
    sendMessage('dialog', props.visible);
    if (props.visible) {
      document.body.classList.add('oak-dialog-open');
    } else {
      document.body.classList.remove('oak-dialog-open');
    }
    document.addEventListener('keydown', escFunction, false);
    return () => document.removeEventListener('keydown', escFunction, false);
  }, [visible]);

  const escFunction = event => {
    if (event.keyCode === 27) {
      if (props.visible) {
        props.toggleVisibility();
      }
    }
  };

  const getDialogStyle = () => {
    let style = '';
    style += props.small ? ' small' : '';
    style += props.noheader ? ' noheader' : '';
    style += props.fullscreen ? ' fullscreen' : '';
    return style;
  };

  return (
    <div className={`oak-dialog ${getDialogStyle()}`}>
      {visible && (
        <div
          className={
            props.visible
              ? `dialog show ${getDialogStyle()}`
              : `dialog hide ${getDialogStyle()}`
          }
        >
          <div className={props.visible ? 'container' : 'container hidetext'}>
            <div className="dialog-header">
              <div
                className="container"
                data-test="toggle-visibility"
                onClick={props.toggleVisibility}
              >
                <i className="material-icons">close</i>
                <div className="text-esc">esc</div>
              </div>
            </div>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};

export default OakDialog;
