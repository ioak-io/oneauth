import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  INPUT_CHANGE_EVENT,
  INPUT_INPUT_EVENT,
  INPUT_SUBMIT_EVENT,
  FILE_SELECTED_EVENT,
} from '@oakui/core-stage/event/OakInputEvent';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  value: any;
  formGroupName?: string;
  handleChange?: any;
  handleInput?: any;
  handleSubmit?: any;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  regexp?: object;
  validatorFunction?: Function;
  tooltip?: string;
  type?:
    | 'text'
    | 'textarea'
    | 'richtext'
    | 'number'
    | 'password'
    | 'date'
    | 'file'
    | 'time'
    | 'datetime'
    | 'color';
  multiple?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  shape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf' | 'underline';
  color?: 'global' | 'container' | 'surface' | 'float' | 'invert' | 'none';
  fill?: boolean;
  errorStyle?: 'outline' | 'fill';
  gutterBottom?: boolean;
  disabled?: boolean;
}
const OakInput = (props: Props) => {
  const elementRef = useRef();

  const handleChange = (event: any) => {
    if (props.handleChange) {
      const { detail } = event;
      props.handleChange(detail);
    }
  };

  const handleInput = (event: any) => {
    if (props.handleInput) {
      const { detail } = event;
      props.handleInput(detail);
    }
  };

  const handleFileSelection = (event: any) => {
    handleInput(event);
    handleChange(event);
  };

  const handleSubmit = (event: { detail: any }) => {
    if (props.handleSubmit) {
      const { detail } = event;
      props.handleSubmit(detail);
    }
  };

  useEffect(() => {
    // attachListener('change', handleChange);
    // attachListener('onSubmit', handleSubmit);
    (elementRef as any).current.addEventListener(
      INPUT_CHANGE_EVENT,
      handleChange
    );
    (elementRef as any).current.addEventListener(
      INPUT_INPUT_EVENT,
      handleInput
    );
    (elementRef as any).current.addEventListener(
      INPUT_SUBMIT_EVENT,
      handleSubmit
    );
    (elementRef as any).current.addEventListener(
      FILE_SELECTED_EVENT,
      handleFileSelection
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        INPUT_CHANGE_EVENT,
        handleChange
      );
      (elementRef as any).current?.removeEventListener(
        INPUT_INPUT_EVENT,
        handleInput
      );
      (elementRef as any).current?.removeEventListener(
        INPUT_SUBMIT_EVENT,
        handleSubmit
      );
      (elementRef as any).current?.removeEventListener(
        FILE_SELECTED_EVENT,
        handleFileSelection
      );
    };
  });

  useEffect(() => {
    (elementRef.current as any)!.disabled = props.disabled;
  }, [props.disabled]);

  useEffect(() => {
    (elementRef.current as any)!.regexp = props.regexp;
  }, [props.regexp]);

  useEffect(() => {
    (elementRef.current as any)!.value = props.value;
  }, [props.value]);

  useEffect(() => {
    (elementRef.current as any)!.gutterBottom = props.gutterBottom;
  }, [props.gutterBottom]);

  useEffect(() => {
    (elementRef.current as any)!.fill = props.fill;
  }, [props.fill]);

  useEffect(() => {
    (elementRef.current as any)!.validatorFunction = props.validatorFunction;
  }, [props.validatorFunction]);

  return (
    <oak-input
      ref={elementRef}
      label={props.label}
      name={props.name}
      placeholder={props.placeholder}
      formGroupName={props.formGroupName}
      minLength={props.minLength}
      maxLength={props.maxLength}
      min={props.min}
      max={props.max}
      tooltip={props.tooltip}
      type={props.type}
      multiple={props.multiple}
      size={props.size}
      shape={props.shape}
      color={props.color}
      errorStyle={props.errorStyle}
    />
  );
};

export default OakInput;
