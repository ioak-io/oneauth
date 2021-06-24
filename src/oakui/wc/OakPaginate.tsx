import React, { useState, useEffect, useRef } from 'react';
import { PAGINATE_CHANGE_EVENT } from '@oakui/core-stage/event/OakPaginateEvent';
import { PaginatePref } from '@oakui/core-stage/types/PaginatePrefType';

interface Props {
  totalRows?: number;
  label?: string;
  color?: 'global' | 'container' | 'surface' | 'float' | 'none';
  formElementSize?: 'xsmall' | 'small' | 'medium' | 'large';
  formElementShape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf' | 'underline';
  paginatePref?: PaginatePref;
  variant?: 'list' | 'table' | 'dense-table';
  handleChange?: any;
}

const OakPaginate = (props: Props) => {
  const elementRef = useRef();
  const [slots, setSlots] = useState<any>({});

  useEffect(() => {
    (elementRef.current as any)!.paginatePref = props.paginatePref;
  }, [props.paginatePref]);

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      PAGINATE_CHANGE_EVENT,
      handleChange
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        PAGINATE_CHANGE_EVENT,
        handleChange
      );
    };
  });

  const handleChange = (event: any) => {
    if (props.handleChange) {
      const { detail } = event;
      console.log(detail);
      props.handleChange(detail);
    }
  };

  return (
    <oak-paginate
      label={props.label}
      totalRows={props.totalRows}
      color={props.color}
      formElementSize={props.formElementSize}
      formElementShape={props.formElementShape}
      variant={props.variant}
      ref={elementRef}
    />
  );
};

export default OakPaginate;
