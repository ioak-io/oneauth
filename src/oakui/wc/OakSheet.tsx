import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import OakSheetEvent from '@oakui/core-stage/event/OakSheetEvent';

interface Props {
  isOpen: boolean;
  position?: 'left' | 'right' | 'middle' | 'top' | 'bottom';
  fillColor?:
    | 'global'
    | 'container'
    | 'surface'
    | 'float'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'invert';
  sizeHorizontal?: 'one-third' | 'half' | 'two-third' | 'full' | 'auto';
  sizeVertical?: 'one-third' | 'half' | 'two-third' | 'full' | 'auto';
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
  paddingHorizontal?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  paddingVertical?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  backdropIntensity?: 0 | 1 | 2 | 3 | 4 | 5;
  children: any;
  handleClose: Function;
}
const OakSheet = (props: Props) => {
  const elementRef = useRef();

  const handleClose = (event: any) => {
    const { detail } = event;
    props.handleClose(detail);
  };

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      OakSheetEvent.SHEET_CLOSE,
      handleClose
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        OakSheetEvent.SHEET_CLOSE,
        handleClose
      );
    };
  });

  useEffect(() => {
    (elementRef.current as any)!.isOpen = props.isOpen;
  }, [props.isOpen]);

  useEffect(() => {
    (elementRef.current as any)!.outlined = props.outlined;
  }, [props.outlined]);

  return (
    <oak-sheet
      ref={elementRef}
      elevation={props.elevation}
      fillColor={props.fillColor}
      sizeHorizontal={props.sizeHorizontal}
      sizeVertical={props.sizeVertical}
      paddingHorizontal={props.paddingHorizontal}
      paddingVertical={props.paddingVertical}
      backdropIntensity={props.backdropIntensity}
      position={props.position}
    >
      {props.children}
    </oak-sheet>
  );
};

export default OakSheet;
