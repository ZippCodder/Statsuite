import React from "react";
import "./unauth.css";

export default function Verify(props) {
 return (
  <main className="unauth-container">
   <div className="unauth">
   <i class="far fa-times-circle cross-icon"></i>
   <br />
   <br />
 <h1>Unauthenticated Account!</h1>
    <br />
   <p>Please check your email address to get the access link to your account before you can log in.</p>
   </div>
</main>
);
}
