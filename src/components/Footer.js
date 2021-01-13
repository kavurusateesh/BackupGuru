import React, {Component} from 'react';

var Constant = require('../constants');

export default class Footer extends Component {
 
 
    render(){
        return (
              <footer id="footer">
                      <div className="container">
                          <div className="row">
                                  <div className="col-md-12">
                              <div className="footer_section">
                                      <p>© Medley Medical Solutions Pvt. Ltd. { (new Date()).getFullYear() }. All Rights Reserved.</p> 
                                  </div>
                              </div>
                          </div>
                      </div>
                  </footer>
        )
    }
}