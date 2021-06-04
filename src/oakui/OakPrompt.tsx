import React from 'react';
import './styles/oak-prompt.scss';
import OakButton from './wc/OakButton';
import OakModal from './wc/OakModal';

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

  // const escFunction = (event: any) => {
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
      isOpen={props.visible}
      handleClose={props.toggleVisibility}
      noheader
    >
      <div slot="body">
        <div className="modal-body typography-8 space-top-4 space-bottom-4 confirmation-text">
          {props.text ? props.text : 'Are you sure you want to continue?'}
        </div>
      </div>
      <div slot="footer">
        {props.children && props.children}
        {!props.children && (
          <>
            <OakButton
              data-test="action-close"
              handleClick={props.toggleVisibility}
              theme="default"
              variant="appear"
              align="left"
            >
              No
            </OakButton>
            <OakButton
              data-test="action-proceed"
              handleClick={action}
              theme="primary"
              variant="disappear"
              align="right"
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
