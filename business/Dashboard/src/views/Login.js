import React from "react";
import AuthContext from "../context/AuthContext";
const Login = () => {
    const {loginUser}=React.useContext(AuthContext);
    return (
        <div>
            <h1 style={{textAlign:"center"}}>Login as Vendor</h1>
            <div className="container" style={{ marginTop: '12px' }}>
                <form onSubmit={loginUser} >
                    <div className="form-group">
                        <label htmlFor="exampleInputUsername">Username</label>
                        <input type="username" className="form-control" id="exampleInputUsername" name="username" aria-describedby="emailHelp" placeholder="Enter Username" />
                    </div>
                    <div className="form-group" style={{ marginTop: '12px' }}>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Login;