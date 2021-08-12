import React, { useState, useEffect, ReactElement, useRef } from 'react';
import { useLocation } from 'react-router';

interface Props {
  type?: 'button' | 'custom';
  buttonVariant?:
    | 'block'
    | 'outline'
    | 'appear'
    | 'disappear'
    | 'regular'
    | 'disabled'
    | 'drama';

  buttonTheme?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info';
  buttonSize?: 'xsmall' | 'small' | 'medium' | 'large';
  buttonShape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf' | 'icon';
  buttonSemitransparent?: boolean;
  buttonFullWidth?: boolean;

  buttonElevation?:
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
  children: any;
}

const OakMenu = (props: Props) => {
  const elementRef = useRef();

  return (
    <oak-menu
      ref={elementRef}
      type={props.type}
      buttonVariant={props.buttonVariant}
      buttonTheme={props.buttonTheme}
      buttonSize={props.buttonSize}
      buttonShape={props.buttonShape}
      buttonElevation={props.buttonElevation}
      buttonSemitransparent={props.buttonSemitransparent}
    >
      {props.children}
    </oak-menu>
  );
};

export default OakMenu;
