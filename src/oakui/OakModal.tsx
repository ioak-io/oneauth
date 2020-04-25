import React, { useEffect, ReactNode, useState } from 'react';
import './styles/oak-modal.scss';
import { sendMessage } from '../events/MessageService';

interface Props {
  visible: boolean;
  toggleVisibility: any;
  small?: boolean;
  fullscreen?: boolean;
  children?: ReactNode;
  label?: string;
  noheader?: boolean;
}

const OakModal = (props: Props) => {
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

  // useEffect(() => {
  //   if (props.visible) {
  //     setVisible(props.visible);
  //   } else {
  //     setTimeout(() => setVisible(props.visible), 2000);
  //   }
  // }, []);

  useEffect(() => {
    if (visible) {
      document.body.classList.add('oak-modal-open');
    } else {
      document.body.classList.remove('oak-modal-open');
    }
    document.addEventListener('keydown', escFunction, false);
    return () => document.removeEventListener('keydown', escFunction, false);
  }, [visible]);

  const escFunction = event => {
    if (event.keyCode === 27) {
      if (visible) {
        props.toggleVisibility();
      }
    }
  };

  const getmodalStyle = () => {
    let style = '';
    style += props.small ? ' small' : '';
    style += props.noheader ? ' noheader' : '';
    style += props.fullscreen ? ' fullscreen' : '';
    return style;
  };

  return (
    <div className={`oak-modal ${getmodalStyle()}`}>
      {visible && (
        <div
          className={
            props.visible
              ? `modal show ${getmodalStyle()}`
              : `modal hide ${getmodalStyle()}`
          }
        >
          <div className={props.visible ? 'container' : 'container hidetext'}>
            <div className="modal-header">
              <div className="container" data-test="toggle-visibility">
                <div className="title">{props.label}</div>
                <div>
                  <i
                    className="material-icons"
                    onClick={props.toggleVisibility}
                  >
                    close
                  </i>
                </div>
              </div>
            </div>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};

export default OakModal;
