import React from 'react';

interface Props {
  children?: any;
  align?: 'left' | 'right' | 'center';
}

const OakFormActionsContainer = (props: Props) => {
  return (
    <oak-form-actions-container align={props.align}>
      {props.children}
    </oak-form-actions-container>
  );
};

export default OakFormActionsContainer;
