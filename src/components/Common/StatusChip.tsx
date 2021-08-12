import React from 'react';
import './style.scss';

interface Props {
  label: string;
  icon: string;
  color:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'failure';
}

const StatusChip = (props: Props) => {
  return (
    <div className="status-chip-container">
      <div className={`status-chip ${props.color}`}>
        <i className="material-icons">{props.icon}</i>
        {props.label}
      </div>
    </div>
  );
};

export default StatusChip;
