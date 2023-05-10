import React from 'react';
import { compose as tableCompose } from '@oakui/core-stage/style-composer/OakTableComposer';

import './style.scss';

interface Props {
  properties: {
    name: string;
    type: string;
    default?: string;
    description: string;
  }[];
}

const PropertySection = (props: Props) => {
  return (
    <div className="property-section">
      <table className={tableCompose({ color: 'global' })}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.properties.map((row) => (
            <tr>
              <td>{row.name}</td>
              <td dangerouslySetInnerHTML={{ __html: row.type || '' }} />
              <td>{row.default}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertySection;
