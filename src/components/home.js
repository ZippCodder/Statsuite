import React from "react";
import ReactDOM from "react-dom";
import "./home.css";
import {Link,useHistory,useLocation} from "react-router-dom";

export default function Home(props) {
   let history = useHistory();
	if (!history.location.state) {
      history.replace(history.location.pathname,{initialized: true}); 
	}
   return (
      <main className="home">
        <section className="intro">
          <article>
             <h1>Know What Your Customers Want!</h1>
	   <br />
	       <p>An important part of every business is knowing what keeps your customers coming. Knowing whats needed from our clients allows us to deliver in the best way possible, thus increasing overall sales! We created Statsuite as a simple way to collect data from your users and analyse the feedback all in one place. With our intuitive interface and easy to use API, our platform is the ideal solution for collecting user feedback!</p>
	    </article>
	   <br />
	   <br />
	    <Link to="/signup" className="link"><button className="signup-but"><h2>Get Started</h2></button></Link>
	   </section><section className="graph">
	     <div class="main-img"><img src="data:image/svg+xml;utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 420'%3E%3Cg stroke='%23F1F1F1'%3E%3Cline stroke-width='3' x1='0' y1='60' x2='900' y2='60'%3E%3C/line%3E%3Cline x1='0' y1='120' x2='900' y2='120'%3E%3C/line%3E%3Cline x1='0' y1='180' x2='900' y2='180'%3E%3C/line%3E%3Cline x1='0' y1='240' x2='900' y2='240'%3E%3C/line%3E%3Cline x1='0' y1='300' x2='900' y2='300'%3E%3C/line%3E%3Cline stroke-width='3' x1='0' y1='358' x2='900' y2='358'%3E%3C/line%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Crect fill='orangered' x='100' y='166' width='100' height='187'%3E%3C/rect%3E%3Ccircle cx='25' cy='390' r='7' fill='orangered'%3E%3C/circle%3E%3Ctext font-size='15' font-family='arial' fill='orangered' alignment-baseline='middle' x='50' y='390'%3ESatisfied Customers%3C/text%3E%3Ctext font-size='15' font-family='arial' fill='orangered' x='150' y='161' text-anchor='middle'%3E125243%3C/text%3E%3C/g%3E%3Cg%3E%3Crect fill='lime' x='300' y='348' width='100' height='5'%3E%3C/rect%3E%3Ccircle cx='225' cy='390' r='7' fill='lime'%3E%3C/circle%3E%3Ctext font-size='15' font-family='arial' fill='lime' alignment-baseline='middle' x='250' y='390'%3EUnsatisfied Customers%3C/text%3E%3Ctext font-size='15' font-family='arial' fill='lime' x='350' y='343' text-anchor='middle'%3E3679%3C/text%3E%3C/g%3E%3Cg%3E%3Crect fill='gold' x='500' y='246' width='100' height='107'%3E%3C/rect%3E%3Ccircle cx='425' cy='390' r='7' fill='gold'%3E%3C/circle%3E%3Ctext font-size='15' font-family='arial' fill='gold' alignment-baseline='middle' x='450' y='390'%3ELoyal Customers%3C/text%3E%3Ctext font-size='15' font-family='arial' fill='gold' x='550' y='241' text-anchor='middle'%3E71546%3C/text%3E%3C/g%3E%3Cg%3E%3Crect fill='purple' x='700' y='352' width='100' height='1'%3E%3C/rect%3E%3Ccircle cx='625' cy='390' r='7' fill='purple'%3E%3C/circle%3E%3Ctext font-size='15' font-family='arial' fill='purple' alignment-baseline='middle' x='650' y='390'%3ENew Customers%3C/text%3E%3Ctext font-size='15' font-family='arial' fill='purple' x='750' y='347' text-anchor='middle'%3E832%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E" /></div>
	     </section>
	   </main>
    )
}


