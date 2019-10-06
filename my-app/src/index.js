import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import Login from './pages/login';
import Todo from './pages/todo';
import Signup from './pages/signup';
import 'semantic-ui-css/semantic.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




ReactDOM.render(<App />, document.getElementById('root'));

 