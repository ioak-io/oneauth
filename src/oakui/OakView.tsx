import React from 'react';

interface Props {
  main?: any;
  side?: any;
  children?: any;
}

const OakView = (props: Props) => {
  return <div data-test="oak-view-root">{props.children}</div>;
};

export default OakView;
