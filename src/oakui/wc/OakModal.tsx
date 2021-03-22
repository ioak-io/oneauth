import React, { useEffect, ReactNode, useState, useRef } from 'react';
import ModalEventTypes from '@oakui/core-stage/event/OakModalEvent';

interface Props {
  showModal: boolean;
  handleClose: any;
  heading?: string;
  children?: ReactNode;
  fullscreen?: boolean;
  noheader?: boolean;
  donotMobilize?: boolean;
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
    (elementRef.current as any)!.showModal = props.showModal;
  }, [props.showModal]);

  return (
    <oak-modal ref={elementRef} heading={props.heading}>
      {slots.body}
      {slots.footer}
    </oak-modal>
  );
};

export default OakModal;
