import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './components/pages/home/Index';
import About from './components/pages/about/Index';
import Contact from './components/pages/contact/Index';
import RegisterForm from './components/pages/register/Index';
import Admin from './components/pages/admin/login/Index';
import AdminDashboard from './components/pages/admin/dashboard/Index';
import Requests from './components/pages/admin/pages/Requests';
import Draw from './components/pages/admin/pages/Draw';
import Car2Draw from './components/pages/admin/pages/Car2Draw';
import TractorDraw from './components/pages/admin/pages/TractorDraw';
import Restricted from './components/pages/admin/pages/common/Restricted';
import Expired from './components/pages/admin/pages/common/Expired';
import CustomWinner from './components/pages/admin/pages/CustomWinner';
import Terms from './components/common/terms';

import CarCommittee from './components/pages/committees/carcommittee/Index';
import TractorCommittee from './components/pages/committees/tractorcommittee/Index';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/register/:data" component={RegisterForm} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/dashboard" component={AdminDashboard} />
      <Route exact path="/requests" component={Requests} />
      <Route exact path="/draw/:data" component={Draw} />
      <Route exact path="/car2draw/:data" component={Car2Draw} />
      <Route exact path="/tractordraw/:data" component={TractorDraw} />
      <Route exact path="/customwinner" component={CustomWinner} />
      <Route exact path="/restricted" component={Restricted} />
      <Route exact path="/expired" component={Expired} />
      <Route exact path="/terms" component={Terms} />

      <Route exact path="/carcommittee" component={CarCommittee} />
      <Route exact path="/tractorcommittee" component={TractorCommittee} />
    </Router>
  );
}

export default App;
