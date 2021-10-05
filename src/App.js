import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/pages/home/Index";
import About from "./components/pages/about/Index";
import Contact from "./components/pages/contact/Index";
import RegisterForm from "./components/pages/register/Index";
import Admin from "./components/pages/admin/login/Index";
import AdminDashboard from "./components/pages/admin/dashboard/Index";
import Requests from "./components/pages/admin/pages/Requests";
import Draw from "./components/pages/admin/pages/Draw";
import Car2Draw from "./components/pages/admin/pages/Car2Draw";
import TractorDraw from "./components/pages/admin/pages/TractorDraw";
import Restricted from "./components/pages/admin/pages/common/Restricted";
import Expired from "./components/pages/admin/pages/common/Expired";
import CustomWinner from "./components/pages/admin/pages/CustomWinner";
import Terms from "./components/common/terms";

import CarCommittee from "./components/pages/committees/carcommittee/Index";
import TractorCommittee from "./components/pages/committees/tractorcommittee/Index";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/register/:data" component={RegisterForm} />
        <Route path="/admin" component={Admin} />
        <Route path="/dashboard" component={AdminDashboard} />
        <Route path="/requests" component={Requests} />
        <Route path="/draw/:data" component={Draw} />
        <Route path="/car2draw/:data" component={Car2Draw} />
        <Route path="/tractordraw/:data" component={TractorDraw} />
        <Route path="/customwinner" component={CustomWinner} />
        <Route path="/restricted" component={Restricted} />
        <Route path="/expired" component={Expired} />
        <Route path="/terms" component={Terms} />

        <Route path="/carcommittee" component={CarCommittee} />
        <Route path="/tractorcommittee" component={TractorCommittee} />
      </Switch>
    </Router>
  );
}

export default App;
