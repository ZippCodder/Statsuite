import React from "react";
const {useEffect,useState,createContext} = React;
export const GlobalContext = createContext(null);

export default function GlobalContextProvider(props) {
        let initialState;
          if (localStorage.getItem("token")) {
       initialState =  {loggedIn: true,name: localStorage.getItem("name"),new: false,sets:0}
        } else {
        initialState = {loggedIn: false};
        }

	const [globalState,setGlobalState] = useState(initialState);

 return (
   <GlobalContext.Provider value={[globalState,setGlobalState]}>
         {props.children}
	 </GlobalContext.Provider>
 )
}
