import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import React from "react";
const Register = () => {
    const { registerUser,error } = useContext(AuthContext);
    const [checked, setChecked] = useState(true);
    if(error.username || error.email || error.password){
        document.getElementById("register_error_alert").classList.add("show");
        document.getElementById("register_error_alert").style.display="block";
        setTimeout(()=>{
            document.getElementById("register_error_alert").classList.remove("show");
            document.getElementById("register_error_alert").style.display="none";
        },30000);
    }
    const handleValue = () => {
        if (checked) {
            setChecked(false);
        }
        else {
            setChecked(true);
        }
    }
    return (
        <div>
            <div className="modal fade" id="signup-modal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto" style={{ maxWidth: 734 }}>
                    <div className="modal-content">
                        <div className="modal-body p-sm-5">
                            <button className="btn-close position-absolute top-0 end-0 mt-3 me-3" type="button" data-bs-dismiss="modal" />
                            <ul className="nav nav-pills flex-column flex-sm-row border-bottom pb-4 mt-sm-n2 my-4" role="tablist">
                                <li className="nav-item me-sm-3 mb-sm-0"><a className="nav-link active" href="#job-seeker" data-bs-toggle="tab" role="tab" aria-controls="job-seeker" aria-selected="true"><i className="fi-user me-2" />Register Here</a></li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="job-seeker" role="tabpanel">
                                    <h3>Register</h3>
                                    <p className="pb-3">Get access to all the functions of the site that will help you find a great business.</p>
                                    <div className="alert alert-success alert-dismissible fade" role="alert" id="register_success_alert" style={{ display: 'none' }}>
                                        Registered Successfully check your email to verify the account
                                    </div>
                                    <div className="alert alert-warning alert-dismissible fade" role="alert" id="register_error_alert" style={{ display: 'none' }}>
                                       {
                                           error.username && error.username
                                       }
                                       {
                                           error.password && error.password
                                       }
                                       {
                                           error.email && error.email
                                       }
                                    </div>
                                    <div className="d-flex align-items-center py-2 mb-2">
                                        <hr className="w-100" />
                                        <div className="px-3">Or</div>
                                        <hr className="w-100" />
                                    </div>
                                    <form className="needs-validation" onSubmit={registerUser}>
                                        <div className="row gx-2 gx-md-4">
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="js-fn">First Name</label>
                                                <input className="form-control" type="text" id="js-fn" placeholder="Enter your first name" name="first_name" required />
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="js-fn">Last Name</label>
                                                <input className="form-control" type="text" id="js-fn" placeholder="Enter your Last name" name="last_name" required />
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="js-fn">Username</label>
                                                <input className="form-control" type="text" id="js-fn" placeholder="Enter your Username" name="username" required />
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="js-email">Email</label>
                                                <input className="form-control" type="email" id="js-email" placeholder="Enter your Email" name="email" required />
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="js-password">Password <span className="text-muted">(min. 8 char)</span></label>
                                                <div className="password-toggle">
                                                    <input className="form-control" type="password" id="js-password" minLength={8} required name="password" />
                                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                                        <input className="password-toggle-check" type="checkbox" /><span className="password-toggle-indicator" />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="js-password-confirm">Confirm password</label>
                                                <div className="password-toggle">
                                                    <input className="form-control" type="password" id="js-password-confirm" minLength={8} required name="password2" />
                                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                                        <input className="password-toggle-check" type="checkbox" /><span className="password-toggle-indicator" />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <input className="form-check-input" type="checkbox" id="agree-to-terms" value={checked ? true : false} onChange={handleValue} name="vendor_ask" checked={checked} />
                                                <label className="form-check-label" htmlFor="agree-to-terms" style={{ paddingLeft: 4 }}>Do you want to sign up as vendor</label>
                                            </div>
                                        </div>
                                        <div className="form-check mb-4">
                                            <input className="form-check-input" type="checkbox" id="agree-to-terms" required />
                                            <label className="form-check-label" htmlFor="agree-to-terms">By joining, I agree to the <a href="#">Terms of use</a> and <a href="#">Privacy policy</a></label>
                                        </div>
                                        <button className="btn btn-primary btn-lg w-100 rounded-pill" type="submit">Sign up</button>
                                    </form>
                                </div>
                                <div className="tab-pane fade" id="employer" role="tabpanel">
                                    <h3>Register to post a vacancy</h3>
                                    <p className="pb-3">Get access to all special services for employers on Finder.</p>
                                    <form className="needs-validation" noValidate>
                                        <div className="row gx-2 gx-md-4">
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="em-fn" id='em-fn'>Full name</label>
                                                <input className="form-control" type="text" id="em-fn" placeholder="Enter your full name" required />
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="em-email" id="em-email">Emaill <span className="text-muted">(better corporate)</span></label>
                                                <input className="form-control" type="email" id="em-email" placeholder="Enter email" required />
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="em-company">Company name</label>
                                                <input className="form-control" type="text" id="em-company" placeholder="Enter company name" required />
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="em-location">Main office location</label>
                                                <input className="form-control" type="text" id="em-location" placeholder="Country, City, Address" required />
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="em-password">Password <span className="text-muted">(min. 8 char)</span></label>
                                                <div className="password-toggle">
                                                    <input className="form-control" type="password" id="em-password" minLength={8} required />
                                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                                        <input className="password-toggle-check" type="checkbox" /><span className="password-toggle-indicator" />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <label className="form-label" htmlFor="em-password-confirm">Confirm password</label>
                                                <div className="password-toggle">
                                                    <input className="form-control" type="password" id="em-password-confirm" minLength={8} required />
                                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                                        <input className="password-toggle-check" type="checkbox" /><span className="password-toggle-indicator" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-check mb-4">
                                            <input className="form-check-input" type="checkbox" id="agree-to-terms" required />
                                            <label className="form-check-label" htmlFor="agree-to-terms">By joining, I agree to the <a href="#">Terms of use</a> and <a href="#">Privacy policy</a></label>
                                        </div>
                                        <button className="btn btn-primary btn-lg w-100 rounded-pill" type="submit">Sign up</button>
                                    </form>
                                </div>
                            </div>
                            <div className="pt-4 pb-3 pb-sm-0 mt-2">Already have an account? <a href="#signin-modal" data-bs-toggle="modal" data-bs-dismiss="modal" id="second_modal_open">Sign in</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;