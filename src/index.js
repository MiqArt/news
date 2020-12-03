import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/main.scss';
import App from './App';
import store from './store/reducer';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);