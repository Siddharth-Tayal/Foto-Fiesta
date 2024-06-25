import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux"
import { store } from './redux/store';
import { Provider as AlertProvider, positions, transitions } from "react-alert"
import Template from "react-alert-template-basic"
const options = {
  positions: positions.TOP_CENTER,
  timeout: 2000,
  transitions: transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AlertProvider template={Template} {...options}>
      <App />
    </AlertProvider>
  </Provider>
  // </React.StrictMode>
);
