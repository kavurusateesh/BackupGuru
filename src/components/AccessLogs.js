import React, { Component, useState } from "react";

import { ToastContainer } from "react-toastify";
import toast from "./toast";
import { Link } from "react-router-dom";
import Httpconfig from "./helpers/Httpconfig";
import { MDBDataTable } from 'mdbreact';

var Constant = require("../constants");

export default class AccessLogs extends Component {
    constructor(props){
        super(props);
        this.state = {
          fields: {},
          errors: {},
          datatable : {
            columns: [
              {
                label: 'Access Type',
                field: 'access_type',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Notification',
                field: 'notification',
                sort: 'asc',
                width: 150
              }
            ],rows : []
          }
        };
    }
   
    componentDidMount(){
        const { handle } = this.props.match.params;
        const { type } = this.props.match.params;

         if(type == "Doctor"){
            var user_type = 'doctor_id';
         } else {
             var user_type = 'patient_id';
         }

        Httpconfig.httptokenget(Constant.siteurl+'api/AccessLogs/?'+user_type+'='+handle)
		.then((response) => {
            console.log(response.data)
			this.setState({
				patients: response.data
			});
			let accessArray = [];
			this.items = response.data.data.map((item, key) =>
            accessArray.push({
				 
				'access_type': item.access_type,
				'notification': item.notification,
				
			 })

			 
			)
			let newState = Object.assign({}, this.state);
			newState.datatable.rows = accessArray;
			this.setState(newState);
		})
		.catch((error) => {
			console.log(error);
		})

    }
    render() {
        const { datatable } = this.state;
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
									{ this.props.match.params.type == "Doctor" ?  
                                   <Link to="/DoctorRegistration"> Practitioners </Link> 
                                    : <Link to="/PatientRegistration"> Patients </Link> }
                                    &gt;
                                   Access Logs
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
										   <Link to="/admin"> Dashboard</Link> &gt;
											{ this.props.match.params.type == "Doctor" ?  
										   <Link to="/DoctorRegistration"> Practitioners </Link> 
											: <Link to="/PatientRegistration"> Patients </Link> }
											&gt;
										   Access Logs
										</li>
									  </ol>
									</div>
								</div>
                                <div className="row">
                                   <div className="tab-header">
                                      <h3> View  Access Logs</h3>
                                   </div>
                                   <div id="reg_form">
                                      
                                      {
                                         datatable.rows.length === 0 ?  <div className="row"><div className="col-md-12"><div className="form-group col-md-12 padErrorBG"> No Records Found </div></div></div>  :
                                            <MDBDataTable striped bordered small data={datatable} />
                                      }
                                      <div className="row">
                                         <div className="col-md-12">
                                            <div className="update_btn" style={{ 'textAlign': 'right' }}></div>
                                         </div>
                                      </div>
                                      <ToastContainer />
                                   </div>
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