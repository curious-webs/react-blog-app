import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class AdminSidebar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul className="nav flex-column pt-3">
              <NavLink className="nav-link" to="/admin-dashboard">
               Dashboard
              </NavLink>
              <NavLink className="nav-link" to="/posts-dashboard">
                Posts
              </NavLink>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default AdminSidebar;
