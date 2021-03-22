import React, { useState } from 'react';
import './styles/oak-viewer.scss';

interface Props {
  children: any;
}
const OakViewer = (props: Props) => {
  return (
    <div className="oak-viewer">
      <div dangerouslySetInnerHTML={{ __html: props.children || '' }} />
    </div>
  );
};

export default OakViewer;
