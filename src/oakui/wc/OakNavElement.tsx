import { BUTTON_CLICK_EVENT } from '@oakui/core-stage/event/OakButtonEvent';
import React, { useState, useEffect, ReactElement, useRef } from 'react';

interface Props {
  active?: boolean;
  level?: 1 | 2 | 3;
  children: any;
  handleClick: any;
}

const OakNavElement = (props: Props) => {
  const elementRef = useRef();

  const handleClick = (event: any) => {
    props.handleClick(event);
  };

  useEffect(() => {
    (elementRef.current as any)!.active = props.active;
  }, [props.active]);

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      BUTTON_CLICK_EVENT,
      handleClick
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        BUTTON_CLICK_EVENT,
        handleClick
      );
    };
  });

  return (
    <oak-nav-element ref={elementRef} level={props.level}>
      {props.children}
    </oak-nav-element>
  );
};

export default OakNavElement;
