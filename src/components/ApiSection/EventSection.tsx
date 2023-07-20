import React from 'react';

import './style.scss';

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
        <table className="">
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
