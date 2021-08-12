import React, { useEffect, useRef, useState } from 'react';
import { INFINITE_SCROLL_CHANGE_EVENT } from '@oakui/core-stage/event/OakInfiniteScrollEvent';

interface Props {
  customSelector?: string;
  variant?: 'auto-selector' | 'custom-selector' | 'body-selector';
  children?: any;
  handleChange: any;
}

const OakInfiniteScroll = (props: Props) => {
  const elementRef = useRef();

  const handleChange = (event: any) => {
    if (props.handleChange) {
      const { detail } = event;
      props.handleChange(detail);
    }
  };

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      INFINITE_SCROLL_CHANGE_EVENT,
      handleChange
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        INFINITE_SCROLL_CHANGE_EVENT,
        handleChange
      );
    };
  });

  return (
    <oak-infinite-scroll
      ref={elementRef}
      variant={props.variant}
      customSelector={props.customSelector}
    >
      {props.children}
    </oak-infinite-scroll>
  );
};

export default OakInfiniteScroll;
