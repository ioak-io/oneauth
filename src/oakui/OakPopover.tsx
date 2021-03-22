import React from 'react';

interface Props {
  children?: any;
}

const OakPopover = (props: Props) => {
  return <oak-popover>{props.children}</oak-popover>;
};

export default OakPopover;
