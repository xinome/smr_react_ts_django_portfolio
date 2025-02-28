import React from 'react';
import logo from './logo.svg';
import './BaseApp.scss';

import Button from '@mui/material/Button';

const BaseApp = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="contained" color="primary">
          Material-UI Button
        </Button>
      </header>
    </div>
  );
}

export default BaseApp;
