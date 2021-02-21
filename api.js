const express = require("express");
const {Router} = express;
const {MongoClient} = require("mongodb");
const fs = require("fs");
const crypto = require("crypto");
const uuid = require("uuid")["v4"];
const API = Router();
const debug = require("util").debuglog("api");
const uri = "mongodb+srv://deonrich:deonisawesome@scribler.lqhfr.mongodb.net/Statsuite?retryWrites=true&w=majority";
const mongoose = require("mongoose");

API.use(express.json({extended: true}));

// General response sender... 

function send(req,res,body,status) {                                             
  status = status !== undefined ? status:200;
 body = body !== undefined ? body:{status: "Success!"};
                                                                                 
res.set("Content-Type","application/json");
   res.status(status)
   res.send(JSON.stringify(body));                                              
}

// Route for generating API key...

API.route("/keys").post((req,res) => {

 // CREATE A NEW API KEY:

     const {email,password} = req.body; 
	let hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
	if (email && password) {
             let client = new MongoClient(uri);
		client.connect(err => {
                   if (!err) {
			let users = client.db("Statsuite").collection("Users");
                  users.findOne({email: email, password: hashedPassword},(err,data) => {

                    if (data) {
			    if (data.keys.length < 3) {
			    let key = uuid();
				    let date = new Date();
                       fs.writeFile("./.data/api-keys/" + key + ".json",JSON.stringify({key: key, expires: date.getTime() + 2592000000}),(err) => {
			       if (!err) {
				       users.updateOne({email: email, password: hashedPassword},{$push: {keys: key}},(err,obj) => {
					       if (!err) {
                     send(req,res,{Status: "Success! This API key will expire after 30 days. You will be notify you at " + email +" when your key is soon to expire.",Key: key},200);
				       client.close();
					       } else {
                                        send(req,res,{Status: "Failure!",Error: "Could'nt generate key, an internal server error ocurred!"},500);
                                       client.close();
					       }
				       })
			       } else {
                             send(req,res,{Status: "Failure!",Error: "Could'nt generate key, an internal server error ocurred!"},500);
				       client.close();
                             }
		       });
		       } else {
                      send(req,res,{Status: "Failure!",Error: "Could'nt generate key, user cannot have nore than 3 keys at a time!"},401);
			       client.close();
		       }
		    } else {
                     send(req,res,{Status: "Failure!",Error: "Could'nt generate key, invalid user credencials!"},401);
			    client.close();
		    }
		  });
		   } else {
                  send(req,res,{Status: "Failure!",Error: "Could'nt generate key, an internal server error ocurred!"},500);
		   }
		});
	} else {
          send(req,res,{Status: "Failure",Error: "Could'nt generate key, missing required feilds for authorization!"},400);
	}
}).get((req,res) => {

// VIEW EXISTING API KEYS:

	let buff = new Buffer(req.header("Authorization").split(" ")[1],"base64");
	let str = buff.toString("ascii");
 let [email,password] = str.split(":");
	password = password.slice(0,password.length-1);
  if (email && password) {
     let client = new MongoClient(uri);
	  client.connect(err => {
          if (!err) {
            let users = client.db("Statsuite").collection("Users");
 let hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

		  users.findOne({email: email,password: hashedPassword},(err,data) => {
			  if (!err) {
			if (data) { 
			  let keys = [];
			    data.keys.forEach(val => {
			      let keyObj = JSON.parse(fs.readFileSync("./.data/api-keys/" + val + ".json"));
				    let date = new Date(keyObj.expires);
				    let dateStr = date.toLocaleString();
				    keys.push({key: val, expires: dateStr});
			    });
                   send(req,res,{Status: "Success!",Keys: keys},200);
				client.close();
		    } else {
     send(req,res,{Status: "Failure!",Error: "Couldt'nt get user's keys, invalid user credentials!"},401);
			    client.close();
		    }
	         } else {
			 res.set("WWW-Authentication","Basic realm='Authorization to view keys in api/keys', charset='UTF-8'");
                    send(req,res,{Status: "Failure!",Error: "An internal server error ocurred!"},500);
			 client.close();
		  }
		  });
	  } else {
           send(req,res,{Status: "Failure!",Error: "Could'nt get user's keys, an internal server error occured!"},500);
	  }
	  })
  } else {
	  res.set("WWW-Authentication","Basic realm='Authorization to view keys in api/keys', charset='UTF-8'");
   send(req,res,{Status: "Failure!",Error: "Could'nt get user's keys, missing or invalid credentials in Authentication header!"},400);
  }
}).put((req,res) => {

// REFRESH AN API KEY:

 const {email,password,key} = req.body;
  if (email && password && key) {
     let client = new MongoClient(uri);
	  client.connect(err => {
            if (!err) {
		 let hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
          let users = client.db("Statsuite").collection("Users");
		   users.findOne({email: email, password: hashedPassword, keys: [key]},(err,data) => {
       if (!err) {
         if (data) {
		 let jsonKey = fs.readFileSync("./.data/api-keys/" +  key + ".json");
		 let objKey = JSON.parse(jsonKey), date = new Date();
		  objKey.expires = date.getTime() + 2592000000;
          fs.writeFile("./.data/api-keys/" + key + ".json",JSON.stringify(objKey),(err) => {
            if (!err) {
               send(req,res,{Status: "Success! your key " + "("+ key +") has been refreshed for another 30 days. You will be notified at " + email + " when your key is soon to expire."},200);
	    } else {
           send(req,res,{Status: "Failed!", Error: "Could'nt refresh user's key, an internal server error ocurred!"},500);
		    client.close();
	    }
	  });
	 } else {
       send(req,res,{Status: "Failed!",Error: "Could'nt refresh user's key, invalid user credentials!"},401);
		 client.close();
	 }
       } else {
      send(req,res,{Status: "Failed!", Error: "Could'nt refresh user's key, an internal server error ocurred!"},500);
	       client.close();
       }
          })
	    } else {
              send(req,res,{Status: "Failed!", Error: "Could'nt refresh user's key, an internal error ocurred!"},500);           
	    }
	  });
  } else {
   send(req,res,{Status: "Failure!", Error: "Could'nt refresh user's key, missing required feilds!"},400);
  }
})

module.exports = API;

