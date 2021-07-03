import React, { useState, useEffect } from 'react';
import './FormInput.scss';

interface Props {
  name: string;
  value: string;
  type: string;
  handleChange: any;
  autoFocus?: boolean;
  id?: string;
  variant?: 'default' | 'fixed-light' | 'fixed-dark';
  radius?: 'none' | 'small' | 'medium' | 'large';
}

const FormInput = (props: Props) => {
  return (
    <input
      className={`form-input--variant-${
        props.variant || 'default'
      } form-input--radius-${props.radius || 'medium'}`}
      id={props.id}
      autoFocus={props.autoFocus || false}
      type={props.type}
      name={props.name}
      onInput={props.handleChange}
    />
  );
};

export default FormInput;
