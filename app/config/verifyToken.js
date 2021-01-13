var jwt = require("jsonwebtoken");
const db = require("../models");
var dbConfig = require("../config/db.config");
const Users = db.users_tbl;
function verifyToken(req, res, next) {
  try {

	const token =req.headers.authorization;
	 const decoded = jwt.verify(token, dbConfig.SECRET);	
	Users.findOne({
		where:{id: decoded.userID}
	}).then(function (user) {
		if (!user) {
			res.status(401).send({
				message: 'Unknown Token'				
			  });
		}		
		if(decoded && user.token === token)
		{
			req.user = decoded;
			res.user = decoded;
			req.token= token;
			next();
		}
		else{
			res.status(200).send({
				status: 401,
				error: false,         
				message: "Please Token is not valid! Login Again.",
			   
			  });
			// res.status(401).send({
			// 	message: "Please Token is not valid! Login Again."				
			//   });
		}
	});

  } catch (error) {	 
	res.status(401).send({
		message: "Authentication Failure !!"		
	  });
  }
}
module.exports = verifyToken;
