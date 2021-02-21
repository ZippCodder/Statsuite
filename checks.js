const fs = require("fs");
const debug = require("util").debuglog("checks");
const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://deonrich:deonisawesome@scribler.lqhfr.mongodb.net/Statsuite?retryWrites=true&w=majority";

function check() {
	debug("Running check...".green);
 fs.readdir("./.data/api-keys",(err,files) => {
	 let client = new MongoClient(uri);
	 client.connect(err => {
		 let users = client.db("Statsuite").collection("Users");
   files.forEach(file => {
	   let path = "./.data/api-keys/";
	  let date = Date.now();
     let fileContent = JSON.parse(fs.readFileSync(path + file));
	   if (fileContent.expires < date) {
		   try {
               fs.unlinkSync(path + file);
	        users.updateOne({keys: [fileContent.key]},{$pull: {keys: fileContent.key}},(err,obj) => {
	       debug(fileContent.key + " was was deleted.".orange);
		})
		   } catch (err) {
                debug(String(err).red + "\n");
		   } 
                 debug("Checks finished successfully!".green);
	   }
   });
		 client.close();

	 })
 })
}

function init() {
setInterval(check,3600000); // 3600000
	debug("Expiration checkers are running...".black.bgYellow + "\n");
}

module.exports = init;
