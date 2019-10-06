
import Routes from './routes';
import React, { Component } from 'react';
import Login from './pages/login';
import Todo from './pages/todo';
import Container from '@material-ui/core/Container';
import './App.css';
import { ToastContainer } from 'react-toastify';


class App extends Component {

  constructor() {
    super();
    this.state = {
      appName: "ToDo List",
      home: false
    }
  }

  render() {
    return (
      <div className="darkBackground">
        <Container maxWidth="md">
        <Routes name={this.state.appName} />
        <ToastContainer />
      </Container>
      </div>
      
    );
  }
}

export default App;



