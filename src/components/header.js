import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {GlobalContext} from "./globalcontext.js";
import logo from "../logo.svg";

const {Component, useState, Fragment, useContext} = React;

function Nav(props) {
 
	const [globalState,setGlobalState] = useContext(GlobalContext);

 return (
	 <div style={{display: props.show}} className="mobile">
  <nav>
           <ul>
             <li><Link to="/" className="link">Home</Link></li>
             <li><Link to="/" className="link">Docs</Link></li>
             <li><Link to="/" className="link">API</Link></li>
             <li><Link to="/" className="link">Contact</Link></li>
	     {(() => {
          if (globalState.loggedIn) return <li><Link to="/dashboard" className="link">Dashboard</Link></li>
         })()}
           </ul>                                                                 
	 </nav>                                                              
	 {(() => {
                 if (!globalState.loggedIn) {
              return <Link to="/login" className="link"><button className="login-but-mobile login-but"><h3>Log In &rarr;</h3></button></Link>
                 }
                 return <button className="login-but-mobile login-but" onClick={props.logout}><h3>Log Out &rarr;</h3></button>
         })()}
	 </div>
 )
}

export default function Header(props) {

	const [globalState,setGlobalState] = useContext(GlobalContext);
  
    let [toggle,setToggle] = useState(false);

	function show() {
          if (toggle) {
             return "block";
	  }

		return "none";
	}

function logout() {
 localStorage.removeItem("token");
localStorage.removeItem("name");
 setGlobalState({loggedIn: false});
}

 return (
   <header className="header main-header">
   <div className="logos">
    <img src={logo} alt="logo" className="logo-img"/>
      <Link to="/" className="logo"><h1>Statsuite</h1></Link>
      </div>
	 <nav className="desktop">
	 <ul>                                                                   
	 <li><Link to="/" className="link">Home</Link></li>                      <li><Link to="/" className="link">Docs</Link></li>                                      
	 <li><Link to="/" className="link">API</Link></li>                    	 <li><Link to="/" className="link">Contact</Link></li>
	 {(() => {
	  if (globalState.loggedIn) return <li><Link to="/dashboard" className="link">Dashboard</Link></li>
	 })()}
	 </ul>                                                          
	 </nav>                                                               
	 {(() => { 
		 if (!globalState.loggedIn) {
	      return <Link to="/login" className="link"><button className="desktop login-but"><h3>Log In &rarr;</h3></button></Link>
		 } 
		 return <button className="desktop login-but" onClick={logout}><h3>Log Out &rarr;</h3></button>
	 })()}
       <div className="nav-box">
	 <div className="nav-icon" onClick={() => setToggle(toggle == false)}>
	 <div className="bar"></div>
	 <div className="bar"></div>
	 <div className="bar"></div>
	 </div>
         <Nav name="mobile" show={show()} logout={logout}/>
	</div>
   </header>
 )
}
