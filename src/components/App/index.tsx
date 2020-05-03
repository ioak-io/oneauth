import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import './style.scss';
import './metric.scss';
import Content from './Content';

const App = props => {
  return (
    <Provider store={store}>
      <Content {...props} />
    </Provider>
  );
};

export default App;
