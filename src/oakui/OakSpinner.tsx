import React, { useState, useEffect } from 'react';
import './styles/oak-spinner.scss';

const OakSpinner = () => {
  return (
    <div className="oak-spinner">
      <div className="spinner-wrapper">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default OakSpinner;
