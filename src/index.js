import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import GlobalContextProvider,{GlobalContext} from "./components/globalcontext.js";

ReactDOM.render(
 <GlobalContextProvider>
  <App />
  </GlobalContextProvider>	
	,
  document.getElementById('root')
);



