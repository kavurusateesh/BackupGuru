import React, {Component} from 'react';
import Login from './Login';
import  Httpconfig  from './helpers/Httpconfig';
import { Link } from 'react-router-dom';
var Constant = require('../constants');


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
			user_count: 0,
			subscription_count: 0,
			backup_count: 0,
			payment_count: 0,
        }
    }

	// To get detais after first render
	componentDidMount = () => {
		this.getUserCount();
		this.getSubscriptionCount();
	}

	// To get all Users
	getUserCount() {
		Httpconfig.httptokenget(Constant.siteurl+'api/Users/getUserCount')
		.then((response) => {
			var count = response.data.data;
			this.setState({ user_count: count });
		})
		.catch((error) => {
			console.log(error);
		})
	}

	// To get all Subscriptions
	getSubscriptionCount() {
		Httpconfig.httptokenget(Constant.siteurl+'api/Users/getUserCount')
		.then((response) => {
			var count = response.data.data;
			this.setState({ subscription_count: count });
		})
		.catch((error) => {
			console.log(error);
		})
	}

    render(){ 
        return (
			<section id="main_dashboard">
				<div className="container" id="main_front">

              <section id="CMS_tab">
                <div className="CMS_content">
                  <div className="container">
					<div class="row">
						<div class="col-md-12 no_padding">
						  <ol className="breadcrumb action_bredcrumb">
							<li className="active">
							  Dashboard
							</li>
						  </ol>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<h3 class="section-h3">Dashboard</h3>
							<div className="dash_content">
								<div className="row">
								
									<div className="col-md-3">
										<div className="doc_info_box">
											<span className="info-box-icon bg-red"><i className="fa fa-user"></i></span>
											<div className="info_box_content">
												<Link to="/UserList" className="dash_content_item">
													<span className="info-box-text">Users</span>
													<span className="info-box-number" >{ this.state.user_count }</span>
												</Link>
											</div>
										</div>
									</div>

									<div className="col-md-3">
										<div className="doc_info_box">
											<span className="info-box-icon bg-aqua"><i className="fa fa-id-card"></i></span>
											<div className="info_box_content">
												<Link to="/Subscriptions" className="dash_content_item">
													<span className="info-box-text">Subscriptions</span>
													<span className="info-box-number" >{ this.state.subscription_count }</span>
												</Link>
											</div>
										</div>
									</div>
								  
									<div className="col-md-3">
										<div className="doc_info_box">
											<span className="info-box-icon bg-blue"><i className="fa fa-cloud-download"></i></span>
											<div className="info_box_content">
												<Link to="/Backups" className="dash_content_item">
													<span className="info-box-text">Backups</span>
													<span className="info-box-number" >{ this.state.backup_count }</span>
												</Link>
											</div>
										</div>
									</div>

									<div className="col-md-3">
										<div className="doc_info_box">
											<span className="info-box-icon bg-green"><i className="fa fa-credit-card"></i></span>
											<div className="info_box_content">
												<Link to="/Payments" className="dash_content_item">
													<span className="info-box-text">Payments</span>
													<span className="info-box-number" >{ this.state.payment_count }</span>
												</Link>
											</div>
										</div>
									</div>

								</div>
							</div>


						</div>
					</div>
                  </div>
                </div>
              </section>
				</div>
			</section>
        )
    }
}
