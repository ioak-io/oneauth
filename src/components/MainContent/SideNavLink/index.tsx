import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import { usePopper } from 'react-popper';
import './style.scss';
import { newId } from '../../../events/MessageService';

interface Props {
  children?: any;
  link: string;
  active?: boolean;
  icon: any;
  label: string;
}

const SideNavLink = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);
  const [elementId, setElementId] = useState(newId());
  const [popperInstance, setPopperInstance] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const popcorn = document.getElementById(`${elementId}-button`);
    const tooltip = document.getElementById(`${elementId}-popup`);

    if (popcorn && tooltip) {
      const _popperInstance = createPopper(popcorn, tooltip, {
        strategy: 'fixed',
        placement: 'right-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 20],
            },
          },
        ],
      });

      setPopperInstance(_popperInstance);
    }
  }, []);

  useEffect(() => {
    if (popperInstance) {
      // const popcorn = document.getElementById(`${elementId}-button`);
      // const tooltip = document.getElementById(`${elementId}-popup`);

      // if (popcorn && tooltip) {
      //   const _popperInstance = createPopper(popcorn, tooltip, {
      //     placement: 'right',
      //   });

      //   setPopperInstance(_popperInstance);
      // }
      setTimeout(() => {
        popperInstance.forceUpdate();
      }, 250);
    }
  }, [profile.sidebar]);

  const togglePopup = () => {
    popperInstance.forceUpdate();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`side-navbar-link side-navbar-link--${
        profile.sidebar ? 'sidebar-active' : 'sidebar-inactive'
      }`}
    >
      {!props.children && (
        <NavLink
          to={props.link}
          className="side-navbar-link__action"
        >
          <div className="side-navbar-link__action__icon">
            <FontAwesomeIcon icon={props.icon} />
          </div>
          {profile.sidebar && (
            <div className="side-navbar-link__action__label">{props.label}</div>
          )}
        </NavLink>
      )}
      {props.children && (
        <>
          <button
            id={`${elementId}-button`}
            className={`side-navbar-link__action ${
              props.active ? 'side-navbar-link__action--active' : ''
            }`}
            onClick={togglePopup}
          >
            <div className="side-navbar-link__action__icon">
              <FontAwesomeIcon icon={props.icon} />
            </div>
            {profile.sidebar && (
              <div className="side-navbar-link__action__label">
                {props.label}
              </div>
            )}
          </button>
          <div
            className="side-navbar-link__popup"
            id={`${elementId}-popup`}
            hidden={!isOpen}
          >
            {props.children}
          </div>
        </>
      )}
    </div>
  );
};

export default SideNavLink;
