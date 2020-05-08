import React, { useState, useEffect } from 'react';
import './styles/oak-popover-menu.scss';
import { newId } from '../events/MessageService';
import OakIcon from './OakIcon';

interface Props {
  label?: string;
  elements: any;
  labelVariant?: string;
  theme?: string;
  right?: boolean;
  iconLeft?: string;
  iconRight?: string;
  mobilize?: boolean;
  width?: string;
  children?: any;
}

const OakPopoverMenu = (props: Props) => {
  const [show, setShow] = useState(false);
  const [slots, setSlots] = useState<any | {}>({});
  const [id, setId] = useState(newId());

  useEffect(() => {
    initializeViews();
  }, [props.children]);

  const initializeViews = () => {
    let newSlots = {};
    React.Children.toArray(props.children).forEach((node: any) => {
      newSlots = { ...newSlots, [node.props.slot]: node };
    });
    setSlots(newSlots);
  };

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      if (!document.getElementById(id)?.contains(e.target)) {
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
    <div className={`oak-popover-menu ${getStyle()}`} id={id}>
      {!slots.label && (
        <div className={`label ${labelStyle()}`} onClick={toggle}>
          {props.iconLeft && (
            <div className="left-icon">
              <OakIcon mat={props.iconLeft} />
            </div>
          )}
          <div className="label-text">{props.label}</div>
          <div className="right-icon">
            <OakIcon mat={props.iconRight} />
          </div>
        </div>
      )}
      {slots.label && (
        <div className="label-custom" onClick={toggle}>
          {slots.label}
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
            <OakIcon mat={element.icon} />
            {element.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OakPopoverMenu;
