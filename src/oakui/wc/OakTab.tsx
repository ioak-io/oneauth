import React, { useState, useEffect, ReactElement, useRef } from 'react';
import { useLocation } from 'react-router';

import { TAB_CHANGE_EVENT } from '@oakui/core-stage/event/OakTabEvent';
import { AccessAlarm } from '@material-ui/icons';

interface Props {
  tabs: string[];
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'invert'
    | 'info';
  variant?: 'underline' | 'accent' | 'fill' | 'text' | 'pills';
  rounded?: boolean;
  fill?: boolean;
  nobaseline?: boolean;
  children: any;
  handleChange: any;
}

const OakTab = (props: Props) => {
  const location = useLocation();
  const elementRef = useRef();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // useEffect(() => {
  //   initializeViews();
  // }, [props.children]);

  // const initializeViews = () => {
  //   let newSlots = {};
  //   React.Children.toArray(props.children).forEach((node: any) => {
  //     newSlots = { ...newSlots, [node.props.slot]: node };
  //   });
  //   setSlots(newSlots);
  //   if (props.noBookmarking && !activeTab) {
  //     setActiveTab(Object.keys(newSlots)[0]);
  //   }
  // };

  const handleTabChange = (event: any) => {
    setActiveTabIndex(event.detail.value);
    props.handleChange(event.detail);
  };

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      TAB_CHANGE_EVENT,
      handleTabChange
    );

    return () => {
      (elementRef as any).current?.removeEventListener(
        TAB_CHANGE_EVENT,
        handleTabChange
      );
    };
  });

  useEffect(() => {
    (elementRef.current as any)!.tabs = props.tabs;
  }, [props.tabs]);

  useEffect(() => {
    (elementRef.current as any)!.fill = props.fill;
  }, [props.fill]);

  useEffect(() => {
    (elementRef.current as any)!.rounded = props.rounded;
  }, [props.rounded]);

  useEffect(() => {
    (elementRef.current as any)!.nobaseline = props.nobaseline;
  }, [props.nobaseline]);

  return (
    <oak-tab
      ref={elementRef}
      activeTabIndex={activeTabIndex}
      color={props.color}
      variant={props.variant}
    >
      <div slot="content">{props.children}</div>
    </oak-tab>
  );
};

export default OakTab;
