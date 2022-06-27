// import React from "react";
// import AuthContext from "../context/AuthContext";
// import { Navigate,useNavigate } from "react-router-dom";
// const VendorProtected=({children})=>{
//     console.log(children);
//     const navigate=useNavigate();
//     let vendor_ask=localStorage.getItem("vendor_ask");
//     console.log(vendor_ask);
//         if(vendor_ask==true){
//             return children
//         }
//         else {
//             navigate("/dashboard");
//         }
// }

// export default VendorProtected;