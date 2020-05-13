import React, { useEffect, ReactNode, useState } from 'react';
import './styles/oak-modal.scss';
import OakIcon from './OakIcon';

interface Props {
  visible: boolean;
  toggleVisibility: any;
  label?: string;
  children?: ReactNode;
  fullscreen?: boolean;
  noheader?: boolean;
  donotMobilize?: boolean;
}

const OakModal = (props: Props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible !== props.visible) {
      if (props.visible) {
        setVisible(props.visible);
      } else {
        setTimeout(() => setVisible(props.visible), 250);
      }
    }
  }, [props.visible]);

  useEffect(() => {
    // if (visible) {
    //   document.body.classList.add('oak-modal-open');
    // } else {
    //   document.body.classList.remove('oak-modal-open');
    // }
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
    style += props.noheader ? ' noheader' : '';
    style += props.fullscreen ? ' fullscreen' : '';
    style += props.donotMobilize ? '' : ' mobilize';
    return style;
  };

  return (
    <>
      {visible && (
        <div
          className={
            props.visible
              ? `modal-root show ${getmodalStyle()}`
              : `modal-root hide ${getmodalStyle()}`
          }
        >
          <div className="backdrop-fade" onClick={props.toggleVisibility} />
          <div className="oak-modal">
            {/* {visible && ( */}
            <div className="modal">
              <div
                className={props.visible ? 'container' : 'container hidetext'}
              >
                <div className="modal-header">
                  {/* <div className="container" data-test="toggle-visibility"> */}

                  <div className="left">
                    <div className="icon">
                      {/* <i className="material-icons">blur_on</i> */}N
                    </div>
                    <div className="label one-liner">{props.label}</div>
                  </div>
                  <div className="right">
                    <div onClick={props.toggleVisibility}>
                      <i className="material-icons modal-close-icon">close</i>
                      {/* <div className="text-esc">esc</div> */}
                    </div>
                  </div>
                  {/* </div> */}
                </div>
                {props.children}
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default OakModal;
