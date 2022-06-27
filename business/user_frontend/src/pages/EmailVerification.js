import React from "react";
import {useParams,Link,useNavigate} from 'react-router-dom';
import AuthContext from "../context/AuthContext";
const EmailVerification=()=>{
    const {uid,token}=useParams();
    const [success,setSuccess]=React.useState(null);
    const [error,setError]=React.useState(null);
    const {getCookie}=React.useContext(AuthContext);
    const navigate=useNavigate();
    const getemailverification=async(e)=>{
        e.preventDefault();
        const csrf_token=getCookie('csrftoken');
        const url=`/api/verify-email/${uid}/${token}/`;
        const response=await fetch(url,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                'X-CSRFToken':csrf_token
            },
        });
        const data=await response.json();
        if(response.status==200){
            setSuccess(data.message);
            document.getElementById("success_email_sent").classList.add("show");
            document.getElementById("success_email_sent").style.display="block";
            setTimeout(()=>{
                document.getElementById("sign-in-modal-open").click();
                navigate("/");
            },30000);
        }
        else {
            setError(data.message);
            document.getElementById("success_email_sent").classList.remove("show");
            document.getElementById("success_email_sent").style.display="none";
            setTimeout(()=>{
                navigate("/");
            },30000);
        }
    }
    if(error){
        document.getElementById("error_email_sent").classList.add("show");
        document.getElementById("error_email_sent").style.display="block";
        setTimeout(()=>{
            document.getElementById("error_email_sent").classList.remove("show");
            document.getElementById("error_email_sent").style.display="none";
        },30000);
    }
    return (
        <div style={{ marginTop: 30 }}>
        <div className="container-fluid d-flex h-100 align-items-center justify-content-center py-4 py-sm-5">
            <div className="card card-body" style={{ maxWidth: 940 }}><Link className="position-absolute top-0 end-0 nav-link fs-sm py-1 px-2 mt-3 me-3" to="/" onclick="window.history.go(-1); return false;"><i className="fi-arrow-long-left fs-base me-2" />Go back</Link>
                <div className="row mx-0 align-items-center">
                    <div className="col-md-6 border-end-md p-2 p-sm-5">
                        <h2 className="h3 mb-4 mb-sm-5">Hey there!<br />Welcome back.</h2><img className="d-block mx-auto" src="/static/img/signin-modal/signin.svg" width={344} alt="Illustartion" />
                    </div>
                    <div className="col-md-6 px-2 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
                        <div className="alert alert-success alert-dismissible fade" role="alert" id="success_email_sent" style={{ display: 'none' }}>
                           {success && success}
                        </div>
                        <div className="alert alert-warning alert-dismissible fade" role="alert" id="error_email_sent" style={{ display: 'none' }}>
                           {error && error}
                        </div>
                        <form className="needs-validation" onSubmit={getemailverification}>
                            <button className="btn btn-primary btn-lg w-100" type="submit" >Click the button to verify email</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default EmailVerification;