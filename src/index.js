import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';

const customTheme = createTheme({
  colors: {
    myColor: [
      "#f1f6f9",
      "#e4e9eb",
      "#c3d1d9",
      "#9fb7c7",
      "#81a2b7",
      "#6e94ae",
      "#648faa",
      "#537b95",
      "#476d87",
      "#365f77"
    ]
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MantineProvider theme={customTheme}>
      <App />
    </MantineProvider>
);

reportWebVitals();
