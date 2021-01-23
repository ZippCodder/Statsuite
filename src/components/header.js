import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";

const {Component, useState, Fragment} = React;

function Nav(props) {
 return (
	 <div style={{display: props.show}} className="mobile">
  <nav>
           <ul>
             <li><Link to="/" className="link">Home</Link></li>
             <li><Link to="/" className="link">Docs</Link></li>
             <li><Link to="/" className="link">API</Link></li>
             <li><Link to="/" className="link">Contact</Link></li>
           </ul>                                                                 
	 </nav>                                                              
	 <Link to="/login" className="link"><button className="login-but login-but-mobile"><h3>Log In &rarr;</h3></button></Link>
	 </div>
 )
}

export default function Header(props) {
  
    let [toggle,setToggle] = useState(false);

	function show() {
          if (toggle) {
             return "block";
	  }

		return "none";
	}

 return (
   <header>
      <Link to="/" className="logo"><h1>Statsuite</h1></Link>
	 <nav className="desktop">
	 <ul>                                                                   
	 <li><Link to="/" className="link">Home</Link></li>                      <li><Link to="/" className="link">Docs</Link></li>                                      
	 <li><Link to="/" className="link">API</Link></li>                    	 <li><Link to="/" className="link">Contact</Link></li>                             
	 </ul>                                                          
	 </nav>                                                               
	 <Link to="/login" className="link"><button className="desktop login-but"><h3>Log In &rarr;</h3></button></Link>
       <div className="nav-box">
	 <div className="nav-icon" onClick={() => setToggle(toggle == false)}>
	 <div className="bar"></div>
	 <div className="bar"></div>
	 <div className="bar"></div>
	 </div>
         <Nav name="mobile" show={show()} />
	</div>
   </header>
 )
}
