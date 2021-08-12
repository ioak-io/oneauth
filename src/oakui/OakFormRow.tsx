import React, { useState, useEffect } from 'react';
import './styles/oak-form.scss';

interface Props {
  children?: any;
}

const OakFormRow = (props: Props) => {
  return (
    <div className="oak-form-row">
      <div className="oak-form-row--container">{props.children}</div>
    </div>
  );
};

export default OakFormRow;
