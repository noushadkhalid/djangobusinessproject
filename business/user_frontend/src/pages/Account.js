import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import DeleteAccount from "../AccountPages/DeleteAccount";
import ResetPassword from "../AccountPages/ResetPassword";
const Account = () => {
    const { user, user_data } = React.useContext(AuthContext);
    return (
        <div className="container mt-5 mb-md-4 py-5">
             {/* Reset Password Modal */}
             <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <ResetPassword />
            </div>
            {/* Delete Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <DeleteAccount />
            </div>
            {/* Breadcrumbs*/}
            <nav className="mb-4 pt-2 pt-lg-3" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/account">Account</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Personal info</li>
                </ol>
            </nav>
            {/* Account header*/}
            <div className="d-flex align-items-center justify-content-between pb-4 mb-2">
                <div className="d-flex align-items-center">
                    <div className="position-relative flex-shrink-0"><img className="rounded-circle border border-white" src={user_data.image_field} width={100} alt="Annette Black" />
                    </div>
                    <div className="ps-3 ps-sm-4">
                        <h3 className="h4 mb-2">{user}</h3><span className="star-rating"></span>
                    </div>
                </div>
            </div>
            {/* Page content*/}
            <div className="card card-body p-4 p-md-5 shadow-sm">
                {/* Account nav*/}
                <div className="mt-md-n3 mb-4"><a className="btn btn-outline-primary btn-lg rounded-pill w-100 d-md-none" href="#account-nav" data-bs-toggle="collapse"><i className="fi-align-justify me-2" />Account Menu</a>
                    <div className="collapse d-md-block" id="account-nav">
                        <ul className="nav nav-pills flex-column flex-md-row pt-3 pt-md-0 pb-md-4 border-bottom-md">
                            <li className="nav-item mb-md-0 me-md-2 pe-md-1"><Link className="nav-link" to="/account" aria-current="page"><i className="fi-user mt-n1 me-2 fs-base" />Personal Info</Link></li>
                            <li className="nav-item mb-md-0 me-md-2 pe-md-1"><Link className="nav-link" to="/user_reviews"><i className="fi-star mt-n1 me-2 fs-base" />Reviews</Link></li>
                            <li className="nav-item mb-md-0 me-md-2 pe-md-1"><Link className="nav-link" to="/myfavourites"><i className="fi-star mt-n1 me-2 fs-base" />Favorites</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="d-flex flex-md-row flex-column align-items-md-center justify-content-md-between mb-4 pt-2">
                    <h1 className="h3 mb-0">Personal Info</h1>
                </div>
                <div className="border rounded-3 p-3 mb-2" id="personal-info">
                    {/* Name*/}
                    <div className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2">
                                <label className="form-label fw-bold">Full name</label>
                                <div id="name-value">{user_data.first_name} {user_data.last_name}</div>
                            </div>
                        </div>
                    </div>
                    {/* Gender*/}
                    <div className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2">
                                <label className="form-label fw-bold">Gender</label>
                                <div id="gender-value">Not specified</div>
                            </div>
                        </div>
                    </div>
                    {/* Date of birth*/}
                    <div className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2">
                                <label className="form-label fw-bold">Date of birth</label>
                                <div id="birth-value">{user_data.date_of_birth}</div>
                            </div>
                        </div>
                    </div>
                    {/* Email*/}
                    <div className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2">
                                <label className="form-label fw-bold">Email</label>
                                <div id="email-value">{user_data.email}</div>
                            </div>
                        </div>
                    </div>
                    {/* Phone number*/}
                    <div className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2">
                                <label className="form-label fw-bold">Phone number</label>
                                <div id="phone-value">(302) 555-0107</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2">
                                <label className="form-label fw-bold">Profession</label>
                                <div id="address-value">{user_data.profession}</div>
                            </div>
                        </div>
                    </div>
                    {/* Address*/}
                    <div className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2">
                                <label className="form-label fw-bold">Address</label>
                                <div id="address-value">Not specified</div>
                            </div>
                        </div>
                    </div>
                    {/*  Account Delete Button */}
                    <div className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pe-2">
                                <button type="button" className="btn btn-danger btn-sm rounded-pill ms-2 order-lg-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete Account</button>
                                <button type="button" className="btn btn-warning btn-sm rounded-pill ms-2 order-lg-3" data-bs-toggle="modal" data-bs-target="#exampleModal2">Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Account;