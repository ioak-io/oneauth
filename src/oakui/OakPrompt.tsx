import React from 'react';
import './styles/oak-prompt.scss';
import OakButton from './OakButton';
import OakModal from './OakModal';

interface Props {
  visible: boolean;
  toggleVisibility: any;
  action: any;
  text?: string;
  children?: any;
}

const OakPrompt = (props: Props) => {
  // useEffect(() => {
  //     document.addEventListener("keydown", escFunction, false);
  //     return () => document.removeEventListener("keydown", escFunction, false);
  // }, []);

  // const escFunction = (event) => {
  //     if(event.keyCode === 27) {
  //       if (props.visible) {
  //         props.toggleVisibility();
  //       }
  //     }
  // }

  const action = () => {
    console.log('triggered action');
    props.toggleVisibility();
    console.log('before action');
    props.action();
    console.log('after action');
  };

  return (
    <OakModal
      visible={props.visible}
      toggleVisibility={props.toggleVisibility}
      noheader
    >
      <div className="modal-body typography-8 space-top-4 space-bottom-4 confirmation-text">
        {props.text ? props.text : 'Are you sure you want to continue?'}
      </div>
      <div className="modal-footer">
        {props.children && props.children}
        {!props.children && (
          <>
            <OakButton
              data-test="action-close"
              action={props.toggleVisibility}
              theme="default"
              variant="appear"
              align="left"
              fa="fas fa-times"
            >
              No
            </OakButton>
            <OakButton
              data-test="action-proceed"
              action={action}
              theme="primary"
              variant="disappear"
              align="right"
              fa="fas fa-check"
            >
              Yes
            </OakButton>
          </>
        )}
      </div>
    </OakModal>
  );
};

export default OakPrompt;
