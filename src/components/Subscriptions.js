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

export default class ViewSubscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_data: "",
      datatable: {
        columns: [
          {
            label: "Formdate",
            field: "formdate",
            sort: "asc",
            width: 150,
          },
          {
            label: "Todate",
            field: "todate",
            sort: "asc",
            width: 150,
          },
          {
            label: "Packname",
            field: "packname",
            sort: "asc",
            width: 150,
          },
          {
            label: "Main",
            field: "is_main",
            sort: "asc",
            width: 150,
          },
          {
            label: "Data Size",
            field: "data_size",
            sort: "asc",
            width: 150,
          },
          {
            label: "Actions",
            field: "actions",
            sort: "asc",
            width: 10,
          },
        ],
        rows: [],
      },
    };
    this.deleteSubscription = this.deleteSubscription.bind(this);
  }

  // To get detais after first render
  componentDidMount = () => {
    this.fetchpagesdata();
  };

  // When value changes of the fields -------------------------
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  fetchpagesdata() {
    Httpconfig.httptokenget(Constant.siteurl + "api/Subscription")
      .then((response) => {
        this.setState({
          page_data: response.data,
        });
        let assignvalues = [];
        this.items = response.data.map((item, key) =>
          
          assignvalues.push({
            formdate: item.formdate,
            todate: item.todate,
            packname : item.packname,
            is_main: item.is_main,
            data_size: item.data_size,
            actions: (
              <div>
                
                <span><Link  to={'/CreateSubscriptions/'+item.id}  className="fa fa-edit point-cursor" title={"Update " + item.packname}></Link></span> &nbsp; 
					
                &nbsp;
                <span>
                  <i
                    onClick={() => this.deleteSubscription(item.id, item.packname)}
                    className="fa fa-trash point-cursor"
                    title={"Delete " + item.packname}
                  ></i>
                </span>{" "}
                &nbsp;
              </div>
            ),
          })
        );
        // console.log(assignvalues);
        // console.log("Hai Avinash");
        // return;
        let cancellationState = Object.assign({}, this.state);
        // console.log(datatable.rows.length+" datatable.rows.length");
        cancellationState.datatable.rows = assignvalues;
        this.setState(cancellationState);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //delete controller
  deleteSubscription(id, name) {
    var isConfirm = window.confirm("Are you sure to delete " + name + "?");
    if (isConfirm) {
      Httpconfig.httptokendelete(Constant.siteurl + "api/Subscription/" + id)
        //axios.delete(Constant.siteurl+'api/Users/'+cancellationId)
        .then((response) => {
          toast.success("Successfully Deleted Subscription ");
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
                      <Link to="/Dashboard"> Dashboard</Link> &gt; subscription 
                    </li>
                  </ol>
                </div>
              </div>

              <section id="CMS_tab">
                <div className="CMS_content">
                  <div className="container">
                    <div className="row">
                      <div className="tab-header">
                        <h3> Subscription  </h3>
                      </div>
                      <div id="reg_form">
                        <form>
                          <div className="row">
                            <div className="form-group col-md-12">
                              <Link
                                to="/CreateSubscriptions"
                                className="btn  btn-primary fright"
                              >
                                Create Subscription
                              </Link>
                            </div>
                          </div>
                        </form>
                        {datatable.rows.length === 0 ? (
                          <p>Loading............</p>
                        ) : (
                          <MDBDataTable
                            striped
                            bordered
                            small
                            data={datatable}
                          />
                        )}
                        <div className="row">
                          <div className="col-md-12">
                            <div
                              className="update_btn"
                              style={{ textAlign: "right" }}
                            ></div>
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
    );
  }
}
