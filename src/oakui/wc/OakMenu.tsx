import React, { useState, useEffect, ReactElement, useRef } from 'react';
import { useLocation } from 'react-router';
import { compose } from '@oakui/core-stage/style-composer/OakMenuComposer';

interface Props {
  children: any;
}

const OakMenu = (props: Props) => {
  const location = useLocation();
  const elementRef = useRef();
  const [activeTab, setActiveTab] = useState('');

  return (
    <oak-menu ref={elementRef}>
      <button type="button" slot="menu-trigger">
        menu
      </button>
      <div slot="menu-popup" className={compose({})}>
        {props.children}
      </div>
    </oak-menu>
  );
};

export default OakMenu;
