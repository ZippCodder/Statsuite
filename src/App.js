import React,{Component,useContext} from 'react';
import Header from "./components/header.js";
import Home from "./components/home.js";
import Footer from "./components/footer.js";
import Signup from "./components/signup.js";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./components/login.js";
import NotFound from "./components/notfound.js";
import Dashboard from "./components/dashboard.js";
import GlobalContext from "./components/globalcontext.js";
import Verify from "./components/verify.js";
import Unauthenticated from "./components/unauth.js";

class App extends Component {
/*
	static contextType = GlobalContext;
          
		const [globalState,setGlobalState] = this.context;
            if (localStorage.getItem("token")) {
          setGlobalState({loggedIn: true,name: localStorage.getItem("name"),new: false,sets:
0});
        } else {
         setGlobalState({loggedIn: false});
	}
          }
              */
  render() {
    return (
	  <Router>
      <div className="App">
	    <Switch>
	    <Route exact path="/">
	    <Header />
	    <Home />
	    </Route>
	    <Route path="/signup">
            <Header />
            <Signup />
	    </Route>
	    <Route path="/login">
            <Header />
	    <Login />
	    </Route>
	    <Route path="/dashboard">
	    <Header />
            <Dashboard />
	    </Route>
            {/* 
               @TODO: Uncomment to for email verification endpoints
            <Route path="/verify">
            <Verify />
            </Route>
            <Route path="/unauthenticated">
            <Unauthenticated />
            </Route> */}
            <Route path="/">
            <NotFound />                                            
	    </Route>
	    </Switch >
	    <Footer />
	    </div>
	    </Router>
    );
  }
}

export default App;
