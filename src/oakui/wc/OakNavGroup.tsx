import React, { useState, useEffect, ReactElement, useRef } from 'react';

interface Props {
  children: any;
  name?: string;
  groupName?: string;
  level?: 1 | 2 | 3;
}

const OakNavGroup = (props: Props) => {
  const elementRef = useRef();

  return (
    <oak-nav-group
      ref={elementRef}
      name={props.name}
      groupName={props.groupName}
      level={props.level}
    >
      {props.children}
    </oak-nav-group>
  );
};

export default OakNavGroup;
