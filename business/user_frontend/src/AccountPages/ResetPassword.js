import React from "react";
import AuthContext from "../context/AuthContext";
const ResetPassword = () => {
    const {getCookie}=React.useContext(AuthContext);
    const [sucess,setSuccess]=React.useState(null);
    const [error,setError]=React.useState(null);
    const resetfunction=async (e)=>{
        e.preventDefault();
        const csrf_token=getCookie('csrftoken');
        const url="/api/changepassword/";
        const response=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrf_token
            },
            body:JSON.stringify({password:e.target.password.value,password2:e.target.password2.value})
        });
        const data=await response.json();
        if(response.status==200){
            setSuccess(data.message);
            let div_element = document.getElementById("success_bootstrap_login");
            div_element.style.display = "block";
            setTimeout(() => {
                document.getElementById("success_bootstrap_login").style.display = "none";
                setSuccess(null);
                document.getElementById("close_modal_btn").click();
            }, 30000);
            setError(null);
        }
        else {
            setError(data.non_field_errors[0]);
            let div_element = document.getElementById("error_bootstrap_login");
            div_element.style.display = "block";
            setTimeout(() => {
                document.getElementById("error_bootstrap_login").style.display = "none";
                setError(null);
                document.getElementById("close_modal_btn").click();
            }, 30000);
            setSuccess(null);
        }
    }
    return (
        <div>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" onSubmit={resetfunction}>
                            <div className="mb-4">
                                <div className="password-toggle">
                                    <input className="form-control" type="password" id="signin-password" placeholder="New password" required name="password" />
                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                        <input className="password-toggle-check" type="checkbox" /><span className="password-toggle-indicator" />
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="password-toggle">
                                    <input className="form-control" type="password" id="signin-password" placeholder="Confirm password" required name="password2" />
                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                        <input className="password-toggle-check" type="checkbox" /><span className="password-toggle-indicator" />
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <h6>{error && "Alert"}</h6>
                                    <p id="error_bootstrap_login">{error && error}</p>
                                </div>
                                <div>
                                    <h6>{sucess && "Success"}</h6>
                                    <p id="success_bootstrap_login">{sucess && sucess}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <button type="submit" className="btn btn-danger">Reset</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" id="close_modal_btn">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword;