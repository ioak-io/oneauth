import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  SELECT_CHANGE_EVENT,
  SELECT_INPUT_EVENT,
  SELECT_ACTION_ITEM_EVENT,
} from '@oakui/core-stage/event/OakSelectEvent';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  value: any;
  formGroupName?: string;
  handleChange?: any;
  handleInput?: any;
  handleActionItem?: any;
  tooltip?: string;
  multiple?: boolean;
  disabled?: boolean;
  options?: any[];
  optionsAsKeyValue?: any[];
  actionItems?: string[];
  native?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  shape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf' | 'underline';
  color?:
    | 'global'
    | 'container'
    | 'surface'
    | 'float'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'info'
    | 'invert'
    | 'danger'
    | 'warning'
    | 'success'
    | 'none';
  popupColor?:
    | 'global'
    | 'container'
    | 'surface'
    | 'float'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'info'
    | 'invert'
    | 'danger'
    | 'warning'
    | 'success'
    | 'auto';
  fill?: boolean;
  gutterBottom?: boolean;
  autocomplete?: boolean;
  positioningStrategy?: 'absolute' | 'fixed';
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

  const handleActionItem = (event: any) => {
    if (props.handleActionItem) {
      const { detail } = event;
      props.handleActionItem(detail);
    }
  };

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      SELECT_CHANGE_EVENT,
      handleChange
    );
    (elementRef as any).current.addEventListener(
      SELECT_INPUT_EVENT,
      handleInput
    );
    (elementRef as any).current.addEventListener(
      SELECT_ACTION_ITEM_EVENT,
      handleActionItem
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        SELECT_CHANGE_EVENT,
        handleChange
      );
      (elementRef as any).current?.removeEventListener(
        SELECT_INPUT_EVENT,
        handleInput
      );
      (elementRef as any).current?.removeEventListener(
        SELECT_ACTION_ITEM_EVENT,
        handleActionItem
      );
    };
  });

  useEffect(() => {
    (elementRef.current as any)!.value = props.value;
  }, [props.value]);

  useEffect(() => {
    (elementRef.current as any)!.autocomplete = props.autocomplete;
  }, [props.autocomplete]);

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
    (elementRef.current as any)!.fill = props.fill;
  }, [props.fill]);

  useEffect(() => {
    (elementRef.current as any)!.options = props.options;
  }, [props.options]);

  useEffect(() => {
    (elementRef.current as any)!.optionsAsKeyValue = props.optionsAsKeyValue;
  }, [props.optionsAsKeyValue]);

  useEffect(() => {
    (elementRef.current as any)!.actionItems = props.actionItems;
  }, [props.actionItems]);

  return (
    <oak-select
      ref={elementRef}
      formGroupName={props.formGroupName}
      label={props.label}
      name={props.name}
      placeholder={props.placeholder}
      tooltip={props.tooltip}
      multiple={props.multiple}
      size={props.size}
      shape={props.shape}
      color={props.color}
      popupColor={props.popupColor}
      positioningStrategy={props.positioningStrategy}
    />
  );
};

export default OakSelect;
