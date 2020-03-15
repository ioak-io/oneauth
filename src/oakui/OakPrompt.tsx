import React from 'react';
import './styles/oak-dialog.scss';
import OakDialog from './OakDialog';
import OakButton from './OakButton';

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
    props.action();
    props.toggleVisibility();
  };

  return (
    <OakDialog
      small
      visible={props.visible}
      toggleVisibility={props.toggleVisibility}
    >
      <div className="dialog-body typography-4 space-top-4 space-bottom-4">
        {props.text ? props.text : 'Are you sure you want to continue?'}
      </div>
      <div className="dialog-footer">
        {props.children && props.children}
        {!props.children && (
          <>
            <OakButton
              data-test="action-close"
              action={props.toggleVisibility}
              theme="default"
              variant="animate in"
              align="left"
            >
              <i className="material-icons">close</i>No
            </OakButton>
            <OakButton
              data-test="action-proceed"
              action={action}
              theme="primary"
              variant="animate out"
              align="right"
            >
              <i className="material-icons">double_arrow</i>Yes
            </OakButton>
          </>
        )}
      </div>
    </OakDialog>
  );
};

export default OakPrompt;
