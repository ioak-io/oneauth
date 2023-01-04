import React, { useState, useEffect, ReactElement, useRef } from 'react';
import { useLocation } from 'react-router';
import { IMAGE_UPLOADED } from '@oakui/core-stage/event/OakImageUploadEvent';

interface Props {
  name?: string;
  value?: any;
  label?: string;
  toolbarPosition?: 'top' | 'bottom' | 'left' | 'right';
  aspectRatio?: number;
  initialFile?: string;
  handleChange?: any;
}

const OakImageUpload = (props: Props) => {
  const elementRef = useRef();

  const handleChange = (event: any) => {
    props.handleChange(event.detail);
  };

  useEffect(() => {
    // attachListener('change', handleChange);
    // attachListener('onSubmit', handleSubmit);
    (elementRef as any).current.addEventListener(IMAGE_UPLOADED, handleChange);

    return () => {
      (elementRef as any).current?.removeEventListener(
        IMAGE_UPLOADED,
        handleChange
      );
    };
  });

  return (
    <oak-image-upload
      ref={elementRef}
      name={props.name}
      label={props.label}
      initialFile={props.initialFile}
      aspectRatio={props.aspectRatio}
      toolbarPosition={props.toolbarPosition}
    />
  );
};

export default OakImageUpload;
