import 'react-app-polyfill/ie11';
import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

//import  './styles.scss'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <App />
  </ThemeProvider>,
  document.querySelector('#rootform'),
);
