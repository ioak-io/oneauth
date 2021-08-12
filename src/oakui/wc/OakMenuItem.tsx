import React, { useEffect, useRef } from 'react';
import { MENU_CLICK_EVENT } from '@oakui/core-stage/event/OakMenuEvent';

interface Props {
  fill?: 'global' | 'container' | 'surface' | 'float';
  children: any;
  handleClick: any;
}

const OakMenuItem = (props: Props) => {
  const elementRef = useRef();

  const handleClick = (event: any) => {
    props.handleClick(event);
  };

  useEffect(() => {
    (elementRef as any).current.addEventListener(MENU_CLICK_EVENT, handleClick);

    return () => {
      (elementRef as any).current?.removeEventListener(
        MENU_CLICK_EVENT,
        handleClick
      );
    };
  });

  return (
    <oak-menu-item ref={elementRef} fill={props.fill}>
      {props.children}
    </oak-menu-item>
  );
};

export default OakMenuItem;
