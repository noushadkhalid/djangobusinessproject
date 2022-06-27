import React from "react";
import AuthContext from "../../context/AuthContext";
const CategoryCreate = () => {
    const [success, setSuccess] = React.useState(null);
    const [error, setError] = React.useState(null);
    const { admin_ask,getCookie } = React.useContext(AuthContext);
    const createcategory = async (e) => {
        e.preventDefault();
        const url = "/api/category_create/";
        const csrf_token=getCookie('csrftoken');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ category: e.target.category.value })
        });
        const data = await response.json();
        if (response.status == 200) {
            setSuccess(data.message);
            document.getElementById("success_email_sent").classList.add("show");
            document.getElementById("success_email_sent").style.display = "block";
            setTimeout(() => {
                document.getElementById("success_email_sent").classList.remove("show");
                document.getElementById("success_email_sent").style.display = "none";
                setSuccess(null);
            }, 7000);
            setError(null);
        }
        else {
            setError(data.message);
            setSuccess(null);
        }
    }
    React.useEffect(() => {
        if (error) {
            document.getElementById("error_email_sent").classList.add("show");
            document.getElementById("error_email_sent").style.display = "block";
            setTimeout(() => {
                document.getElementById("error_email_sent").classList.remove("show");
                document.getElementById("error_email_sent").style.display = "none";
                setError(null);
            }, 7000);
        }
    }, [error]);
    return (
        <div>
            {
                admin_ask == true ? <div className="wrapper">
                    {/* Content Wrapper. Contains page content */}
                    <div className="content-wrapper">
                        <div className="alert alert-success alert-dismissible fade" role="alert" id="success_email_sent" style={{ display: 'none' }}>
                            {success && success}
                        </div>
                        <div className="alert alert-warning alert-dismissible fade" role="alert" id="error_email_sent" style={{ display: 'none' }}>
                            {error && error}
                        </div>
                        {/* Content Header (Page header) */}
                        <section className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>Create Category</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                            <li className="breadcrumb-item active">General Form</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>{/* /.container-fluid */}
                        </section>
                        <section className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">Create Category</h3>
                                            </div>
                                            <form onSubmit={createcategory}>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Enter Category</label>
                                                        <input type="text" className="form-control" id="exampleInputTitle" placeholder="Enter Category" name="category" />
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-primary">Create</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* /.row */}
                            </div>{/* /.container-fluid */}
                        </section>
                        {/* /.content */}
                    </div>
                    {/* /.content-wrapper */}
                </div> : <div className="content-wrapper"></div>
            }
        </div>
    )
}
export default CategoryCreate;