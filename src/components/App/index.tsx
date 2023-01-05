import React from 'react';
import { useCookies } from 'react-cookie';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Content from './Content';
import '@oakui/core-stage';
import './style.scss';

const App = (props: any) => {
  return (
    <Provider store={store}>
        <Content cookies={useCookies()}/>
    </Provider>
  );
};

export default App;
