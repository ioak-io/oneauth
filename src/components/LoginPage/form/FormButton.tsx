import React, { useState, useEffect } from 'react';
import './FormButton.scss';

interface Props {
  handleClick: any;
  children: any;
  type: 'button' | 'submit' | 'reset';
  radius?: 'none' | 'small' | 'medium' | 'large';
}

const FormButton = (props: Props) => {
  return (
    <button
      className={`form-button--radius-${props.radius || 'medium'}`}
      type={props.type}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
