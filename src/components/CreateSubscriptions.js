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
// import { Multiselect } from "multiselect-react-dropdown";

export default class createCoupons extends Component {

   constructor(props) {
      super(props);
      this.state = {
         fields: {},
         errors: {},
         coupon_data: '',

         options: [],
         userarray: [],
         customersarray: [],
         selectedList: {},
         selectedValue: [],
      };
   }

   setStartTimeOnChange = (value) => {
      this.setState({ start_date: value });
   };

   setEndTimeOnChange = (value) => {
      this.setState({ end_date: value });
   };

   // To get detais after first render
   componentDidMount = () => {
      const { handle } = this.props.match.params;
        if (handle) {
        this.getSubscriptionInfo(handle);
      } 
      
   };
   onSelect = (selectedListdata, selectedItem) => {
      this.setState({
         selectedList: selectedListdata.map((x) => x.id),
      });

   };

   onRemove = (deselectedList, removedItem) => {
      this.setState({
         selectedList: deselectedList.map((x) => x.id),
      });
      console.log(Object.assign({}, this.state.selectedList))
   };

   // When value changes of the fields
   handleChange = (field, event) => {
      let fields = this.state.fields;
      fields[field] = event.target.value;
      this.setState({ fields });
   };

   // To get all the ResponderInfo
   getSubscriptionInfo(handle) {
      Httpconfig.httptokenget(Constant.siteurl + "api/Subscription/" + handle)
         .then((response) => {
            this.setState({
               fields: {
                packname: response.data.packname,
                data_size: response.data.data_size,
                is_main: response.data.is_main,
                status: response.data.status,
               },
            });

            this.setState({ start_date: new Date(response.data.formdate) });
            this.setState({ end_date: new Date(response.data.todate) });

          

         }).catch((error) => {
            console.log(error);
         });
   }


   // create or update   
   checkSubmit(event) {
      event.preventDefault();
      const { handle } = this.props.match.params;
     // console.log("--- handle---- ", handle)
      if (this.handleValidation() && handle) {
         this.updateCoupons(event);
      } else if (this.handleValidation() && handle == undefined) {
         this.createSubscription(event);
      } else {
         toast.warn("Form has errors.");
      }
   }
   // creates new controller
   createSubscription = (event) => {
      event.preventDefault();
      const { fields, errors } = this.state;

      Httpconfig.httptokenpost(Constant.siteurl + "api/Subscription/", {
        packname: fields["packname"],
         start_date: this.state.start_date,
         end_date: this.state.end_date,
         data_size: fields["data_size"],
         is_main: fields["is_main"],         
         //customers: this.state.selectedList.toString(),
      }).then((response) => {
         toast.success("Successfully Created Subscriptions");
         setTimeout(
            () => this.props.history.push("/Subscriptions"),
            10000
         );
      }).catch((error) => {
         console.log(error);
      });
   }

   // updates controller
   updateCoupons = (event) => {
      event.preventDefault();
      const { handle } = this.props.match.params;
      const { fields, errors } = this.state;
      Httpconfig.httptokenput(Constant.siteurl + "api/Subscription/" + handle,
         {
          packname: fields["packname"],
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          data_size: fields["data_size"],
          is_main: fields["is_main"], 
            //customers: this.state.selectedList.toString(),
         }
      ).then((response) => {
         toast.success("Successfully Updated Subscription");
         setTimeout(
            () => this.props.history.push("/Subscriptions"),
            2000
         );
      }).catch((error) => {
         console.log(error);
         toast.error(error);
      });
   }

   handleValidation() {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["packname"]) {
         formIsValid = false;
         errors["packname"] = "Pack name cannot be empty";
      }
      if (!this.state.start_date) {
         formIsValid = false;
         errors["start_date"] = "Start Date cannot be empty";
      }
      if (!this.state.end_date) {
         formIsValid = false;
         errors["end_date"] = "End Date cannot be empty";
      }
      if (!fields["data_size"]) {
         formIsValid = false;
         errors["data_size"] = "Data Size cannot be empty";
      }
      if (!fields["is_main"]) {
        formIsValid = false;
        errors["is_main"] = "Is Main cannot be empty";
     }
      this.setState({ errors: errors });
      return formIsValid;
   }

   render() {
      const { fields, errors, coupon_data } = this.state;
      return (
         <section id="main_dashboard">
            <div className="container" id="main_front">
               <div className="row">
                  <div className="col-md-12">
                     <div className="dash-section">
                        <div className="section-header">
                           <ol className="breadcrumb">
                              <li className="active">
                                 <Link to="/admin"> Dashboard</Link> &gt;
                              <a> Coupons </a>
                              </li>
                           </ol>
                        </div>
                     </div>

                     <section id="CMS_tab">
                        <div className="CMS_content">
                           <div className="container">
                              <div className="row">
                                 <div className="tab-header">
                                    <h3>Create Coupon Management</h3>
                                 </div>
                                 <div id="reg_form">
                                    <form onSubmit={this.checkSubmit.bind(this)}>
                                    <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group col-md-12">
                                      <DatePicker name="start_date" autoComplete="off" className="dateInput" placeholderText="Start Date" selected={this.state.start_date} onChange={this.setStartTimeOnChange} dateFormat="yyyy-MM-d" calendarIcon showMonthDropdown adjustDateOnChange /><br />
                                      <span className="cRed">
                                      {this.state.errors["start_date"]}
                                    </span>
                                   </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group col-md-12">
                                  <DatePicker name="end_date" autoComplete="off" className="dateInput" placeholderText="End Date" selected={this.state.end_date} onChange={this.setEndTimeOnChange} dateFormat="yyyy-MM-d" calendarIcon showMonthDropdown adjustDateOnChange /><br />
                                    <span className="cRed">
                                    {this.state.errors["end_date"]}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group col-md-12">
                                      <input type="text" name="packname"value={this.state.fields["packname"] || ""} onChange={this.handleChange.bind(this,"packname")} className="form-control"  placeholder="Pack Name"/>
                                      <span className="cRed">
                                      {this.state.errors["packname"]}
                                     </span>
                                   </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group col-md-12">
                                  <input type="text"  name="data_size"value={this.state.fields["data_size"] || ""} onChange={this.handleChange.bind(this, "data_size")}  className="form-control" placeholder="Data Size"/>
                                  <span className="cRed">
                                   {this.state.errors["data_size"]}
                                  </span>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group col-md-12">
                                      <input type="text" name="is_main"value={this.state.fields["is_main"] || ""} onChange={this.handleChange.bind(this,"is_main")} className="form-control"  placeholder="Is Main"/>
                                      <span className="cRed">
                                      {this.state.errors["is_main"]}
                                     </span>
                                   </div>
                                </div>
                               
                              </div>

                                     

                                       {/* <div className="row">
                                          <div className="col-md-4">
                                             <div className="form-group col-md-12">
                                                <Multiselect
                                                   onChange={this.handleChange.bind(
                                                      this,
                                                      "customers"
                                                   )}
                                                   name="customers"
                                                   options={this.state.options} // Options to display in the dropdown
                                                   value={this.state.selectedList || ""}
                                                   selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                                   onSelect={this.onSelect} // Function will trigger on select event
                                                   placeholder="Select Customers"
                                                   onRemove={this.onRemove} // Function will trigger on remove event
                                                   displayValue="name" // Property name to display in the dropdown options
                                                />
                                                <span className="cRed">
                                                   {this.state.errors["customers"]}
                                                </span>
                                             </div>
                                          </div>
                                       </div> */}

                                       <div className="row">
                                          <div className="form-group col-md-8">
                                             <button
                                                type="submit"
                                                className="btn  btn-primary padTopCategorySave fright"                                      >
                                                Save Coupon
                              </button>{" "}
                              &nbsp;
                              <Link to="/Subscriptions" className="padTopCategorySave hrefCategory fright">
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
      )
   }
}

