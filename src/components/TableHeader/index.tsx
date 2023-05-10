/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

interface Props {
  sortPref: any;
  handleChange: any;
  name: string;
  label: string;
}

const TableHeader = (props: Props) => {
  return (
    <button
      onClick={() => props.handleChange(props.name)}
      className="button table-header"
    >
      <div>{props.label}</div>
      {props.sortPref.sortBy === props.name && (
        <div>
          <FontAwesomeIcon
            icon={
              props.sortPref.sortOrder === 'ascending'
                ? faChevronUp
                : faChevronDown
            }
          />
        </div>
      )}
    </button>
  );
};

export default TableHeader;
