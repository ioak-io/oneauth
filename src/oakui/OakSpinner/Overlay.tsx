import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Overlay.scss';

const Overlay = () => {
  const profile = useSelector((state) => state.profile);

  return <div className={`spinner-overlay ${profile.theme}`} />;
};

export default Overlay;
