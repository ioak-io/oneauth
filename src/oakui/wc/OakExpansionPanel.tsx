import {
  PANEL_COLLAPSED_EVENT,
  PANEL_EXPANDED_EVENT,
} from '@oakui/core-stage/event/OakExpansionPanelEvent';
import React, { useState, useEffect, ReactElement, useRef } from 'react';

interface Props {
  children: any;
  name?: string;
  groupName?: string;
  rounded?: boolean;
  outlined?: boolean;
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
  handleChange?: any;
}

const OakExpansionPanel = (props: Props) => {
  const elementRef = useRef();

  const handleChange = (event: any) => {
    if (props.handleChange) {
      const { detail } = event;
      props.handleChange(detail);
    }
  };

  useEffect(() => {
    (elementRef.current as any)!.rounded = props.rounded;
  }, [props.rounded]);

  useEffect(() => {
    (elementRef.current as any)!.outlined = props.outlined;
  }, [props.outlined]);

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      PANEL_COLLAPSED_EVENT,
      handleChange
    );
    (elementRef as any).current.addEventListener(
      PANEL_EXPANDED_EVENT,
      handleChange
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        PANEL_COLLAPSED_EVENT,
        handleChange
      );
      (elementRef as any).current?.removeEventListener(
        PANEL_EXPANDED_EVENT,
        handleChange
      );
    };
  });

  return (
    <oak-expansion-panel
      ref={elementRef}
      elevation={props.elevation}
      name={props.name}
      groupName={props.groupName}
    >
      {props.children}
    </oak-expansion-panel>
  );
};

export default OakExpansionPanel;
