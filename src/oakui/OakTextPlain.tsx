import React from 'react';
import './styles/oak-text-plain.scss';

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
const OakTextPlain = (props: Props) => {
  const handleFocus = () => {
    if (props.handleFocus) {
      props.handleFocus();
    }
  };
  return (
    <div className="oak-text-plain">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
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
          placeholder={props.placeholder}
        />
      )}
      {/* rows={props.rows ? props.rows : 4} */}
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
      {/* {props.multiline && <div contentEditable={props.disabled ? false : true} suppressContentEditableWarning={true}
                className={"textarea " + (props.errorFields && props.errorFields[props.id] ? "error" : "") + (props.disabled ? " disabled" : "")}
                onBlur={handleChange}>{props.data[props.id]}</div>} */}
    </div>
  );
};

export default OakTextPlain;
