import React, { useEffect } from 'react';
import './style.scss';
import Navigation from '../../Navigation';
import { sendMessage } from '../../../events/MessageService';

interface Props {
  label?: string;
  logout: Function;
}
const TestPage = (props: Props) => {
  useEffect(() => {
    sendMessage('navbar', true);
  }, []);

  return (
    <div className="app-page">
      <div className="app-container">
        <div className="home">
          <div className="typography-10 space-bottom-2">Test page</div>
          <div className="typography-5">
            Test page content here for the space
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
