import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css'
import * as firebase from 'firebase'

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig =
{
  apiKey: "AIzaSyBVhOkPiyC1GmA90x5m8G2wQGrgbsH6aBk",
  authDomain: "react-project-c5fa9.firebaseapp.com",
  databaseURL: "https://react-project-c5fa9-default-rtdb.firebaseio.com",
  projectId: "react-project-c5fa9",
  storageBucket: "react-project-c5fa9.appspot.com",
  messagingSenderId: "280448464031",
  appId: "1:280448464031:web:216edc31b841171c31deaa"
};

firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
