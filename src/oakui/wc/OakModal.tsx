import React, { useEffect, ReactNode, useState, useRef } from 'react';
import ModalEventTypes from '@oakui/core-stage/event/OakModalEvent';

interface Props {
  isOpen: boolean;
  handleClose: any;
  heading?: string;
  children?: ReactNode;
  fullscreen?: boolean;
  rounded?: boolean;
  noheader?: boolean;
  donotMobilize?: boolean;
  width?: 'auto' | 'small' | 'medium' | 'large' | 'full';
  height?: 'auto' | 'small' | 'medium' | 'large' | 'full';
  backdropIntensity?: 0 | 1 | 2 | 3 | 4 | 5;
  animationSpeed?: 'slow' | 'normal' | 'fast' | 'none';
  animationStyle?: 'opacity' | 'zoom' | 'slide';
  color?:
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
}

const OakModal = (props: Props) => {
  const elementRef = useRef();
  const [slots, setSlots] = useState<any>({});

  useEffect(() => {
    // attachListener('change', handleChange);
    // attachListener('onSubmit', handleSubmit);
    (elementRef as any).current.addEventListener(
      ModalEventTypes.CLOSE_MODAL,
      props.handleClose
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        ModalEventTypes.CLOSE_MODAL,
        props.handleClose
      );
    };
  });

  useEffect(() => {
    let newSlots = {};
    React.Children.toArray(props.children).forEach((node: any) => {
      newSlots = { ...newSlots, [node.props.slot]: node };
    });
    console.log(newSlots);
    setSlots(newSlots);
  }, [props.children]);

  useEffect(() => {
    (elementRef.current as any)!.isOpen = props.isOpen;
  }, [props.isOpen]);

  useEffect(() => {
    (elementRef.current as any)!.rounded = props.rounded;
  }, [props.rounded]);

  return (
    <oak-modal
      ref={elementRef}
      heading={props.heading}
      elevation={props.elevation}
      paddingHorizontal={props.paddingHorizontal}
      paddingVertical={props.paddingVertical}
      color={props.color}
      backdropIntensity={props.backdropIntensity}
      animationSpeed={props.animationSpeed}
      animationStyle={props.animationStyle}
      width={props.width}
      height={props.height}
    >
      {slots.body}
      {slots.footer}
    </oak-modal>
  );
};

export default OakModal;
