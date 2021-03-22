import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import OakAppLayoutEvent from '@oakui/core-stage/event/OakAppLayoutEvent';

interface Props {
  topbarVariant?: 'sticky' | 'static' | 'auto';
  sidebarVariant?: 'side' | 'over' | 'push';
  topbarColor?:
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
    | 'invert'
    | 'custom';
  sidebarColor?:
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
    | 'invert'
    | 'custom';
  topbarElevation?:
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
  sidebarElevation?:
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
  children: any;
}
const OakAppLayout = (props: Props) => {
  const elementRef = useRef();

  return (
    <oak-app-layout
      ref={elementRef}
      topbarVariant={props.topbarVariant}
      topbarColor={props.topbarColor}
      topbarElevation={props.topbarElevation}
      sidebarVariant={props.sidebarVariant}
      sidebarColor={props.sidebarColor}
      sidebarElevation={props.sidebarElevation}
    >
      {props.children}
    </oak-app-layout>
  );
};

export default OakAppLayout;
