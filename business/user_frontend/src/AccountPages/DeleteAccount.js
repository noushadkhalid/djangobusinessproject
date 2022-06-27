import React from "react";
import AuthContext from "../context/AuthContext";
const DeleteAccount = () => {
    const { getCookie,logoutUser} = React.useContext(AuthContext);
    const [error, setError] = React.useState(null);
    const deleteaccount = async (e) => {
        e.preventDefault();
        const csrf_token = getCookie('csrftoken');
        const url = "/api/deleteuser/";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value })
        });
        const data = await response.json();
        if (response.status == 200) {
            document.getElementById("close_modal_btn").click();
            setError(null);
            logoutUser();
        }
        else {
            setError(data.message);
            let div_element = document.getElementById("error_bootstrap_login");
            div_element.style.display = "block";
            setTimeout(() => {
                document.getElementById("error_bootstrap_login").style.display = "none";
            }, 30000);
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
                        <form className="needs-validation" onSubmit={deleteaccount}>
                            <div className="mb-4">
                                <label className="form-label mb-2" htmlFor="signin-email">Enter Username or Email</label>
                                <input className="form-control" type="text" id="signin-email" placeholder="Enter Username or email" required name="username" />
                            </div>
                            <div className="mb-4">
                                <div className="password-toggle">
                                    <input className="form-control" type="password" id="signin-password" placeholder="Enter password" required name="password" />
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
                            </div>
                            <div className="mb-4">
                                <button type="submit" className="btn btn-danger">Delete</button>
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
export default DeleteAccount;