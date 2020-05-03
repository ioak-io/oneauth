import React from 'react';
import './styles/oak-text-slide.scss';

interface Props {
  label?: string;
  id: string;
  data: any;
  type?: string;
  handleChange: any;
  errorFields?: any;
  disabled?: boolean;
  rows?: number;
  multiline?: boolean;
  handleFocus?: Function;
  placeholder?: string;
}
const OakText = (props: Props) => {
  const handleFocus = () => {
    if (props.handleFocus) {
      props.handleFocus();
    }
  };
  return (
    <div className="oak-text">
      {!props.multiline && (
        <input
          disabled={props.disabled}
          autoComplete="off"
          className={
            (props.errorFields && props.errorFields[props.id] ? 'error' : '') +
            (props.disabled ? ' disabled' : '')
          }
          type={props.type ? props.type : 'text'}
          name={props.id}
          id={props.id}
          value={props.data[props.id]}
          onChange={props.handleChange}
          onFocus={handleFocus}
        />
      )}
      {props.multiline && (
        <textarea
          disabled={props.disabled}
          className={
            (props.errorFields && props.errorFields[props.id] ? 'error' : '') +
            (props.disabled ? ' disabled' : '')
          }
          id={props.id}
          name={props.id}
          value={props.data[props.id]}
          onChange={props.handleChange}
        />
      )}
      <label
        htmlFor={props.id}
        className={props.data[props.id] ? 'active' : ''}
      >
        {props.label}
      </label>
    </div>
  );
};

export default OakText;
