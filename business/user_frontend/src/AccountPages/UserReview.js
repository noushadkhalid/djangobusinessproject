import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const UserReview = () => {
    const { user, user_data } = React.useContext(AuthContext);
    const [reviews, setReviews] = React.useState([]);
    const get_particular_user_reviews = async () => {
        const url = "/api/particularuser_reviews";
        const response = await fetch(url);
        const data = await response.json();
        if (response.status == 200) {
            setReviews(data["results"]);
        }
        else {
            console.log("particular user reviews are not recieved");
        }
    }
    React.useEffect(() => {
        get_particular_user_reviews();
    }, []);
    return (
        <div className="container mt-5 mb-md-4 py-5">
            {/* Breadcrumbs*/}
            <nav className="mb-4 pt-2 pt-lg-3" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/account">Account</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Reviews</li>
                </ol>
            </nav>
            {/* Account header*/}
            <div className="d-flex align-items-center justify-content-between pb-4 mb-2">
                <div className="d-flex align-items-center">
                    <div className="position-relative flex-shrink-0"><img className="rounded-circle border border-white" src={user_data.image_field} width={100} alt={user} />
                    </div>
                    <div className="ps-3 ps-sm-4">
                        <h3 className="h4 mb-2">{user}</h3><span className="star-rating"></span>
                    </div>
                </div>
            </div>
            {/* Page content*/}
            <div className="card card-body p-4 p-md-5 shadow-sm">
                {/* Account nav*/}
                <div className="mt-md-n3 mb-4"><a className="btn btn-outline-primary btn-lg rounded-pill w-100 d-md-none" href="#account-nav" data-bs-toggle="collapse"><i className="fi-align-justify me-2" />Account Menu</a>
                    <div className="collapse d-md-block" id="account-nav">
                        <ul className="nav nav-pills flex-column flex-md-row pt-3 pt-md-0 pb-md-4 border-bottom-md">
                            <li className="nav-item mb-md-0 me-md-2 pe-md-1"><Link className="nav-link" to="/account"><i className="fi-user mt-n1 me-2 fs-base" />Personal Info</Link></li>
                            <li className="nav-item mb-md-0 me-md-2 pe-md-1"><Link className="nav-link" to="/user_reviews" aria-current="page"><i className="fi-star mt-n1 me-2 fs-base" />Reviews</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="d-flex flex-md-row flex-column align-items-md-center justify-content-md-between mb-4 py-2">
                    <h1 className="h3 mb-md-0">Your reviews</h1>
                    {/* Sort*/}
                    <div className="d-flex align-items-sm-center align-items-end">
                    </div>
                </div>
                {
                    reviews.map((review) => {
                        return (
                            <div className="row mb-4 pb-4 border-bottom">
                                <div className="col-md-3 mb-md-0 mb-3">
                                    <h2 className="mb-2 fs-base"><span className="fw-normal me-1">For:</span><a className="nav-link d-inline-block p-0" href="city-guide-single.html">{review.title}</a></h2>
                                    <div className="mb-md-3 mb-2"><span className="star-rating">
                                        {
                                            review.rate == 1 && <i className="star-rating-icon fi-star-filled active">
                                            </i>
                                        }
                                        {
                                            review.rate == 2 && <div>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                            </div>
                                        }
                                        {
                                            review.rate == 3 && <div>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                            </div>
                                        }
                                        {
                                            review.rate == 4 && <div>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                            </div>
                                        }
                                        {
                                            review.rate == 5 && <div>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                                <i className="star-rating-icon fi-star-filled active">
                                                </i>
                                            </div>
                                        }
                                    </span>
                                    </div><span className="fs-sm text-muted">Dec 17, 2020</span>
                                </div>
                                <div className="col-md-9">
                                    <p className="mb-3">{review.comment}</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">

                                        </div>
                                        <button className="btn btn-link py-1 px-2 opacity-90" data-bs-toggle="tooltip" title="Delete"><Link to={`/reviewdelete/${review.slug}`}><i className="fi-trash" /></Link></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}
export default UserReview;