import React from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const DeleteReview=()=>{
    const {slug}=useParams();
    const {getCookie}=React.useContext(AuthContext);
    const navigate=useNavigate();
    const deleteview=async ()=>{
        const url=`/api/deletereviews/`;
        const csrf_token=getCookie('csrftoken');
        const response=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrf_token
            },
            body:JSON.stringify({'slug':slug})
        });
        const data=await response.json();
        if(response.status==200){
            navigate("/account");
        }
        else {
            console.log("No delete");
            navigate("/account");
        }
    }
    React.useEffect(()=>{
        deleteview();
    },[]);
    return (
        <div>
        </div>
    )
}
export default DeleteReview;