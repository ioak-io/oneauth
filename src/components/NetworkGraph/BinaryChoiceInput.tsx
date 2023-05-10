/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from 'react';

import './BinaryChoiceInput.scss';

interface Props {
  label: string;
  value: boolean;
  handleUpdate: any;
}

const BinaryChoiceInput = (props: Props) => {
  return (
    <div className="binary-choice-input">
      <div className="binary-choice-input__text">{props.label}</div>
      <div className="binary-choice-input__action">
        <button
          className={`button binary-choice-input__action__button ${
            props.value ? 'binary-choice-input__action__button--active' : ''
          }`}
          onClick={() => props.handleUpdate(true)}
        >
          Yes
        </button>
        <button
          className={`button binary-choice-input__action__button ${
            props.value ? '' : 'binary-choice-input__action__button--active'
          }`}
          onClick={() => props.handleUpdate(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default BinaryChoiceInput;
