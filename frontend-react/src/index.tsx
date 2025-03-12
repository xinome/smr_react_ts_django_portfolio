import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BaseApp from './BaseApp';
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'

const isLoggedIn = store.getState().loginReducer.isLoggedIn;
console.log("state: ", store.getState());

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        {/* ログイン、非ログインで切り分け */}
        {isLoggedIn ? (
          <BrowserRouter>
            <BaseApp />
          </BrowserRouter>
        ) : (
          // <Login />
          <p>ログインしてください</p>
        )}
      </Provider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();