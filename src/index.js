import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/App.jsx';
import './assets/css/main.css';

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root')
);
