import ActionCable from 'actioncable';
import ActionCableProvider from 'react-actioncable-provider';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { API_WS_ROOT } from './constants';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ActionCableProvider url={API_WS_ROOT}>

    <React.StrictMode>
      <App />
    </React.StrictMode>

  </ActionCableProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();