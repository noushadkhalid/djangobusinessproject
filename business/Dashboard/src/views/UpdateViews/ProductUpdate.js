import React from "react";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router-dom";
const ProductUpdate = () => {
    const [success, setSuccess] = React.useState(null);
    const [error, setError] = React.useState(null);
    const { getCookie,vendor_ask } = React.useContext(AuthContext);
    const { slug } = useParams();
    const updatebusines = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        if (e.target.image_field) {
            formdata.append('image_field', e.target.image_field.files[0]);
        }
        if (e.target.title) {
            formdata.append("title", e.target.title.value);
        }
        if (e.target.description) {
            formdata.append("description", e.target.description.value);
        }
        if (e.target.price) {
            formdata.append("price", e.target.price.value);
        }
        const csrf_token = getCookie('csrftoken');
        const url = `/api/updateproduct/${slug}/`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: formdata
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
            setError(data.non_field_errors[0]);
            setSuccess(null);
        }
    }
    React.useEffect(()=>{
        if (error) {
            document.getElementById("error_email_sent").classList.add("show");
            document.getElementById("error_email_sent").style.display = "block";
            setTimeout(() => {
                document.getElementById("error_email_sent").classList.remove("show");
                document.getElementById("error_email_sent").style.display = "none";
                setError(null);
            }, 7000);
        }
    },[error]);
    return (
        <div>
            {
                vendor_ask==true ?    <div className="wrapper">
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
                                    <h1>Update Product</h1>
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
                                            <h3 className="card-title">Update Product</h3>
                                        </div>
                                        <form onSubmit={updatebusines}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Enter title</label>
                                                    <input type="text" className="form-control" id="exampleInputTitle" placeholder="Enter Title" name="title" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Enter Description</label>
                                                    <input type="text" className="form-control" id="exampleInputDescription" placeholder="Enter Description" name="description" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Enter Price</label>
                                                    <input type="number" className="form-control" id="exampleInputDescription" placeholder="Enter Price" name="price" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">File input</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input type="file" className="custom-file-input" id="exampleInputFile" name="image_field" accept="image/*,.jpg,.jpeg" />
                                                            <label className="custom-file-label" htmlFor="exampleInputFile">Choose
                                                                file</label>
                                                        </div>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Upload</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary">Submit</button>
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
            </div>:<div className="content-wrapper"></div>
            }
        </div>
    )
}
export default ProductUpdate;