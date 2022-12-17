import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
// import { Provider } from 'react-redux';
// import store from 'redux/store';
import App from './App';

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root')
);
