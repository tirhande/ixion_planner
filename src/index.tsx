import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
// import { Provider } from 'react-redux';
// import store from 'redux/store';
import App from './App';
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRAKING_ID);
ReactGA.send("pageview");

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root')
);
