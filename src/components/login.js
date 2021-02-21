import React from "react";
import ReactDOM from "react-dom";
import {Link,useHistory} from "react-router-dom";
import {GlobalContext} from "./globalcontext.js";
import logo from "../logo.svg";
import "./login.css";

const {useState,useRef,useEffect,useContext} = React;

export default function Login(props) {

    const [loading,setLoading] = useState(false);
     const [error,setError] = useState(null);
        const history = useHistory();
        const [globalState,setGlobalState] = useContext(GlobalContext);
        const form = useRef();

        function send(e) {
                e.preventDefault()
                if (!error) {
         setLoading(true);
                let elements = form.current.elements;
            fetch("/login",{
                    method: "POST",
               body: `email=${encodeURIComponent(elements["email"].value)}&password=${encodeURIComponent(elements["password"].value)}`,
                    headers: {
                     "Content-Type": "application/x-www-form-urlencoded"
                    }
            }).then(res => {
               return res.json();
            }).then(json => {
              if (json.Status == "Success!") {
                  setGlobalState({loggedIn: true, new: true,sets: 0,name: `${elements["firstname"]
.value} ${elements["lastname"].value}`});
               history.push("/verify");
              } else {
                setError(json.Error);
                setLoading(false);
              }
            })
                }
        }

        function load() {
          if (loading) {
                return <div className="loading-button"></div>
              }
                 return "Submit";
        }

 return (
  <main className="login">
              <form className="login-box" ref={form} onSubmit={send}>
           <Link to="/"><img src={logo} alt="logo" className="logo-img-2" /></Link>
         <h1>Welcome Back!</h1>
         <Link to="/signup" className="login-signup">{"I don't have an account!"}</Link>
         <br />
         <br />
         <input onFocus={() => { setError(null) }} type="text" name="email" placeholder="Email" required />
         <br />
         <input onFocus={() => { setError(null) }} type="password" name="password" placeholder="Password" required />
         <br />
         <p className="error-message">{error}</p>
         <br />
         <button type="submit" style={{opacity: loading || error ? "0.6":"1"}}>{load()}</button>
         </form>
         </main>
 )
}
