import React from 'react';
import { compose as tableCompose } from '@oakui/core-stage/style-composer/OakTableComposer';

import './style.scss';
import OakTypography from '../../oakui/wc/OakTypography';

interface Props {
  events: {
    name: string;
    description: string;
  }[];
}

const EventSection = (props: Props) => {
  return (
    <div className="event-section">
      {props.events.length > 0 && (
        <table className={tableCompose({ color: 'global' })}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.events.map((row) => (
              <tr>
                <td>{row.name}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {props.events.length === 0 && (
        <p>
          No events emitted from this component.
        </p>
      )}
    </div>
  );
};

export default EventSection;
