import React, { useState, useEffect } from 'react';
import './styles/oak-page-expenso.scss';

interface Props {
  children?: any;
}

const OakPage = (props: Props) => {
  return (
    <div className="oak-page">
      <div className="oak-page-container">{props.children}</div>
    </div>
  );
};

export default OakPage;
