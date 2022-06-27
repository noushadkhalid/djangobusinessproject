import React from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
const RemoveFavorites = () => {
    const { slug } = useParams();
    const { getCookie } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const removefunction = async (e) => {
        e.preventDefault();
        const csrf_token = getCookie('csrftoken');
        const url = "/api/removefavorite/";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ slug: slug })
        });
        const data = await response.json();
        if (response.status == 200) {
            navigate("/myfavourites");
        }
        else {
            navigate("/myfavourites");
        }
    }
    const handleclosebtn=()=>{
        navigate("/myfavourites");
    }
    React.useEffect(()=>{
        document.getElementById("close_favorite_remove").click();
    },[]);
    return (
        <div>
             <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:'none'}} id="close_favorite_remove">Remove</button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  onClick={ handleclosebtn} />
                        </div>
                        <div className="modal-body">
                            Remove From Favorites
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" id="close_modal_btn" onClick={ handleclosebtn}>Close</button>
                            <button type="button" className="btn btn-danger" id="close_modal_btn" data-bs-dismiss="modal" onClick={removefunction}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RemoveFavorites;