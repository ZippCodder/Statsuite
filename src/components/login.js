import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import "./login.css";

export default function Login(props) {
 return (
  <main className="login">
      <form className="login-box">
	 <h1>Welcome Back!</h1>
	 <Link to="/signup" className="login-signup">I dont have an account!</Link>
	 <br />
	 <br />
	<input type="text" name="email" placeholder="Email" required />
	 <br />
	<input type="password" name="password" placeholder="Password" required />
	 <br />
	 <br />
	<button type="submit">Submit</button>
	 </form>
	 </main>
 )
}
