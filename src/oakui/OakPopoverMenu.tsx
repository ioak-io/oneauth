import React, { useState, useEffect } from 'react';
import './styles/oak-popover-menu.scss';

interface Props {
  id: string;
  label: string;
  elements: any;
  labelVariant?: string;
  theme?: string;
  right?: boolean;
  iconLeft?: string;
  iconRight?: string;
  mobilize?: boolean;
  width?: string;
}

const OakPopoverMenu = (props: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      if (!document.getElementById(props.id)?.contains(e.target)) {
        setShow(false);
      }
    });
  });

  const toggle = () => {
    setShow(!show);
  };

  const getStyle = () => {
    let style = props.theme ? props.theme : '';
    style += props.labelVariant ? ` ${props.labelVariant}` : '';
    style += props.width ? ` ${props.width}` : '';
    return style;
  };
  const dropdownContentStyle = () => {
    let style = show ? 'show' : 'hide';
    style += props.right ? ' right' : '';
    return style;
  };
  const labelStyle = () => {
    let style = show ? 'active' : '';
    style += props.mobilize ? ' short-label' : '';
    return style;
  };

  return (
    <div className={`oak-popover-menu ${getStyle()}`} id={props.id}>
      {props.label && (
        <div className={`label ${labelStyle()}`} onClick={toggle}>
          {props.iconLeft && (
            <div className="left-icon">
              <i className="material-icons">{props.iconLeft}</i>
            </div>
          )}
          <div className="label-text">{props.label}</div>
          <div className="right-icon">
            <i className="material-icons">{props.iconRight}</i>
          </div>
        </div>
      )}
      {!props.label && (
        <div className="label-custom" onClick={toggle}>
          {/* <slot name="label"></slot> */}
        </div>
      )}
      <div
        className={`dropdown-content ${dropdownContentStyle()}`}
        onClick={toggle}
      >
        {props.elements.map(element => (
          <div
            v-for="element in elements"
            key={element.label}
            className="element"
            onClick={element.action}
          >
            <i v-if="element.icon" className="material-icons">
              {element.icon}
            </i>
            {element.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OakPopoverMenu;
