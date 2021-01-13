import React, {Component} from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Login from './Login';
import axios from 'axios';
import $ from "jquery";
import { ToastContainer } from 'react-toastify';
import toast from './toast';
import {Link} from 'react-router-dom';
import  Httpconfig  from './helpers/Httpconfig';
import { MDBDataTable } from 'mdbreact';
var Constant = require('../constants');

export default class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = { datatable : {
			columns: [
			  {
				label: 'Name',
				field: 'name',
				sort: 'asc',
				width: 150
			  },
			  {
				label: 'Email',
				field: 'email',
				sort: 'asc',
				width: 270
			  }, 
			  {
				label: 'Phone',
				field: 'phone',
				sort: 'asc',
				width: 270
			  },
			  {
				label: 'Subscription',
				field: 'role',
				sort: 'asc',
				width: 270
			  },
			 {
				label: 'Actions',
				field: 'actions',
				sort: 'asc',
				width: 10 
			  }
			], rows : []
		}	
     }
		this.deleteUser = this.deleteUser.bind(this);
	}

	// When value changes of the fields
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	// To get detais after first render
	componentDidMount = () => {
		this.getUserList();
	}

	// To get all the categories
	getUserList() {
		Httpconfig.httptokenget(Constant.siteurl+'api/Users')
		.then((response) => {
			this.setState({
				users: response.data.data
			});

			let userList = [];
			this.items = response.data.data.map((item, key) =>
				userList.push({
					'name': <span className={item.status == 0 ? "inactiveColor" : ""}> {item.user_name} </span>,
					'email': item.email,
					'phone': item.mobile_no,
					'role': item.current_subscription,
					'actions': 
					<div>
						<span><Link  to={'/CreateUser/'+item.id}  className="fa fa-edit point-cursor" title={"Update " + item.email}></Link></span> &nbsp; 
						{/* <span><Link  to = {'/UploadImages/'+'responder/'+item.id}  className="fa fa-upload point-cursor" title={"Update " + item.email}></Link></span> &nbsp;  */}
						<span><i onClick={() => this.updateStatus(item.id,item.status)} className= {item.status == "1" ? "fa fa-check  point-cursor": "fa fa-times  point-cursor" } title={item.status == "1" ? "Active - Set Inactive Status": "Inactive - Set Active Status"}></i> </span> &nbsp; 
 						<span><i onClick={() => this.deleteUser(item.id, item.user_name+' '+item.last_name)} className="fa fa-trash point-cursor" title={"Delete " + item.user_name+' '+item.last_name}></i></span> &nbsp; 
						
					</div>
				})
			);
			let responderState = Object.assign({}, this.state);
			responderState.datatable.rows = userList;
			this.setState(responderState);
		})
		.catch((error) => {
			console.log(error);
		})
	}

	//update status for responder
	updateStatus(userId,Status){
		var isConfirm = window.confirm("Are you sure to Update Status "+ Status);
		Httpconfig.httptokenput(Constant.siteurl+'api/Users/updateStatus/'+userId+'/'+Status)
		.then((response) => {
			toast.success("Successfully updates Status");	
			setTimeout( () => window.location.reload(false), 2000 );
		})
		.catch((error) => {
			console.log(error);
		});
	}
	// To delete any category
	deleteUser(userId, userName) {
		var isConfirm = window.confirm("Are you sure to delete"+ userName);
		if(isConfirm) {
			Httpconfig.httptokendelete(Constant.siteurl+'api/Users/'+userId)
			.then((response) => {
				toast.success("User deleted Successfully");
				setTimeout(() => window.location.reload(), 2000);
				//this.props.history.push('/UserList');
			})
			.catch((error) => {
				console.log(error);
			});
			this.getUserList();
		}
	}


// To Edit any User
updateUser(userId) {
	window.location.href = '/CreateUser/'+userId;
}
    render(){
		const { users,datatable } = this.state;
        return (
            <section id="main_dashboard">
				<div className="container" id="main_front">
					<div className="row">
						<div className="col-md-12">
							

							<section id="CMS_tab">
								<div className="CMS_content">
									<div className="container">
									<div class="row">
									<div class="col-md-12 no_padding">
								
									<ol className="breadcrumb  action_bredcrumb">
										<li className="active">
											<Link to="/Dashboard"> Dashboard</Link> &gt; 
											Users
										</li>
									</ol>
							
									</div>
									</div>
										<div className="row">
											<div className="tab-header">
												<h3>Users</h3>
											</div>
											<form onSubmit={this.createUser}>
													<div className="row">
														<div className="form-group col-md-12">
															<Link  to="/CreateUser"  className="btn  btn-primary-add fright head_btn" ><img src="../img/create_practitioner-icon.svg" className="action_btn_icon" />Create User</Link>
														</div>
													</div>
												</form>
											<div id="reg_form">
												
												{
													datatable.rows.length === 0 ?  <p>Loading...</p> : 	
													<MDBDataTable striped bordered small data={datatable} />
												}
												<div className="row">
													<div className="col-md-12">
														<div className="update_btn" style={{'textAlign' : 'right'}}></div>
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