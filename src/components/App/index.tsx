import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Content from './Content';
import '@oakui/core-stage';
import './style.scss';
import './metric.scss';

const App = (props: any) => {
  return (
    <Provider store={store}>
        <Content />
    </Provider>
  );
};

export default App;
