import React, { useEffect, useRef, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import {
  newId,
  receiveMessage,
  sendMessage,
} from '../../events/MessageService';

import './NavGroup.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
  space: string;
  closeAfterRouteChange?: boolean;
  label: string;
  children: any;
  context?: string;
}

const NavGroup = (props: Props) => {
  const [instanceId, setInstanceId] = useState(newId());
  const [isExpanded, setIsExpanded] = useState(false);
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    updateScrollHeight();
    receiveMessage().subscribe((message) => {
      if (
        message.name === 'nav-group-expanded' &&
        message.signal &&
        message.data.context === props.context &&
        message.data.instanceId !== instanceId
      ) {
        setIsExpanded(false);
      }
    });
  }, []);

  useEffect(() => {
    updateScrollHeight();
  }, [isExpanded]);

  const updateScrollHeight = () => {
    const element = document.getElementById(instanceId);
    if (element) {
      element.style.maxHeight = isExpanded
        ? `${element.scrollHeight}px`
        : '0px';
    }
  };

  const toggleExpansion = (event: any) => {
    event.preventDefault();
    if (!isExpanded) {
      setIsExpanded(!isExpanded);
      setTimeout(() => {
        sendMessage('nav-group-expanded', true, {
          instanceId,
          context: props.context,
        });
      }, 100);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="nav-group">
      <a
        href=""
        className={`nav-group--headline ${
          isExpanded ? 'expanded' : 'collapsed'
        }`}
        onClick={toggleExpansion}
      >
        <div>{props.label}</div>
        <div>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </a>
      <div className="nav-group--container" id={instanceId}>
        {props.children}
      </div>
    </div>
  );
};

export default NavGroup;
