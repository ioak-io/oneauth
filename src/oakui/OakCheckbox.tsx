import React from 'react';
import './styles/oak-checkbox.scss';

interface Props {
  label?: string;
  id: string;
  data: any;
  handleChange: any;
  labelPosition?: 'left' | 'right';
  variant?: 'circle' | 'square';
  theme?: 'primary' | 'secondary' | 'tertiary' | 'default';
  disabled?: boolean;
}
function OakCheckbox(props: Props) {
  function handleChange(event) {
    props.handleChange(event);
  }

  function getStyle() {
    let style = props.theme ? props.theme : '';
    style += props.variant ? ` ${props.variant}` : '';
    return style;
  }

  return (
    <div className={`oak-check-box ${getStyle()}`}>
      <div className="checkbox-container">
        {/* {props.label && props.labelPosition === 'left' && <div>
                    {props.label}
                </div>} */}
        {/* <input type="checkbox" name={props.id} value={props.data[props.id]} />
                <span className="checkbox-style"></span> */}
        <label className="checkbox">
          <input
            type="checkbox"
            name={props.id}
            checked={props.data[props.id]}
            id={props.id}
            onChange={e => handleChange(e)}
            disabled={props.disabled}
          />
          <label className="typography-5" htmlFor={props.id}>
            {props.label}
          </label>
        </label>
        {/* {props.label && (!props.labelPosition || props.labelPosition === 'right') && <div>
                    {props.label}
                </div>} */}
      </div>
    </div>
  );
}

OakCheckbox.propTypes = {};

export default OakCheckbox;
