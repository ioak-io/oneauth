import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

interface Props {
  children: any;
}

const SectionContainer = (props: Props) => {

  return (
    <div className='note-section-container'>
      {props.children}
    </div>
  );
};

export default SectionContainer;
