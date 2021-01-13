import React, { Component, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import Login from "./Login";
import axios from "axios";
import $ from "jquery";
import { ToastContainer } from "react-toastify";
import toast from "./toast";
import { Link } from "react-router-dom";
import Httpconfig from "./helpers/Httpconfig";
var Constant = require("../constants");

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderdata: "",
      fields: {},
      errors: {},
    };
  }

  // When value changes of the fields
  handleChange = (field, event) => {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({ fields });
  };

  checkSubmit(event) {
    event.preventDefault();
    const { handle } = this.props.match.params;

    if (this.handleValidation() && handle) {
      this.updateUser(event);
    } else if (this.handleValidation() && handle == undefined) {
      this.createUser(event);
    } else {
      toast.warn("Form has errors.");
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    var pattern = /^[a-zA-Z0-9]{3,20}$/g;

    if (!fields["email_id"]) {
      formIsValid = false;
      errors["email_id"] = "Email cannot be empty";
    } else if (typeof fields["email_id"] !== "undefined") {
      let lastAtPos = fields["email_id"].lastIndexOf("@");
      let lastDotPos = fields["email_id"].lastIndexOf(".");
      if ( !( lastAtPos < lastDotPos && lastAtPos > 0 && fields["email_id"].indexOf("@@") == -1 && lastDotPos > 2 && fields["email_id"].length - lastDotPos > 2 ) ) {
        formIsValid = false;
        errors["email_id"] = "Email is invalid";
      }
    }
    if (!fields["gender"]) {
      formIsValid = false;
      errors["gender"] = "Please select a gender";
    }
    if (!fields["phone"]) {
      formIsValid = false;
      errors["phone"] = "Phone number cannot be empty";
    } else if (fields["phone"].length < 10) {
	  formIsValid = false;
      errors["phone"] = "Phone number invalid";
    }
    if (!fields["password_main"]) {
      formIsValid = false;
      errors["password_main"] = "Password cannot be empty";
    } else if ( fields["password_main"].length < 8 || fields["password_main"].length > 20 ) {
	  formIsValid = false;
      errors["password_main"] = "Password shuold contain 8-20 characters";
    } else if ( !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20}$/.exec( fields["password_main"] ) ) {
	  formIsValid = false;
      errors["password_main"] = "Required one upper case, one small case, one number and one special character";
    }
    if (!fields["rpassword"]) {
      formIsValid = false;
      errors["rpassword"] = "Retype Password";
    } else if (fields["rpassword"] != fields["password_main"]) {
	  formIsValid = false;
      errors["rpassword"] = "Password Mismatch";
    }
    if (!fields["user_name"]) {
      formIsValid = false;
      errors["user_name"] = "Enter your First Name";
    } 
    else if (!/^[a-zA-Z0-9]{3,20}$/g.exec(fields["user_name"])) {
	  formIsValid = false;
      errors["user_name"] = "Special characters not allowed";
    }
    // if (!fields["first_name"]) {
    //   formIsValid = false;
    //   errors["first_name"] = "Enter your First Name";
    // } else if (!/^[a-zA-Z0-9]{3,20}$/g.exec(fields["first_name"])) {
	  // formIsValid = false;
    //   errors["first_name"] = "Special characters not allowed";
    // }
    // if (!fields["last_name"]) {
    //   formIsValid = false;
    //   errors["last_name"] = "Enter your Last Name";
    // } else if (!/^[a-zA-Z0-9]{3,20}$/g.exec(fields["last_name"])) {
	  // formIsValid = false;
    //   errors["last_name"] = "Special characters not allowed";
    // }
    // if (!fields["badge_no"]) {
    //   formIsValid = false;
    //   errors["badge_no"] = "Badge No. cannot be empty";
    // }

    this.setState({ errors: errors });
    return formIsValid;
  }

  // To get detais after first render
  componentDidMount = () => {
    const { handle } = this.props.match.params;
    this.getUserInfo(handle);
  };

  // To add new category when user submits the form
  createUser = (event) => {
    event.preventDefault();
    var handle = this.props.match.params.handle;
    const { fields, errors } = this.state;
    Httpconfig.httptokenpost(Constant.siteurl + "api/Users/", {
      user_name: fields["user_name"],
      email: fields["email_id"],
      mobile_no: fields["phone"],
      password: fields["password_main"],
      user_type: "user",
      status: 1,
      registration_type: "Web",
      gender: fields["gender"],
	    otp_verified: true
    })
      .then((response) => {
        toast.success("Successfully Created User");
        setTimeout(
          () => this.props.history.push("/UserList"),
          2000
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // To get all the UserInfo
  getUserInfo(handle) {
    Httpconfig.httptokenget(Constant.siteurl + "api/Users/" + handle)
      .then((response) => {
		  console.log(response.data);
        this.setState({
          fields: {
            email_id: response.data.email,
            phone: response.data.mobile_no,
            password_main: response.data.password,
            rpassword: response.data.password,
            user_name: response.data.user_name,
            gender: response.data.gender,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // To add new User when user submits the form
  updateUser = (event) => {
    event.preventDefault();
    const { handle } = this.props.match.params;
    const data = this.state.fields;
    Httpconfig.httptokenput(
      Constant.siteurl + "api/Users/" + handle,
      {
        data,
      }
    )

      .then((response) => {
        toast.success("User updated successfully");
        setTimeout(
          () => this.props.history.push("/UserList"),
          2000
        );

      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  render() {
    const { fields, errors, genderdata } = this.state;
    return (
      <section id="main_dashboard">
        <div className="container" id="main_front">
          <div className="row">
            <div className="col-md-12">
              <div className="dash-section">
                <div className="section-header">
                  <ol className="breadcrumb">
                    <li className="active">
                      <Link to="/Dashboard"> Dashboard</Link> &gt;
                      <Link to="/UserList"> Users</Link>
                    </li>
                  </ol>
                </div>
              </div>

              <section id="CMS_tab">
                <div className="CMS_content">
                  <div className="container">
					<div class="row">
						<div class="col-md-12 no_padding">
						  <ol className="breadcrumb action_bredcrumb">
							<li className="active">
							  <Link to="/Dashboard"> Dashboard</Link> &gt;
							  <Link to="/UserList"> Users</Link>
							</li>
						  </ol>
						</div>
					</div>
                    <div className="row">
                      <div className="tab-header">
                        <h3>Create User</h3>
                      </div>
                      <div id="reg_form">
                        <form onSubmit={this.checkSubmit.bind(this)}>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group col-md-12">
                                <input type="text" name="email_id" value={this.state.fields["email_id"] || ""} onChange={this.handleChange.bind(this, "email_id")} className="form-control" placeholder="Email ID" />
                                <span className="cRed">
                                  {this.state.errors["email_id"]}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group col-md-12">
                                <input type="text" name="phone" value={this.state.fields["phone"] || ""} onChange={this.handleChange.bind(this, "phone")} className="form-control" placeholder="Phone Number" />
                                <span className="cRed">
                                  {this.state.errors["phone"]}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group col-md-12">
                                <input type="password" name="password_main" value={ this.state.fields["password_main"] || "" } onChange={this.handleChange.bind(this, "password_main")} className="form-control" placeholder="Enter Password" />
                                <span className="cRed">
                                  {this.state.errors["password_main"]}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group col-md-12">
                                <input type="password" name="rpassword" value={this.state.fields["rpassword"] || ""} onChange={this.handleChange.bind(this, "rpassword" )} className="form-control" placeholder="Retype Password" />
                                <span className="cRed">
                                  {this.state.errors["rpassword"]}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group col-md-12">
                                <input type="text" name="user_name" value={this.state.fields["user_name"] || ""} onChange={this.handleChange.bind(this, "user_name")} className="form-control" placeholder="User Name" />
                                <span className="cRed">
                                  {this.state.errors["user_name"]}
                                </span>
                              </div>
                            </div>
							<div className="col-md-4">
                              <div className="form-group col-md-12">
                                <select name="gender" onChange={this.handleChange.bind(this, "gender")} value={this.state.fields["gender"] || ""} className="form-control">
                                  <option value="">Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Others">Others</option>
                                </select>
                                <span className="cRed">
                                  {this.state.errors["gender"]}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-8">
                              <button type="submit" className="btn  btn-primary padTopCategorySave fright">
                                Save User
                              </button>{" "}
                              &nbsp;
                              <Link to="/UserList" className="padTopCategorySave hrefCategory fright">
                                Cancel
                              </Link>{" "}
                              &nbsp; &nbsp;
                            </div>
                          </div>
                        </form>
                      </div>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
