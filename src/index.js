import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import RouteMap from './router/router';
// import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <RouteMap />
  </HashRouter>,
  document.getElementById('root')
);
// registerServiceWorker();
