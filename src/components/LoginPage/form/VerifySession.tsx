import React from 'react';
import './style.scss';
import OakSpinner from '../../../oakui/OakSpinner';

const VerifySession = () => {
  return (
    <div className="verify-session typography-12">
      <div>verifying session</div>
      <div>
        <OakSpinner />
      </div>
    </div>
  );
};

export default VerifySession;
