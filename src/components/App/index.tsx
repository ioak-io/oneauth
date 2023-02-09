import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Content from './Content';
import './style.scss';

const App = (props: any) => {
  return (
    <Provider store={store}>
        <Content />
    </Provider>
  );
};

export default App;
