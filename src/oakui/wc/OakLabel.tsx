import React, { useState, useEffect, ReactElement, useRef } from 'react';
import { useLocation } from 'react-router';

interface Props {
  label: string;
}

const OakLabel = (props: Props) => {
  const location = useLocation();
  const elementRef = useRef();

  return <oak-label ref={elementRef} label={props.label} />;
};

export default OakLabel;
