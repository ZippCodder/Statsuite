const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const uuid = require("uuid")["v4"];
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const secret = "12Gedg743G8wd2fR";
const querystring = require("querystring");
const uri = "mongodb+srv://deonrich:deonisawesome@scribler.lqhfr.mongodb.net/Statsuite?retryWrites=true&w=majority";

// Serve static assets...

app.use((req,res,next) => {
 console.log(req.url);
	next();
})
app.use("/static",express.static("build/static"));

// General response sender...

function send(req,res,body,status) {
 status = status !== undefined ? status:200;
 body = body !== undefined ? body:{status: "Success!"};
 
   res.set("Content-Type","application/json");
   res.status(status)
   res.send(JSON.stringify(body));
}

// Parse request body...
            
app.use(express.urlencoded());

// Sign up handler...

app.post("/signup",(req,res) => {
	let userObj = req.body;
           if (userObj.firstname && userObj.lastname && userObj.email && userObj.password) {
		   let client = new MongoClient(uri);
		   client.connect(err => {
			   if (!err) {
           
		  const hashedPassword = crypto.createHash("sha256").update(userObj.password).digest("hex");
		  const userId = uuid();
            
				   client.db("Statsuite").collection("Users").findOne({email: userObj.email},(err,data) => {
					   if (!data) {
                    client.db("Statsuite").collection("Users").insertOne({fullName: `${userObj.firstname} ${userObj.lastname}`, password: hashedPassword, userId: userId, verified: false},(err,obj) => {
        if (!err) {
           const token = jwt.sign({firstname: userObj.firstname, lastname: userObj.lastname},secret); 
		   send(req,res,{Status: "Success!",Token: token},200);
	} else {
	  send(req,res,{Error: "Could'nt register user, an internal server error ocurred!"},500);
          client.close();
	}
		    })
					   } else {
                                       send(req,res,{Error: "Could'nt register user, a user with that email already exists!"},400);
					   }
				   })
		           } else {
                         send(req,res,{Error: "Could'nt register user, an internal server error ocurred!"},500);         
		       }
		   });
	 } else {
          send(req,res,{Error: "Could'nt register user, missing required feilds!"},400);
	 }
})

// Login handler...

app.post("/login",(req,res) => {
  let userObj = req.body;
       if (userObj.fullname && userObj.password) {
              let hashedPassword = crypto.createHash("sha256").update(userObj.password).digest("hex");

            let client = new MongoClient(uri);
	       client.connect(err => {
                   if (!err) {
                 client.db("Statsuite").collection("Users").findOne({firstname: userObj.firstname},(err,data) => {
                       if (!err && data) {
                  client.db("Statsuite").collection("Users").findOne({firstname: userObj.firstname,password: hashedPassword},(err,data) => {
                        if (!err && data) {
				if (data.verified) {
                             let token = jwt.sign({firstname: userObj.firstname, lastname: userObj.lastname},secret);
				send(req,res,{Status: "Success!", Token: token},200);
				client.close();
				} else {
                              send(req,res,{Status: "Failure!", Error: "Could'nt sign in user, account has'nt been verified!"},400);
				}
			} else {
                      send(req,res,{Status: "Failure!",Error: "Could'nt sign in user, invalid password!"},400);
				client.close();
			}
		     })
		       } else {
                      send(req,res,{Status: "Failure!", Error: "Could'nt sign in user, invalid username!"},400);
			       client.close();
		       }
		     })
		   } else {
			send(req,res,{ Status: "Failure!", Error: "Could'nt sign in user, an internal server error ocurred!"},500);
		   }
	       })
       } else {
   send(req,res,{Error: "Could'nt sign in user, missing required feilds!"},400);
       }
});

// TODO Add new set handler...

// Serve application...

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"/build/index.html"));
})

app.listen(3000,() => {
 console.log("Express server is listening...");
})
