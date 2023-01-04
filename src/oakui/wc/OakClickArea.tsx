import { CLICK_AREA_CLICK_EVENT } from '@oakui/core-stage/event/OakClickAreaEvent';
import React, { useState, useEffect, ReactElement, useRef } from 'react';

interface Props {
  children: any;
  elevation?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24;
  handleClick?: any;
}

const OakClickArea = (props: Props) => {
  const elementRef = useRef();

  const handleClick = (event: any) => {
    if (props.handleClick) {
      const { detail } = event;
      props.handleClick(detail);
    }
  };

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      CLICK_AREA_CLICK_EVENT,
      handleClick
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        CLICK_AREA_CLICK_EVENT,
        handleClick
      );
    };
  });

  return (
    <oak-click-area ref={elementRef} elevation={props.elevation}>
      {props.children}
    </oak-click-area>
  );
};

export default OakClickArea;
