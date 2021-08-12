import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import './style.scss';
import './metric.scss';
import Content from './Content';
import '@oakui/core-stage';

const App = (props: any) => {
  return (
    <Provider store={store}>
      <Content {...props} />
    </Provider>
  );
};

export default App;
