import React, { Component } from 'react';
import logo from './logo.svg';
import Header from "./components/header.js";
import Home from "./components/home.js";
import Footer from "./components/footer.js";
import Signup from "./components/signup.js";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./components/login.js";

class App extends Component {
  render() {
    return (
	  <Router>
      <div className="App">
	    <Header />
	    <Switch>
	    <Route exact path="/">
	    <Home />
	    </Route>
	    <Route path="/signup">
	    <Signup />
	    </Route>
	    <Route path="/login">
	    <Login />
	    </Route>
	    </Switch>
	    <Footer />
	    </div>
	    </Router>
    );
  }
}

export default App;
