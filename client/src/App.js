import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Pantry from './pages/Pantry';
import Friends from './pages/Friends';
import CreateUser from './pages/CreateUser';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import Home from './pages/Home';
import Invite from './pages/Invite'; // Twilio

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/recipes/:id" component={Detail} />
          <Route path="/pantry" component={Pantry} />
          <Route path="/friends" component={Friends} />
          <Route path="/create" component={CreateUser} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/invite" component={Invite} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;