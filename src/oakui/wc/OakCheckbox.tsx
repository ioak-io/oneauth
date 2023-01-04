import {
  INPUT_CHANGE_EVENT,
  INPUT_INPUT_EVENT,
} from '@oakui/core-stage/event/OakInputEvent';
import React, { useState, useEffect, ReactElement, useRef } from 'react';
import { useLocation } from 'react-router';

interface Props {
  name: string;
  value: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'invert'
    | 'info';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  handleChange?: any;
  children?: any;
  gutterBottom?: boolean;
  checkboxGroupName?: string;
}

const OakCheckbox = (props: Props) => {
  const location = useLocation();
  const elementRef = useRef();

  const handleChange = (event: any) => {
    if (props.handleChange) {
      const { detail } = event;
      props.handleChange(detail);
    }
  };

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      INPUT_CHANGE_EVENT,
      handleChange
    );
    (elementRef as any).current.addEventListener(
      INPUT_INPUT_EVENT,
      handleChange
    );
    return () => {
      (elementRef as any).current?.removeEventListener(
        INPUT_CHANGE_EVENT,
        handleChange
      );
      (elementRef as any).current?.removeEventListener(
        INPUT_INPUT_EVENT,
        handleChange
      );
    };
  });

  useEffect(() => {
    (elementRef.current as any)!.value = props.value;
  }, [props.value]);

  useEffect(() => {
    (elementRef.current as any)!.gutterBottom = props.gutterBottom;
  }, [props.gutterBottom]);

  return (
    <oak-checkbox
      ref={elementRef}
      name={props.name}
      color={props.color}
      size={props.size}
      checkboxGroupName={props.checkboxGroupName}
    >
      {props.children}
    </oak-checkbox>
  );
};

export default OakCheckbox;
