import React, { useEffect, useState } from 'react';
import './OakEditorInlineButton.scss';

interface Props {
  children: any;
  handleClick: any;
}
const OakEditorInlineButton = (props: Props) => {
  return (
    <button className="oak-editor-toolbar-button" onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default OakEditorInlineButton;
