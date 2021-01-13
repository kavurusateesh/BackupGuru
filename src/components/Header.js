import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import  Httpconfig  from './helpers/Httpconfig';
var Constant = require('../constants');

export default class Header extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        validated : false
    }
  }
  
  openNav = () => {
    if (document.getElementById("mySidenav") ) {
      document.getElementById("mySidenav").style.width = "250px";
      
    }
  };
  logouts =(e) =>{
    Httpconfig.httptokenpost(Constant.siteurl+'api/Users/logout')
		.then((response) => {
		  localStorage.setItem('validated',false);
		  window.history.pushState("","","/");
		  window.location.reload();
	})
	.catch((error) => {
		console.log(error);
	})
  }

  logout = () => {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;
    
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }
  render(){
    return (
		<nav className="navbar navbar-default navbar-fixed-top nav-head">
			<div className="container-fluid">
			<div className="navbar-header">
			<a href="/Dashboard">
				<img src="/img/logo.jpg" class="logo-class" alt="Cloud9" title="Cloud9" width="300" /> 

				</a>
			<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>

			<a className="navbar-brand" href="#">
				<i className="fa fa-bars" onClick={this.openNav}></i>
			</a>

			</div>
			<div id="navbar" className="navbar-collapse collapse">
			<ul className="nav navbar-nav navbar-right">
			<li>
			<a className="dropdown-btn side_txt" onClick={this.logout}>
			<img src="/img/profile.png" className="user-image" alt="User Image"/>Admin <span className="caret"></span></a>
			<div className="dropdown-container drp_content">
			<a href="#" onClick={this.logouts}>Logout</a>
			</div>
			</li>
			</ul>
			</div>
			</div>
		</nav>
    )
  }
}