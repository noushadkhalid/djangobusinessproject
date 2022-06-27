import React from "react";
import { useParams,useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
const AdminDelete = () => {
    const { slug} = useParams();
    const navigate=useNavigate();
    const [success, setSuccess] = React.useState(null);
    const [error, setError] = React.useState(null);
    const { getCookie } = React.useContext(AuthContext);
    const redirectUser=()=>{
        navigate(-1);
    }
    const deleteitem=async ()=>{
        const url=`/api/adminitemdelete/${slug}/`;
        const csrf_token = getCookie('csrftoken');
        const response=await fetch(url,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken': csrf_token
            },
        });
        const data=await response.json();
        if(response.status==200){
            setSuccess(data.message);
            setTimeout(()=>{
                navigate(-1);
            },5000);
        }
        else {
            setError(data.message);
            setTimeout(()=>{
                navigate(-1);
            },5000);
        }
    }
    React.useEffect(() => {
        document.getElementById('deletemodal').click();
    }, []);
    return (
        <div className="content-wrapper">
            {/* Main content */}
            <section className="content">
                <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modal-danger" id="deletemodal" style={{ display: 'none' }}>
                    Delete
                </button>

                <div className="modal" id="modal-danger">
                    <div className="modal-dialog">
                        <div className="modal-content bg-danger">
                            <div className="modal-header">
                                <h4 className="modal-title">Delete Business</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={redirectUser}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete</p>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-outline-light" data-dismiss="modal" onClick={redirectUser}>Close</button>
                                <button type="button" className="btn btn-outline-light" onClick={deleteitem}>Delete</button>
                            </div>
                        </div>
                        {/* /.modal-content */}
                    </div>
                    {/* /.modal-dialog */}
                </div>
                {/* /.modal */}
            </section>
        </div>
    )
}
export default AdminDelete;