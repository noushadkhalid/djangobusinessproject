import React from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const SendEmail = ({vendor_email,vendor_name,slug}) => {
    const { getCookie } = React.useContext(AuthContext);
    const navigate=useNavigate();
    const sendemailfunction = async (e) => {
        e.preventDefault();
        const csrf_token = getCookie('csrftoken');
        const url = "/api/sendemail/";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ email: e.target.email.value, details: e.target.details.value ,vendor_email:vendor_email,vendor_name:vendor_name,phone_number:e.target.phone_number.value})
        });
        const data = await response.json();
        if (response.status == 200) {
            document.getElementById("close_modal_btn").click();
        }
        else {
            document.getElementById("close_modal_btn").click();
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
                        <form className="needs-validation" onSubmit={sendemailfunction}>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="review-text">Email<span className="text-danger">*</span></label>
                                <input className="form-control" type="email" id="js-email" placeholder="Enter your Email" name="email" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="review-text">Phone Number<span className="text-danger">*</span></label>
                                <input className="form-control" type="text" id="js-email" placeholder="Enter your Phone Number" name="phone_number" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="review-text">Contact<span className="text-danger">*</span></label>
                                <textarea className="form-control" id="review-text" rows={5} placeholder="Tell me about your problem" required defaultValue={""} name="details" />
                            </div>
                            <div className="mb-4">
                                <button type="submit" className="btn btn-primary">Send</button>
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
export default SendEmail;