import React, { useState } from 'react';
import './styles/oak-select-slide.scss';

interface Props {
  id: string;
  label?: string;
  handleChange: Function;
  error?: boolean;
  data: any;
  elements?: string[];
  objects?: Array<any>;
  first?: string;
  firstAction?: string;
  variant?: 'outline' | 'no-outline' | 'block' | 'normal';
  theme?: 'primary' | 'secondary' | 'tertiary' | 'default';
  width?: 'width-25' | 'width-50' | 'width-75' | 'width-100';
}

const OakSelect = (props: Props) => {
  const [show, setShow] = useState(false);

  const changeSelection = (e, newValue) => {
    e.target.name = props.id;
    e.target.value = newValue;
    props.handleChange(e);
    setShow(!show);
  };

  const getStyle = () => {
    let style = props.theme ? props.theme : '';
    style += props.variant ? ` ${props.variant}` : '';
    style += props.width ? ` ${props.width}` : '';

    return style;
  };

  let dropdownList: Array<any> = [];

  if (props.elements) {
    dropdownList = props.elements.map(item => (
      <div
        className="option"
        key={item}
        onClick={e => changeSelection(e, item)}
      >
        {item}
      </div>
    ));
  } else if (props.objects) {
    dropdownList = props.objects.map(item => (
      <div
        className="option"
        key={item.key}
        onClick={e => changeSelection(e, item.key)}
      >
        {item.value}
      </div>
    ));
  }

  return (
    <>
      <div className={`oak-select ${getStyle()}`}>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <div
          className="select-button"
          id={props.id}
          onClick={() => setShow(!show)}
        >
          {props.elements && <div>{props.data[props.id]}</div>}
          {props.objects && (
            <div>
              {props.objects.find(
                element => element.key === props.data[props.id]
              ) &&
                props.objects?.find(
                  element => element.key === props.data[props.id]
                ).value}
            </div>
          )}
          {/* {this.props.objects && <div>{this.props.objects[0].value}</div>} */}
          <div>
            <i className="material-icons">keyboard_arrow_down</i>
          </div>
        </div>
        <div className={show ? 'dropdown show' : 'dropdown hide'}>
          <div className="dropdown-content">
            {props.first && (
              <div
                className="option"
                onClick={e => changeSelection(e, props.first)}
              >
                {props.first}
              </div>
            )}
            {props.firstAction && (
              <div
                className="option"
                onClick={e => changeSelection(e, props.firstAction)}
              >
                {props.firstAction}
              </div>
            )}
            {dropdownList}
          </div>
        </div>
      </div>
    </>
  );
};

export default OakSelect;
