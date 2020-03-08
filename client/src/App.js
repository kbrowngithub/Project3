import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Pantry from './pages/Pantry';
import Friends from './pages/Friends';
import CreateUser from './pages/CreateUser';
import Home from './pages/Home';
import Invite from './pages/Invite'; // Twilio

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/:id" component={Detail} />
          <Route exact path="/pantry" component={Pantry} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/create" component={CreateUser} />
          <Route exact path="/invite" component={Invite} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;