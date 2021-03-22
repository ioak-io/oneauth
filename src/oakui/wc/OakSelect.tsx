import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  INPUT_CHANGE_EVENT,
  INPUT_INPUT_EVENT,
} from '@oakui/core-stage/event/OakInputEvent';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  value: any;
  formGroupName?: string;
  handleChange?: any;
  handleInput?: any;
  tooltip?: string;
  multiple?: boolean;
  disabled?: boolean;
  options?: any[];
  optionsAsKeyValue?: any[];
  native?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  shape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf';
  fill?: 'container' | 'surface' | 'float' | 'none';
  gutterBottom?: boolean;
  autoCompleteVariant?: 'none' | 'autocomplete' | 'searchbox';
}

const OakSelect = (props: Props) => {
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

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      INPUT_CHANGE_EVENT,
      handleChange
    );
    (elementRef as any).current.addEventListener(
      INPUT_INPUT_EVENT,
      handleInput
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
    };
  });

  useEffect(() => {
    (elementRef.current as any)!.multiple = props.multiple;
  }, [props.multiple]);

  useEffect(() => {
    (elementRef.current as any)!.disabled = props.disabled;
  }, [props.disabled]);

  useEffect(() => {
    (elementRef.current as any)!.native = props.native;
  }, [props.native]);

  useEffect(() => {
    (elementRef.current as any)!.gutterBottom = props.gutterBottom;
  }, [props.gutterBottom]);

  useEffect(() => {
    (elementRef.current as any)!.options = props.options;
  }, [props.options]);

  useEffect(() => {
    (elementRef.current as any)!.optionsAsKeyValue = props.optionsAsKeyValue;
  }, [props.optionsAsKeyValue]);

  return (
    <oak-select
      ref={elementRef}
      formGroupName={props.formGroupName}
      label={props.label}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      tooltip={props.tooltip}
      multiple={props.multiple}
      size={props.size}
      shape={props.shape}
      fill={props.fill}
      autoCompleteVariant={props.autoCompleteVariant}
    />
  );
};

export default OakSelect;
