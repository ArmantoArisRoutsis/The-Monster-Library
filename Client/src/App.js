import React, {useState, useEffect} from "react";
import "./styles.css";

import FechedMons from "./components/FetchedMons"
import Feched from "./components/Feched"
import CreateMonster from "./components/CreateMonster"
import Register from "./components/userPages/Register"
import LogIn from "./components/userPages/LogIn"
import Edit from "./components/userPages/Edit"

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


export default function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact component={CreateMonster} />
          <Route path="/feched/:monsterId" exact component={Feched} />
          <Route path="/fechedmons" component={FechedMons} />
          <Route path="/register" component={Register}/>
          <Route path="/login" component={LogIn}/>
          <Route path="/edit/:monsterId" component={Edit}/>
        </Switch>
      </div>
    </Router>
  );
}
