import React, { Component, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import { createHashHistory } from "history";
import axios from 'axios';
import  Httpconfig  from './helpers/Httpconfig';
import { ToastContainer } from "react-toastify";
import toast from "./toast";
var session = require('express-session');
var Constant = require('../constants');

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"email": '',
			"password": ''
		}
	}

	// When value changes of the fields
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	// To get all the categories
	userLogin = (event) => {
		event.preventDefault();
		let loginVal = {
			email: this.state.email,
			password: this.state.password,
			role: 'admin'
		};
		
	Httpconfig.httpPost(Constant.siteurl+'api/Users/login/', loginVal)
		.then((response) => {
			if(response.data.notification.code == '200') {
				localStorage.setItem("validated", true);
				localStorage.setItem("UserName", response.data.data.email);
				localStorage.setItem("userID", response.data.data.userID);
				localStorage.setItem("token", response.data.data.accessToken);
				window.location.reload();
			} else {
				//alert('Invalid credentials !!');
				toast.success("Invalid credentials !!");
				window.history.pushState("","","/Login");
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}
    render(){
	  return (
		<div className="Login">
			<div width="30%">&nbsp;</div>
			<div className="" width="40%">
			  <img src='/img/logo.jpg' className="imgCenter" />
			  <form onSubmit={this.userLogin.bind(this)} className="frmLoginBG">
				<FormLabel id="invalid"></FormLabel>
				<FormGroup controlId="email" bsSize="large">
				  <FormLabel>Email</FormLabel>
				  <FormControl autoFocus type="email" name="email" value={this.state.email} onChange={this.handleChange} />
				</FormGroup>
				<FormGroup controlId="password" bsSize="large">
				  <FormLabel>Password</FormLabel>
				  <FormControl name="password" value={this.state.password} onChange={this.handleChange} type="password" />
				</FormGroup>
				<Button block bsSize="large" type="submit"> Login </Button>
			  </form>
		    </div>
			<div width="30%">&nbsp;</div>
			<ToastContainer />
		</div>
		
	  );
	}
}