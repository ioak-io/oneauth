import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import './style.scss';
import PropertySection from './PropertySection';
import EventSection from './EventSection';

interface Props {
  data: {
    properties: {
      name: string;
      type: string;
      default?: string;
      description: string;
    }[];
    events: {
      name: string;
      description: string;
    }[];
  };
}

const ApiSection = (props: Props) => {
  return (
    <div className="api-section">
      <h5>
        Properties
      </h5>
      <PropertySection properties={props.data.properties} />
      <h5>Events</h5>
      <EventSection events={props.data.events} />
    </div>
  );
};

export default ApiSection;
