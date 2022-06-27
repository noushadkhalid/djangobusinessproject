import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const Sidebar = () => {
  const { vendor_ask, user, admin_ask } = React.useContext(AuthContext);
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img src="/static/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">Dashboard</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/static/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="/account" className="d-block">{user}</a>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item menu-open">
                <Link to="/dashboard" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                  </p>
                </Link>
              </li>
              {
                vendor_ask == true && <li className="nav-item">
                  <a href="/businessform" className="nav-link">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>Create Business</p>
                  </a>
                </li>
              }
              {
                vendor_ask == true && <li className="nav-item">
                  <a href="/productform" className="nav-link">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>Create Products</p>
                  </a>
                </li>
              }
              {
                vendor_ask == true && <li className="nav-item">
                  <a href="/dealsform" className="nav-link">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>Create Deals</p>
                  </a>
                </li>
              }
              <li className="nav-item">
                <a href="/eventsform" className="nav-link">
                  <i class="nav-icon fas fa-edit"></i>
                  <p>Create Events</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/classifiedsform" className="nav-link">
                  <i class="nav-icon fas fa-edit"></i>
                  <p>Create Classifieds</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/editprofileform" className="nav-link">
                  <i class="nav-icon fas fa-edit"></i>
                  <p>Edit Profile</p>
                </a>
              </li>
              {
                vendor_ask == true && <li className="nav-item">
                  <Link to="/dashboardbusiness" className="nav-link">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>Your Business</p>
                  </Link>
                </li>
              }
              {
                vendor_ask == true && <li className="nav-item">
                  <Link to="/dashboarddeals" className="nav-link">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>Your Deals</p>
                  </Link>
                </li>
              }
              {
                vendor_ask == true && <li className="nav-item">
                  <Link to="/dashboardproducts" className="nav-link">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>Your Products</p>
                  </Link>
                </li>
              }
              <li className="nav-item">
                <Link to="/dashboardevents" className="nav-link">
                  <i class="nav-icon fas fa-edit"></i>
                  <p>Your Events</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboardclassifieds" className="nav-link">
                  <i class="nav-icon fas fa-edit"></i>
                  <p>Your Classifieds</p>
                </Link>
              </li>
              {
                admin_ask == true &&
                <li className="nav-item">
                  <Link to="/userslist" className="nav-link">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>Users</p>
                  </Link>
                </li>
              }
              {
                admin_ask == true &&
                <li className="nav-item">
                  <Link to="/approveitems" className="nav-link">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>Approve Items</p>
                  </Link>
                </li>
              }
              {
                admin_ask == true &&
                <li className="nav-item">
                  <Link to="/createcategory" className="nav-link">
                    <i class="nav-icon fas fa-edit"></i>
                    <p>Create Category</p>
                  </Link>
                </li>
              }
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  )
}

export default Sidebar;
