import React, { Component } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    if( localStorage.getItem("validated") || window.location.pathname == '/ShowPage') {
      const status = (window.location.pathname == "/ShowPage") ? true : localStorage.getItem("validated");
      if(status == null) { status = false }
	  if(window.location.pathname == '/ShowPage') {
		  this.state = {
			validated : true,
			pagePass : true
		  }
	  } else {
		  this.state = {
			validated : status,
			pagePass: false
		  }
	  }
    } else {
      this.state = { 
        validated : false,
		pagePass: false
      }
    }
  }
  
  render() {
    return (
      <div>
      <body>
      <section className="content_wrapper">
      <header id="header">
		  { this.state.validated ? '' : <Login/> }
		  { this.state.validated==="false" ? <Login/> : this.state.validated }
		  { this.state.validated==="true" ? <Header /> : null }
		  { this.state.validated==="true" ? <Content />  : null }
		  { this.state.pagePass ? <Content /> : null }
		  { this.state.validated==="true" ? <Footer /> : null }
      </header>

      </section>
      </body>
      </div>
    );
  }
}

export default App;