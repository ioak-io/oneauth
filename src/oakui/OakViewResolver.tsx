import React, { useEffect, useState } from 'react';
import './styles/oak-view-resolver.scss';
import { sendMessage, receiveMessage } from '../events/MessageService';
import OakButton from './OakButton';

interface Props {
  sideLabel?: string;
  children: any;
}

const OakViewResolver = (props: Props) => {
  const [mobileViewPort, setMobileViewPort] = useState(false);

  const [showSide, setShowSide] = useState(false);

  const [views, setViews] = useState();

  const [main, setMain] = useState();
  const [side, setSide] = useState();

  const viewPort = window.matchMedia('(max-width: 767px)');

  useEffect(() => {
    setMobileViewPort(viewPort.matches);
    viewPort.addListener(() => setMobileViewPort(viewPort.matches));
    setViews(props.children);

    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'sidebar') {
        setShowSide(message.signal);
      }
    });
    return () => eventBus.unsubscribe();
  }, []);

  useEffect(() => {
    setViews(props.children);
  }, [props.children]);

  useEffect(() => {
    initializeViews();
  }, [views]);

  const initializeViews = () => {
    React.Children.toArray(props.children).forEach((node: any) => {
      // node.type.name is minified after build and so static build result has different alphabet
      // if (node.type.name === 'View') {
      if (node.props.main) {
        setMain(node);
      } else if (node.props.side) {
        setSide(node);
      }
      // }
    });
  };

  const toggleSideView = () => {
    sendMessage('sidebar', !showSide);
  };

  return (
    <>
      {!mobileViewPort && (
        <div className="view-desktop">
          {side && <div className="view-side">{side}</div>}
          <div className={`view-content${side ? ' side-present' : ''}`}>
            {main}
          </div>
        </div>
      )}

      {mobileViewPort && (
        <div className="view-mobile">
          <div className={showSide ? 'slider show' : 'slider hide'}>
            <div className="topbar" onClick={toggleSideView}>
              <div>
                <OakButton
                  theme="default"
                  variant="block"
                  action={toggleSideView}
                >
                  {!showSide && (
                    <>
                      <i className="material-icons">expand_more</i>
                      {props.sideLabel ? props.sideLabel : 'Menu'}
                    </>
                  )}
                  {showSide && (
                    <>
                      <i className="material-icons">expand_less</i>Collapse
                    </>
                  )}
                </OakButton>
              </div>
            </div>
            <div className="view-side">{showSide && side}</div>
          </div>
          {!showSide && <div className="view-main">{main}</div>}
        </div>
      )}
    </>
  );
};

export default OakViewResolver;
