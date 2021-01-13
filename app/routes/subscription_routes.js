module.exports = app =>{
const Subscription = require('../controllers/subscription_controller')
var router = require('express').Router();
//const VerifyToken = require('../config/verifyToken');
 // ------------------------- Admin Based Apis -----------------------------------------------//
	// Create a new User
	router.post("/", Subscription.create);
	// Login
	//router.post("/login",  Users.login);
	
	// Find All Users
	router.get('/', Subscription.findAll); 
	// Forget Password
	//router.post("/forgetPassword", Users.forgetPassword);
	// Retrieve all Responders
	router.get('/:id', Subscription.findOne); 
	router.put("/:id", Subscription.update);
	// Delete a User with id
	router.delete("/:id", Subscription.delete);

	app.use('/api/Subscription',router)    
}