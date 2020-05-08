import React, { useState, useEffect } from 'react';
import './styles/oak-sidebar.scss';
import { sendMessage, receiveMessage } from '../events/MessageService';

interface Props {
  show?: boolean;
  elements?: Array<any>;
  label: string;
  icon: string;
  number?: number;
  animate?: boolean;
  children?: any;
}

const OakSidebar = (props: Props) => {
  const [show, setShow] = useState(false);
  const [elementList, setElementList] = useState([{}]);

  useEffect(() => {
    sendMessage('sidebarExpanded', show, { label: props.label });
  }, [show]);

  useEffect(() => {
    setShow(!!props.show);
    setElementList(props.elements ? props.elements : []);
    const eventBus = receiveMessage().subscribe(message => {
      if (
        message.name === 'sidebarExpanded' &&
        message.signal &&
        message.data &&
        message.data.label !== props.label
      ) {
        setShow(false);
      }
    });
    return () => eventBus.unsubscribe();
  }, []);

  let key = 0;
  const elements = elementList.map((item: any) => (
    <div key={(key += 1)} className="element" onClick={item.action}>
      <i className="material-icons">{item.icon}</i>
      {item.label}
    </div>
  ));
  return (
    <div className="oak-sidebar">
      <div
        className={show ? 'header active' : 'header'}
        onClick={() => setShow(!show)}
      >
        <div className="label">
          <i className="material-icons">{props.icon}</i>
          {props.label}
          {props.number !== undefined && (
            <div className="number">{props.number}</div>
          )}
        </div>
        {/* <div className="aria"><i className="material-icons">{this.state.show ? 'expand_less' : 'expand_more'}</i></div> */}
        <div className="aria">
          <i className={show ? 'material-icons collapse' : 'material-icons'}>
            keyboard_arrow_left
          </i>
        </div>
      </div>
      <div
        data-test="content-holder"
        className={
          show
            ? `content show ${props.animate ? 'appear' : 'static'}`
            : `content hide ${props.animate ? 'appear' : 'static'}`
        }
      >
        {elements}
        {props.children}
      </div>
    </div>
  );
};

export default OakSidebar;
