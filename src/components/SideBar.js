import React, {Component} from 'react';
import {Link, withRouter } from 'react-router-dom';
var Constant = require('../constants');

 class SideBar extends Component {
    
    closeNav = () => {
        if (document.getElementById("mySidenav") ) {
            document.getElementById("mySidenav").style.width = "0";
            
        }
    };

  showmenu = () => {
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
            <div id="mySidenav" className="sidenav">
            
			<a href="#" className="closebtn" onClick={this.closeNav}>&times;</a>

			<div className="side_box">

				<Link className="side_txt active" to="/Dashboard" onClick={this.closeNav}><i className="fa fa-dashboard"></i>Dashboard</Link>

				<Link className="side_txt active" to="/UserList" onClick={this.closeNav}><i className="fa fa-user"></i>Users</Link>

				<Link className="side_txt active" to="/Subscriptions" onClick={this.closeNav}><i className="fa fa-id-card"></i>Subscriptions</Link>

				<Link className="side_txt active" to="/Backups" onClick={this.closeNav}><i className="fa fa-cloud-download"></i>Backups</Link>

				<Link className="side_txt active" to="/Payments" onClick={this.closeNav}><i className="fa fa-credit-card"></i>Payments</Link>

			</div>
        </div>
        )
    }
}

export default withRouter(SideBar)