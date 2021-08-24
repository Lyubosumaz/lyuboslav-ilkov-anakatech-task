import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { App } from './app/App';
import './assets/css/main.css';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);