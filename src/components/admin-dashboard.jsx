import React, { Component } from "react";
import AdminHomePage from "./admin-homepage";
import AdminSidebar from './admin-sidebar';
class AdminDashboard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="dashboard-template my-5">
          <div className="container-fluid">
            <div className="row">
              <AdminSidebar/>
              <AdminHomePage />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
