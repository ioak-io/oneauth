import {
  compose,
  OakSpacingProps,
} from '@oakui/core-stage/style-composer/OakSpacingComposer';
import React, { useState, useEffect, useRef } from 'react';

interface Props extends OakSpacingProps {
  children: any;
}

const OakSpacing = (props: Props) => {
  return <div className={compose(props)}>{props.children}</div>;
};

export default OakSpacing;
