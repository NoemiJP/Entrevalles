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
import { useMantineTheme } from '@mantine/core';

const customTheme = createTheme({
  colors: {
    primaryColor: ['#355D75'],
    secondaryColor:['#d9d9c1']
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <MantineProvider theme={customTheme}>

        <App />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
