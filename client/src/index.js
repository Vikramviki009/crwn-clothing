import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorkerRegistration';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
      </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();

