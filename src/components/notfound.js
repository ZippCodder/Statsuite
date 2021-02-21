import {Link} from "react-router-dom";
import "./notfound.css";

export default function NotFound(props) {
return (
	<div id="not-found">
 <h1>404</h1>
	<p>Page not found!</p>
	<br />
	<br />
	<Link to="/">Return to home page?</Link>
	</div>
	
)
}
