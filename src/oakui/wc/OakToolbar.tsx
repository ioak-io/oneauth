import { BUTTON_CLICK_EVENT } from '@oakui/core-stage/event/OakButtonEvent';
import {
  EXPANSE_COLLAPSED_EVENT,
  EXPANSE_EXPANDED_EVENT,
} from '@oakui/core-stage/event/OakExpanseEvent';
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
  borderVariant?: 'top' | 'bottom' | 'both' | 'none';
  fillColor?:
    | 'global'
    | 'container'
    | 'surface'
    | 'float'
    | 'default'
    | 'info'
    | 'invert'
    | 'none';
  paddingHorizontal?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  paddingVertical?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

const OakToolbar = (props: Props) => {
  const elementRef = useRef();
  return (
    <oak-toolbar
      ref={elementRef}
      elevation={props.elevation}
      borderVariant={props.borderVariant}
      fillColor={props.fillColor}
      paddingHorizontal={props.paddingHorizontal}
      paddingVertical={props.paddingVertical}
    >
      {props.children}
    </oak-toolbar>
  );
};

export default OakToolbar;
