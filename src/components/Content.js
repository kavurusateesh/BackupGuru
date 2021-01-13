import React, { Component } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import Subscriptions from "./Subscriptions";
import CreateSubscriptions from "./CreateSubscriptions";
import NotFound from "./NotFound";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SideBar from "./SideBar";
import AccessLogs from "./AccessLogs";

export default class Content extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("validated")) {
      const status = localStorage.getItem("validated");
      if (status == null) {
        status = false;
      }
      this.state = {
        validated: status,
        module: null,
      };
    } else {
      this.state = {
        validated: false,
        module: null,
      };
    }
    // console.log(this.state.validated);
  }

  render() {
    return (
      <BrowserRouter>
        {this.state.validated === "true" ? <SideBar /> : null}
        <Switch>
          <Route path="/" exact strict render={() => (this.state.validated = true ? ( <Dashboard /> ) : ( <Redirect to="/" /> )) } />
          <Route path="/#" render={() => (this.state.validated = true ? ( <Dashboard /> ) : ( <Redirect to="/" /> )) } />
          <Route path="/Login" exact strict render={() => (this.state.validated = true ? ( <Dashboard /> ) : ( <Redirect to="/" /> )) } />

          <Route path="/Dashboard" exact strict component={Dashboard} />
          <Route path="/UserList" exact strict component={UserList} />
          <Route path="/CreateUser" exact strict component={CreateUser} />
          <Route path="/CreateUser/:handle" exact strict component={CreateUser} />
          <Route path="/Subscriptions" exact strict component={Subscriptions} />
          <Route path="/CreateSubscriptions" exact strict component={CreateSubscriptions} />
          <Route path="/CreateSubscriptions/:handle" exact strict component={CreateSubscriptions} />
          <Route path="/g" exact strict component={NotFound} />
          <Route path="/AccessLogs/:type/:handle" exact strict component={AccessLogs} />
          AccessLogs
          uploadFiles
        </Switch>
      </BrowserRouter>
    );
  }
}
