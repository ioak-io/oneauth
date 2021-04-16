import React, { useState, useEffect, ReactElement, useRef } from 'react';

interface Props {
  children: any;
  name?: string;
  groupName?: string;
  parentName?: string;
  parentGroupName?: string;
  level?: 1 | 2 | 3;
  defaultState?: 'expanded' | 'collapsed';
}

const OakNavGroup = (props: Props) => {
  const elementRef = useRef();

  return (
    <oak-nav-group
      ref={elementRef}
      name={props.name}
      groupName={props.groupName}
      level={props.level}
      parentName={props.parentName}
      parentGroupName={props.parentGroupName}
      defaultState={props.defaultState}
    >
      {props.children}
    </oak-nav-group>
  );
};

export default OakNavGroup;
