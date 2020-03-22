import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";
import Detail from "./pages/Detail";
import NewRecipe from "./pages/NewRecipe";
import Drink from "./pages/Drink";
import NewDrink from "./pages/NewDrink";
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
        <Nav/>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/:id" component={Detail} />
          <Route exact path="/drinks/:id" component={Drink} />
          <Route exact path="/recipes/new/:id" component={NewRecipe} />
          <Route exact path="/drinks/new/:id" component={NewDrink} />
          <Route exact path="/pantry" component={Pantry} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/create" component={CreateUser} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/invite" component={Invite} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;