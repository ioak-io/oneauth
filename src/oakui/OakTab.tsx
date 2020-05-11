import React, { useState, useEffect, ReactElement } from 'react';
import './styles/oak-tab.scss';

interface Props {
  meta: any[];
  children: any;
}

const OakTab = (props: Props) => {
  const [activeTab, setActiveTab] = useState('');
  const [slots, setSlots] = useState<any | {}>({});

  useEffect(() => {
    if (!activeTab) {
      setActiveTab(
        props.meta && props.meta.length > 0 ? props.meta[0].slotName : ''
      );
    }
    initializeViews();
  }, [props.meta, props.children]);

  const initializeViews = () => {
    let newSlots = {};
    React.Children.toArray(props.children).forEach((node: any) => {
      newSlots = { ...newSlots, [node.props.slot]: node };
    });
    setSlots(newSlots);
  };

  const switchTab = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="oak-tab">
      <div className="header">
        {props.meta.map(item => (
          <div
            key={item.slotName}
            className={`tab typography-6 ${
              activeTab === item.slotName ? 'active' : ''
            }`}
            onClick={() => switchTab(item.slotName)}
          >
            <div className="icon">
              <i
                className={`material-icons typography-8 ${
                  activeTab === item.slotName ? 'active' : ''
                }`}
              >
                {item.icon}
              </i>
            </div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
      {props.meta.map(item => (
        <div
          key={item.slotName}
          className={`tab typography-6 ${
            activeTab === item.slotName ? 'active' : ''
          }`}
          onClick={() => switchTab(item.slotName)}
        />
      ))}
      {props.meta.map(item => (
        <div
          key={item.slotName}
          className={`content ${
            item.slotName === activeTab ? 'active' : 'inactive'
          }`}
        >
          {slots[item.slotName]}
          {/* <slot v-bind:name="item.slotName" /> */}
        </div>
      ))}
    </div>
  );
};

export default OakTab;
