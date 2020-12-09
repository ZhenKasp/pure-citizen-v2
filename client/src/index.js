import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store/configureStore';
import axios from 'axios';

axios.defaults.headers.common["uid"] = store.getState().user.uid;
axios.defaults.headers.common["client"] = store.getState().user.client;
axios.defaults.headers.common["access-token"] = store.getState().user.accessToken;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
