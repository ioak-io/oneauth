import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  FORM_SUBMIT_EVENT,
  FORM_RESET_EVENT,
} from '@oakui/core-stage/event/OakFormEvent';
// import { OakForm as OakFormTag } from '@oakui/core-stage/components/public/oak-form';

interface Props {
  handleSubmit: any;
  handleReset?: any;
  children: any;
  formGroupName: string;
}
const OakForm = (props: Props) => {
  const elementRef = useRef();

  const handleSubmit = (event: any) => {
    event.detail.validationResults.forEach((item: any) => {
      console.log(item.formControlValue, typeof item.formControlValue);
    });
    if (props.handleSubmit) {
      const { detail } = event;
      props.handleSubmit(detail);
    }
  };

  const handleReset = (event: any) => {
    console.log(event);
    if (props.handleReset) {
      const { detail } = event;
      props.handleReset(detail);
    }
  };

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      FORM_SUBMIT_EVENT,
      handleSubmit
    );

    (elementRef as any).current.addEventListener(FORM_RESET_EVENT, handleReset);

    return () => {
      (elementRef as any).current?.removeEventListener(
        FORM_SUBMIT_EVENT,
        handleSubmit
      );
      (elementRef as any).current?.removeEventListener(
        FORM_RESET_EVENT,
        handleReset
      );
    };
  });

  return (
    <oak-form formGroupName={props.formGroupName} ref={elementRef}>
      {props.children}
    </oak-form>
  );
};

export default OakForm;
