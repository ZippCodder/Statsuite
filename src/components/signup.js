import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import "./signup.css";

export default function Signup(props) {
 return (
  <main className="signup">
      <form className="signup-box">
	 <h1>Get Started!</h1>
	 <Link to="/login" className="login-signup">I have an account!</Link>
	 <br />
	 <br />
        <input type="text" name="firstname" placeholder="First Name" required />
	 <br />
	<input type="text" name="lastname" placeholder="Last Name" required />
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
