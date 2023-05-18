import React, { useEffect, useState } from 'react';
import './style.scss';

interface Props {
  children?: any;
}

const MainSection = (props: Props) => {

  return (
    <div className="main-section">{props.children}</div>
  );
};

export default MainSection;
