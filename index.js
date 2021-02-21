const express = require("express");
const app = express();
const API = require("./api.js");
const MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const uuid = require("uuid")["v4"];
const crypto = require("crypto");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const path = require("path");
const check = require("./checks.js");
const colors = require("colors");
const secret = "12Gedg743G8wd2fR";
const querystring = require("querystring");
const debug = require("util").debuglog("main");
const validateEmail = require("deep-email-validator").validate;
const uri = "mongodb+srv://deonrich:deonisawesome@scribler.lqhfr.mongodb.net/Statsuite?retryWrites=true&w=majority";
const mongoose = require("mongoose");

// Initialize API key expiration checker...

check();

/*
Middleware for debugging...

app.use((req,res,next) => {
 console.log(req.path);
next();
});
*/

// API routes...

app.use("/api",API);

// Serve static assets...

app.use("/static",express.static("build/static"));

// Serve favicon...

app.get("/favicon.ico",(req,res) => {
 /* let img = fs.createReadStream(__dirname + "/logo.png");
  img.on("open",() => {
    res.set("Content-Type","image/png");
   img.pipe(res); 
})
img.on("error",(err) => {
 res.send(err);
}) */
res.set("Content-Type","image/svg+xml");
res.sendFile(__dirname + "/src/logo.svg");
 })

// General response sender...

function send(req,res,body,status) {
 status = status !== undefined ? status:200;
 body = body !== undefined ? body:{status: "Success!"};

	if (status == 200) {
        debug(`${status} ${body}`.black.bgGreen + "\n");
      } else {
	      
        debug(`${status} ${body}`.black.bgRed + "\n");
      }
 
   res.set("Content-Type","application/json");
   res.status(status)
   res.send(JSON.stringify(body));
}

// Parse request body...
            
app.use(express.urlencoded({extended: true}));

// Sign up handler...

app.post("/signup",(req,res) => {
	let userObj = req.body;
           if (userObj.firstname && userObj.lastname && userObj.email && userObj.password) {

     userObj.firstname = userObj.firstname.trim();
     userObj.lastname = userObj.lastname.trim();
     userObj.email = userObj.email.trim();
     userObj.password = userObj.password.trim();

		   let client = new MongoClient(uri);
		   client.connect(err => {
			   if (!err) {
           
		  const hashedPassword = crypto.createHash("sha256").update(userObj.password).digest("hex");
		  const userId = uuid();
            
				   client.db("Statsuite").collection("Users").findOne({email: userObj.email},(err,data) => {
					   if (!data) {
						   validateEmail(userObj.email).then(obj => {
							   if (obj.valid) {
                    client.db("Statsuite").collection("Users").insertOne({fullName: `${userObj.firstname} ${userObj.lastname}`, email: userObj.email, password: hashedPassword, userId: userId, keys: [], verified: false},(err,obj) => {
        if (!err) {
           const token = jwt.sign({email: userObj.email,firstname: userObj.firstname, lastname: userObj.lastname},secret); 
		   send(req,res,{Status: "Success!",Token: token},200);
	} else {
	  send(req,res,{Error: "Could'nt register user, an internal server error ocurred!"},500);
          client.close();
	}
		    })
							   } else {
                                                       send(req,res,{Status: "Failure!",Error: "Please enter a valid email address!"},400);
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
       if (userObj.email && userObj.password) {
           
          userObj.email = userObj.email.trim();
          userObj.password = userObj.password.trim();

              let hashedPassword = crypto.createHash("sha256").update(userObj.password).digest("hex");

            let client = new MongoClient(uri);
	       client.connect(err => {
                   if (!err) {
                  client.db("Statsuite").collection("Users").findOne({email: userObj.email,password: hashedPassword},(err,data) => {
                        if (!err && data) {
				if (data.verified) {
                            let fullName = data.fullname.split(" ");
                                let [firstName,lastName] = fullName;
                             let token = jwt.sign({firstname: firstName, lastname: lastName, email: userObj.email},secret);
				send(req,res,{Status: "Success!", Token: token},200);
				client.close();
				} else {
                              send(req,res,{Status: "Failure!", Error: "Could'nt sign in user, account has'nt been verified!"},400);
				}
			} else {
                      send(req,res,{Status: "Failure!",Error: "Could'nt sign in user, invalid user credentials!"},400);
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

// Verify an account...

app.post("/verify/:verificationId",(req,res) => {
	let verifKey = req.params.verificationId;
  fs.readFile("./.data/verification-keys/" + verifKey + ".json",(err,data) => {
     if (!err && data) {
       data = JSON.parse(data);
	     let client = new MongoClient(uri);
	     client.connect(err => {
		     if (!err) {
		     let users = client.db("Statsuite").collection("Users").updateOne({email: data.email},{$set:{verified: true}},(err,obj) => {
		       if (!err) {
                      send(req,res,{Status: "Success! The user's account was successfully verified!"},200);
		       } else {
                       send(req,res,{Status: "Failure!",Error: "Could'nt verify user account, an internal server error ocurred!"},500);
			       client.close();
		       }
		     })
	       } else {
           send(req,res,{Status: "Failure!",Error: "Could'nt verify user's account, an internal server error ocurred!"},500);
	       }
	     });
     } else {
    send(req,res,{Status: "Failure!",Error: "Could'nt verify user's account, verification ID was invalid!"},401);
     }
  });
})

// Serve application...
/*
app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"/build/index.html"));
})
*/

// Listen on port...

app.listen(PORT,() => {
 debug("Express server is listening...".black.bgYellow + "\n");
	console.log("Statsuite application is active...".bgCyan.black);
})

