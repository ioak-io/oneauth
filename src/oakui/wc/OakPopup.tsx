import React, { useState, useEffect, ReactElement, useRef } from 'react';

interface Props {
  children: any;
}

const OakPopup = (props: Props) => {
  const elementRef = useRef();

  return <oak-popup ref={elementRef}>{props.children}</oak-popup>;
};

export default OakPopup;
