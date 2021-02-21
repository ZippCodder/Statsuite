import React from "react";
import {Link,useHistory,Redirect} from "react-router-dom";
import {GlobalContext} from "./globalcontext.js";
import "./dashboard.css";

const {useContext} = React;

function Sets(props) {
return <h1>Sets</h1>
}

export default function Dashboard(props) {
   const [globalState,setGlobalState] = useContext(GlobalContext);
    const history = useHistory();
	if (globalState.new) {
       localStorage.setItem("token",globalState.token);
       localStorage.setItem("name",globalState.name);
        }
 if (globalState.loggedIn) {
  return (
     <>
     <header className="header dashboard-header">
        <div className="user-icon">
	  <i className="fas fa-user-circle"></i><p>{globalState.name}</p>
	  </div>
	  <button className="new" style={{animation: globalState.new ? "move 3s ease infinite":"none"}}>New <i className="fas fa-plus"></i></button>
	  <p className="sets">Sets - {globalState.sets}</p>
	  </header>
	  <main className="dashboard">
	  {(() => {
		  if (globalState.new) {
            return <p className="no-sets">You dont have any Sets yet! Why dont you make one?</p>
		  } 
		  return <Sets />
	  })()}
	  </main>
     </>
  )
 } 
	return <Redirect to="/login" />
}
