import React, { useEffect, useState } from 'react';
import './OakEditorToolbarButton.scss';

interface Props {
  children: any;
  handleClick: any;
}
const OakEditorToolbarButton = (props: Props) => {
  return (
    <button className="oak-editor-toolbar-button" onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default OakEditorToolbarButton;
