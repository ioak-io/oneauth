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
}
function OakCheckboxBack(props: Props) {
  function handleChange(event) {
    event.target.value = event.target.checked ? true : '';
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
        <div className="checkbox">
          <input type="checkbox" id="checkbox_1" />
          <label htmlFor="checkbox_1">Pure CSS Checkbox</label>
        </div>
        {/* {props.label && props.labelPosition === 'left' && <div>
                    {props.label}
                </div>} */}
        {/* <input type="checkbox" name={props.id} value={props.data[props.id]} />
                <span className="checkbox-style"></span> */}
        {/* <label className="checkbox">
          <input type="checkbox" />
          <span className="rectangular">{props.label}</span>
        </label> */}
        {/* <div className="input-title">Rectangular</div> */}
        {/* <label className="checkbox">
          <input
            type="checkbox"
            name={props.id}
            checked={props.data[props.id]}
            id={props.id}
            onChange={e => handleChange(e)}
          />
          <label className="typography-5" htmlFor={props.id}>
            {props.label}
          </label>
        </label> */}
        {/* {props.label && (!props.labelPosition || props.labelPosition === 'right') && <div>
                    {props.label}
                </div>} */}
      </div>
    </div>
  );
}

OakCheckboxBack.propTypes = {};

export default OakCheckboxBack;
