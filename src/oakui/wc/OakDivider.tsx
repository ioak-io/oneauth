import {
  compose,
  OakDividerProps,
} from '@oakui/core-stage/style-composer/OakDividerComposer';
import React, { useState, useEffect, useRef } from 'react';

const OakDivider = (props: OakDividerProps) => {
  return <div className={compose(props)} />;
};

export default OakDivider;
