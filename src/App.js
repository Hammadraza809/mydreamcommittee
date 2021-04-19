import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './components/pages/home/Index';
import About from './components/pages/about/Index';
import Contact from './components/pages/contact/Index';
import RegisterForm from './components/pages/register/Index';

import CarCommittee from './components/pages/committees/carcommittee/Index';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/register" component={RegisterForm}/>

      <Route exact path="/carcommittee" component={CarCommittee}/>
    </Router>
  );
}

export default App;
