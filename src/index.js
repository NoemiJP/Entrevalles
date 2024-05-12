import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';



import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';
import { UserProvider } from './components/Usuario/UserProvider';
const myColor = [
  '#f2f5f8',
  '#e5e7e9',
  '#c7ced3',
  '#a5b3be',
  '#899cac',
  '#778ea1',
  '#6d879d',
  '#5c7489',
  '#4f677b',
  '#3f596e'
];

const theme = createTheme({
  colors: {
    blue: myColor
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <MantineProvider theme={theme}>

        <App />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
