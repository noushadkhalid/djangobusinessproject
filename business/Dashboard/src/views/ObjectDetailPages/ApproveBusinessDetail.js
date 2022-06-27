import React from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const ApproveBusinessDetail = () => {
    const { slug } = useParams();
    const { admin_ask, getCookie } = React.useContext(AuthContext);
    const [businessdata, setData] = React.useState(null);
    const [success, setSuccess] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [checked, setChecked] = React.useState(true);
    const [approve_review, setApproveReview] = React.useState(true);
    const getbusinessdetails = async () => {
        const url = `/api/getsinglebusiness/?slug=${slug}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.status == 200) {
            setData(data);
        }
        else {
            setData(null);
        }
    }
    const approvebusiness = async (e) => {
        e.preventDefault();
        const csrf_token = getCookie('csrftoken');
        const approveurl = '/api/approveitemsapi/';
        const response = await fetch(approveurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ slug: slug, approved: e.target.approve.value, approve_reviews:businessdata.type !='products' ? e.target.approve_reviews.value:'true'})
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
            setSuccess(null);
            setError(data.message);
        }
    }
    const handleValue = () => {
        if (checked) {
            setChecked(false);
        }
        else {
            setChecked(true);
        }
    }
    const hanldeapprovereview = () => {
        if (approve_review) {
            setApproveReview(false);
        }
        else {
            setApproveReview(true);
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
        getbusinessdetails();
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
                                        <h1>Approve Item</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><Link to="/approveitems">Home</Link></li>
                                            <li className="breadcrumb-item"><Link to="/approveevents">Events</Link></li>
                                            <li className="breadcrumb-item"><Link to="/approveclassifieds">Classifieds</Link></li>
                                            <li className="breadcrumb-item"><Link to="/approvedeals">Deals</Link></li>
                                            <li className="breadcrumb-item"><Link to="/approveproducts">Products</Link></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>{/* /.container-fluid */}
                        </section>
                        {
                            businessdata ? <section className="content">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card card-primary">
                                                <div className="card-header">
                                                    <h3 className="card-title">Approve Item</h3>
                                                </div>
                                                <form onSubmit={approvebusiness}>
                                                    <div className="card-body">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Title</label>
                                                            <input type="text" className="form-control" id="exampleInputTitle" placeholder="Enter Title" name="title" value={businessdata.title} disabled />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Enter Description</label>
                                                            <input type="text" className="form-control" id="exampleInputDescription" placeholder="Enter Description" name="description" value={businessdata.description} disabled />
                                                        </div>
                                                        {
                                                            businessdata.type == 'business' && <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Enter Website Url</label>
                                                                <input type="text" className="form-control" id="exampleInputwebsiteUrl" placeholder="Enter Website Url" name="website_url" disabled value={businessdata.website_url} />
                                                            </div>
                                                        }
                                                        {
                                                            businessdata.type == 'business' && <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Location</label>
                                                                <input type="text" className="form-control" id="exampleInputwebsiteUrl" placeholder="Enter Website Url" name="website_url" disabled value={businessdata.location} />
                                                            </div>
                                                        }
                                                        {
                                                            businessdata.type == 'business' && <div className="bootstrap-timepicker">
                                                                <div className="form-group">
                                                                    <label>Open At</label>
                                                                    <div className="input-group date" id="timepicker" data-target-input="nearest">
                                                                        <input type="text" className="form-control datetimepicker-input" data-target="#timepicker" name="open_at" disabled value={businessdata.timingfrom} />
                                                                        <div className="input-group-append" data-target="#timepicker" data-toggle="datetimepicker">
                                                                            <div className="input-group-text"><i className="far fa-clock" /></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            businessdata.type == 'business' && <div className="bootstrap-timepicker">
                                                                <div className="form-group">
                                                                    <label>Closes At</label>
                                                                    <div className="input-group date" id="timepicker2" data-target-input="nearest">
                                                                        <input type="text" className="form-control datetimepicker-input" data-target="#timepicker2" name="close_at" disabled value={businessdata.timingto} />
                                                                        <div className="input-group-append" data-target="#timepicker2" data-toggle="datetimepicker">
                                                                            <div className="input-group-text"><i className="far fa-clock" /></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            businessdata.type == 'deals' && <div className="bootstrap-timepicker">
                                                                <div className="form-group">
                                                                    <label>Closes At</label>
                                                                    <div className="input-group date" id="timepicker2" data-target-input="nearest">
                                                                        <input type="text" className="form-control datetimepicker-input" data-target="#timepicker2" name="close_at" disabled value={businessdata.datefrom} />
                                                                        <div className="input-group-append" data-target="#timepicker2" data-toggle="datetimepicker">
                                                                            <div className="input-group-text"><i className="far fa-clock" /></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            businessdata.type == 'deals' && <div className="bootstrap-timepicker">
                                                                <div className="form-group">
                                                                    <label>Closes At</label>
                                                                    <div className="input-group date" id="timepicker2" data-target-input="nearest">
                                                                        <input type="text" className="form-control datetimepicker-input" data-target="#timepicker2" name="close_at" disabled value={businessdata.dateto} />
                                                                        <div className="input-group-append" data-target="#timepicker2" data-toggle="datetimepicker">
                                                                            <div className="input-group-text"><i className="far fa-clock" /></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" value={checked ? true : false} onChange={handleValue} checked={checked} name="approve" />
                                                            <label className="form-check-label" htmlFor="exampleCheck1">Approve</label>
                                                        </div>
                                                        {
                                                            businessdata.type != 'products' && <div className="form-check">
                                                                <input type="checkbox" className="form-check-input" id="exampleCheck2" value={approve_review ? true : false} onChange={hanldeapprovereview} checked={approve_review} name="approve_reviews" />
                                                                <label className="form-check-label" htmlFor="exampleCheck2">Approve Reviews</label>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="card-footer">
                                                        <button type="submit" className="btn btn-primary">Confirm Approve</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.row */}
                                </div>{/* /.container-fluid */}
                            </section> : <div></div>
                        }
                        {/* /.content */}
                    </div>
                    {/* /.content-wrapper */}
                </div> : <div className="content-wrapper"></div>
            }
        </div>
    )
}
export default ApproveBusinessDetail;