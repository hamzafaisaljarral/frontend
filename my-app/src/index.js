import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom' // why this plugin is here?!
import './index.css';
import Login from './pages/login'; // why this plugin is here?
import Todo from './pages/todo'; // why this is here?!
import Signup from './pages/signup'; // why this is here?
import 'semantic-ui-css/semantic.min.css'
import { ToastContainer } from 'react-toastify'; // why this is here?
import 'react-toastify/dist/ReactToastify.css';




ReactDOM.render(<App />, document.getElementById('root'));

 /**
  * You left a lot imports without using it, this is a bad pratice and code smells
  * you must pay attention when you're developing something, you cannot just left 
  * something behind in that way, it's consume memory
  */