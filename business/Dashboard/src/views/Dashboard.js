import React from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { vendor_ask, admin_ask } = React.useContext(AuthContext);
  const [count, setCount] = React.useState(null);
  const [business_count, setBusinessCount] = React.useState(null);
  const [event_count, setEventCount] = React.useState(null);
  const [classified_count, setClassifiedCount] = React.useState(null);
  const [review_count, setReviewCount] = React.useState(null);
  const getAllusers = async () => {
    const url = '/api/allusers/';
    const response = await fetch(url);
    const data = await response.json();
    if (response.status == 200) {
      setCount(data.count);
    }
    else {
      console.log("data not recieved");
    }
  }
  const getBusiness = async () => {
    const business_url = "/api/particularuserbusiness";
    const response = await fetch(business_url);
    const data = await response.json();
    if (response.status == 200) {
      setBusinessCount(data.count);
    }
    else {
      setBusinessCount(null);
    }
  }
  const getEvents = async () => {
    const event_url = "/api/particularuserevents";
    const response = await fetch(event_url);
    const data = await response.json();
    if (response.status == 200) {
      setEventCount(data.count);
    }
    else {
      setEventCount(null);
    }
  }
  const getClassifieds = async () => {
    const classified_url = "/api/particularuserclassifieds";
    const response = await fetch(classified_url);
    const data = await response.json();
    if (response.status == 200) {
      setClassifiedCount(data.count);
    }
    else {
      setClassifiedCount(null);
    }
  }
  const get_particular_user_reviews = async () => {
    const review_url = "/api/particularuser_reviews";
    const response = await fetch(review_url);
    const data = await response.json();
    if (response.status == 200) {
      setReviewCount(data.count);
    }
    else {
      setReviewCount(null);
    }
  }
  React.useEffect(() => {
    getAllusers();
    getBusiness();
    getEvents();
    getClassifieds();
    get_particular_user_reviews();
  }, []);
  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                {
                  vendor_ask == true && admin_ask == false && <h1 className="m-0">Vendor Dashboard</h1>
                }
                {
                  vendor_ask == false && admin_ask == false && <h1 className="m-0">User Dashboard</h1>
                }
                {
                  admin_ask == true && vendor_ask == true && <h1 className="m-0">Admin Dashboard</h1>
                }
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              {
                admin_ask == true && <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{count && count}</h3>
                      <p>Total Users</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <Link to="/userslist" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                  </div>
                </div>
              }
              {
                vendor_ask == true && <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{business_count && business_count}</h3>
                      <p>Business</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph" />
                    </div>
                    <Link to="/dashboardbusiness" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                  </div>
                </div>
              }
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{event_count && event_count}</h3>
                    <p>Events</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <Link to="/dashboardevents" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{classified_count && classified_count}<sup style={{ fontSize: 20 }}></sup></h3>
                    <p>Classifieds</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <Link to="/dashboardclassifieds" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                </div>
              </div>
              {
                vendor_ask == true && admin_ask == false && <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>{review_count && review_count}<sup style={{ fontSize: 20 }}></sup></h3>
                      <p>Total Reviews</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars" />
                    </div>
                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>
              }
            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  )
}
export default Dashboard;
