import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
import Login from './pages/login';
import Todo from './pages/todo';
import Signup from './pages/signup';
import NotFound from '././components/notfound/notFound';




const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/todo" component={Todo}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="*" component={NotFound}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;