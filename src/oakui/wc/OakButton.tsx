import React, { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BUTTON_CLICK_EVENT } from '@oakui/core-stage/event/OakButtonEvent';

interface Props {
  handleClick?: any;
  variant?:
    | 'block'
    | 'outline'
    | 'appear'
    | 'disappear'
    | 'regular'
    | 'disabled'
    | 'drama'
    | 'semi-transparent-1'
    | 'semi-transparent-2';
  theme?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info';
  semitransparent?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  shape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf' | 'icon';
  align?: 'left' | 'right' | 'center';
  fullWidth?: boolean;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  formGroupName?: string;
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
}

const OakButton = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);

  const elementRef = useRef();

  const handleClick = (event: any) => {
    console.log('**click');
    props.handleClick(event);
  };

  const handleSubmit = (event: any) => {
    console.log('**submit');
    props.handleClick(event);
  };

  useEffect(() => {
    (elementRef.current as any)!.fullWidth = props.fullWidth;
  }, [props.fullWidth]);

  useEffect(() => {
    (elementRef.current as any)!.semitransparent = props.semitransparent;
  }, [props.semitransparent]);

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      BUTTON_CLICK_EVENT,
      handleClick
    );
    (elementRef as any).current.addEventListener('onSubmit', handleSubmit);

    return () => {
      (elementRef as any).current?.removeEventListener(
        BUTTON_CLICK_EVENT,
        handleClick
      );
      (elementRef as any).current?.removeEventListener(
        'onSubmit',
        handleSubmit
      );
    };
  });

  return (
    <oak-button
      ref={elementRef}
      theme={props.theme}
      variant={props.variant}
      size={props.size}
      shape={props.shape}
      type={props.type}
      visualmode={profile.theme === 'theme_dark' ? 'dark' : 'light'}
      elevation={props.elevation}
      formGroupName={props.formGroupName}
    >
      {props.children}
    </oak-button>
  );
};

export default OakButton;
