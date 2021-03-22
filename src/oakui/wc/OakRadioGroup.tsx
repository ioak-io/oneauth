import {
  INPUT_CHANGE_EVENT,
  INPUT_INPUT_EVENT,
} from '@oakui/core-stage/event/OakInputEvent';
import React, { useState, useEffect, ReactElement, useRef } from 'react';
import { useLocation } from 'react-router';

interface Props {
  name: string;
  label?: string;
  tooltip?: string;
  children: any;
  radioGroupName: string;
  formGroupName?: string;
  gutterBottom?: boolean;
  handleChange?: any;
  value: string;
  validatorFunction?: Function;
}

const OakRadioGroup = (props: Props) => {
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
    (elementRef.current as any)!.gutterBottom = props.gutterBottom;
  }, [props.gutterBottom]);

  useEffect(() => {
    (elementRef.current as any)!.validatorFunction = props.validatorFunction;
  }, [props.validatorFunction]);

  return (
    <oak-radio-group
      ref={elementRef}
      name={props.name}
      label={props.label}
      tooltip={props.tooltip}
      formGroupName={props.formGroupName}
      radioGroupName={props.radioGroupName}
      value={props.value}
    >
      {props.children}
    </oak-radio-group>
  );
};

export default OakRadioGroup;
