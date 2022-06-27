import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const Login = () => {
    const { loginUser ,loginError} = React.useContext(AuthContext);
    if(loginError){
        let div_element=document.getElementById("error_bootstrap_login");
        div_element.classList.add("show");
        div_element.style.display="block";
        setTimeout(()=>{
                document.getElementById("error_bootstrap_login").classList.remove("show");
                document.getElementById("error_bootstrap_login").style.display="none";
        },30000);
    }
    return (
        <div>
            <div className="modal fade" id="signin-modal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto" style={{ maxWidth: 950 }}>
                    <div className="modal-content">
                        <div className="modal-body px-0 py-2 py-sm-0">
                            <button className="btn-close position-absolute top-0 end-0 mt-3 me-3" id="close-btn" type="button" data-bs-dismiss="modal" />
                            <div className="row mx-0 align-items-center">
                                <div className="col-md-6 border-end-md p-4 p-sm-5">
                                    <h2 className="h3 mb-4 mb-sm-5">Hey there!<br />Welcome back.</h2><img className="d-block mx-auto" src="/static/img/signin-modal/signin.svg" width={344} alt="Illustartion" />
                                    <div className="mt-4 mt-sm-5">Don't have an account? <a href="#signup-modal" data-bs-toggle="modal" data-bs-dismiss="modal" >Sign up here</a></div>
                                </div>
                                <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5"><div className="alert alert-warning alert-dismissible fade" role="alert" id="error_bootstrap_login" style={{ display: 'none' }}>
                                    {loginError && loginError}
                                </div>
                                <div className="alert alert-success alert-dismissible fade" role="alert" id="success_bootstrap_login" style={{ display: 'none' }}>
                                    Logged in Successfully
                                </div>
                                    <div className="d-flex align-items-center py-3 mb-3">
                                        <hr className="w-100" />
                                        <div className="px-3">Or</div>
                                        <hr className="w-100" />
                                    </div>
                                    <form className="needs-validation" onSubmit={loginUser}>
                                        <div className="mb-4">
                                            <label className="form-label mb-2" htmlFor="signin-email">Enter Username or Email</label>
                                            <input className="form-control" type="text" id="signin-email" placeholder="Enter Username or email" required name="username" />
                                        </div>
                                        <div className="mb-4">
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <label className="form-label mb-0" htmlFor="signin-password">Password</label><Link className="fs-sm" to="/emailpage">Forgot password?</Link>
                                            </div>
                                            <div className="password-toggle">
                                                <input className="form-control" type="password" id="signin-password" placeholder="Enter password" required name="password" />
                                                <label className="password-toggle-btn" aria-label="Show/hide password">
                                                    <input className="password-toggle-check" type="checkbox" /><span className="password-toggle-indicator" />
                                                </label>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-lg w-100 rounded-pill" type="submit" id="sign-in-modal-open" >Sign in</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Login;