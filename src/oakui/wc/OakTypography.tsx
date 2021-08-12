import React, { useState, useEffect, useRef } from 'react';

interface Props {
  children: any;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  display?: any;
  noWrap?: boolean;
  paragraph?: boolean;
  gutterBottom?: boolean;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline'
    | 'inherit';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'invert'
    | 'info';
  highlightColor?:
    | 'none'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'invert'
    | 'info';
}

const OakTypography = (props: Props) => {
  const elementRef = useRef();
  useEffect(() => {
    (elementRef.current as any)!.noWrap = props.noWrap;
  }, [props.noWrap]);

  useEffect(() => {
    (elementRef.current as any)!.paragraph = props.paragraph;
  }, [props.paragraph]);

  useEffect(() => {
    (elementRef.current as any)!.gutterBottom = props.gutterBottom;
  }, [props.gutterBottom]);

  return (
    <oak-typography
      align={props.align}
      display={props.display}
      variant={props.variant}
      color={props.color}
      highlightColor={props.highlightColor}
      ref={elementRef}
    >
      {props.children}
    </oak-typography>
  );
};

export default OakTypography;
