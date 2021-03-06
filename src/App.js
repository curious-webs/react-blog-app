import React from "react";

import NavBar from "./components/navBar";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import About from "./components/about";
import Services from "./components/services";
import Contact from "./components/contact";
import Home from "./components/home";
import Blog from './components/blog';
import logo from "./logo.svg";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog/:id" component={Blog} />
        <Route path="/home" component={Home} />

        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>

  );
}

export default App;
