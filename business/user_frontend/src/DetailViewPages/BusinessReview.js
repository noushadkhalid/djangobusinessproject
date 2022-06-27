import React from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import SendEmail from "../components/EmailViews/SendEmail";
import MapView from "./MapView";
const BusinessReview = () => {
    const { slug } = useParams();
    const { user, getCookie } = React.useContext(AuthContext);
    const [item_data, setData] = React.useState([]);
    const [reviewdata, setReviewsData] = React.useState([]);
    const [longitude, setLongitude] = React.useState(null);
    const [latitude, setLatitude] = React.useState(null);
    const [count, setCount] = React.useState(null);
    const [link, setLink] = React.useState('/api/businesslist');
    const navigate = useNavigate();
    const getSingleItemDetails = async () => {
        const url = `/api/getsinglebusiness/?slug=${slug}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.status == 200) {
            setData(data);
        }
        else {
            console.log("item not recieved");
            navigate("/");
        }
    }
    const get_review_details = async () => {
        const url = `/api/reviewdetails/?slug=${slug}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.status == 200) {
            setReviewsData(data.results);
            setCount(data.count);
        }
        else {
            console.log("some error occured");
        }
    }
    let average_reviews = 0
    let one_review_percent = 0;
    let two_review_percent = 0;
    let three_review_percent = 0;
    let four_review_percent = 0;
    let five_review_percent = 0;
    reviewdata.map((review) => {
        average_reviews += review.rate;
        if (review.rate == 1) {
            one_review_percent += 1;
        }
        if (review.rate == 2) {
            two_review_percent += 1;
        }
        if (review.rate == 3) {
            three_review_percent += 1;
        }
        if (review.rate == 4) {
            four_review_percent += 1;
        }
        if (review.rate == 5) {
            five_review_percent += 1;
        }
    });
    if (count > 0) {
        one_review_percent = (one_review_percent / count) * 100;
        two_review_percent = (two_review_percent / count) * 100;
        three_review_percent = (three_review_percent / count) * 100;
        four_review_percent = (four_review_percent / count) * 100;
        five_review_percent = (five_review_percent / count) * 100;
        average_reviews = Math.ceil(average_reviews / count);
    }
    const pagecount = Math.ceil(count / 8);
    const handleClickchange = (e) => {
        let pagenomber = e.selected + 1;
        if (pagenomber == 1) {
            setLink(`/api/reviewdetails/?slug=${slug}`);
        }
        else {
            setLink(`/api/reviewdetails/?slug=${slug}&page=${pagenomber}`);
        }
    }
    const add_to_favourites = async (e) => {
        e.preventDefault();
        const csrf_token = getCookie('csrftoken');
        const url = "/api/add_to_favourite/";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ slug: slug, title: item_data.title, description: item_data.description, image_url: item_data.image_field })
        });
        const data = await response.json();
        if (response.status == 200) {
            console.log(data);
        }
        else {
            console.log("not added");
        }
    }
    const getcoordinates = async () => {
        const url = `/api/get_coordinates/`;
        const csrf_token = getCookie('csrftoken');
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ location: item_data.location })
        });
        let data = await response.json();
        if (response.status == 200) {
            console.log(data);
            setLongitude(data.results[0].geometry.location.lng);
            setLatitude(data.results[0].geometry.location.lat);
        }
        else {
            setLatitude(null);
            setLongitude(null);
        }
    }
    const postreviewfunction = async (e) => {
        e.preventDefault();
        const csrf_token = getCookie('csrftoken');
        const review_url = "/api/user_review/";
        const response = await fetch(review_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({
                "user": user,
                "slug": item_data.slug,
                "comment": e.target.comment.value,
                "rate": e.target.rate.value,
            })
        });
        const data = await response.json();
        if (response.status == 200) {
            let review_modal = document.getElementById("close_review_modal");
            review_modal.click();
            get_review_details();
        }
        else {
            console.log("not recieved review data");
        }
    }
    React.useEffect(() => {
        getSingleItemDetails();
        get_review_details();
    }, [link]);
    return (
        <div>
            {
                user && <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <SendEmail vendor_email={item_data.email} vendor_name={item_data.user}  slug={slug} />
                </div>
            }
            <div className="modal fade" id="modal-review" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-block position-relative border-0 pb-0 px-sm-5 px-4">
                            <h3 className="modal-title mt-4 text-center">Leave a review</h3>
                            <button className="btn-close position-absolute top-0 end-0 mt-3 me-3" type="button" data-bs-dismiss="modal" aria-label="Close" id="close_review_modal" />
                        </div>
                        <div className="modal-body px-sm-5 px-4">
                            {
                                user && item_data.approve_reviews == true &&
                                <form className="needs-validation" onSubmit={postreviewfunction}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="review-rating">Rating <span className="text-danger">*</span></label>
                                        <select className="form-control form-select" id="review-rating" required name="rate">
                                            <option value selected disabled hidden>Choose rating</option>
                                            <option value="5">5 stars</option>
                                            <option value="4">4 stars</option>
                                            <option value="3">3 stars</option>
                                            <option value="2">2 stars</option>
                                            <option value="1">1 star</option>
                                        </select>
                                        <div className="invalid-feedback">Please rate the property.</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="review-text">Review<span className="text-danger">*</span></label>
                                        <textarea className="form-control" id="review-text" rows={5} placeholder="Your review message" required defaultValue={""} name="comment" />
                                        <div className="invalid-feedback">Please write your review.</div>
                                    </div>
                                    <button className="btn btn-primary d-block rounded-pill w-100 mb-4" type="submit">Submit a review</button>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Page header*/}
            <section className="container pt-5 mt-5">
                {/* Breadcrumb*/}
                <nav className="mb-3 pt-md-3" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/${item_data.type}`}>{item_data.type}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{item_data.title}</li>
                    </ol>
                </nav>
                <div className="d-sm-flex align-items-center justify-content-between mb-4 pb-sm-2">
                    <h1 className="h2 me-3 mb-sm-0">{item_data.title}</h1>
                    <div className="text-nowrap">
                        <button className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle" type="button" data-bs-toggle="tooltip" title="Add to Favourites" onClick={add_to_favourites}><i className="fi-heart" /></button>
                        <div className="dropdown d-inline-block" data-bs-toggle="tooltip" title="Share">
                            <button className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle ms-2" type="button" data-bs-toggle="dropdown"><i className="fi-share" /></button>
                            <div className="dropdown-menu dropdown-menu-end my-1">
                                <button className="dropdown-item" type="button"><i className="fi-facebook fs-base opacity-75 me-2" />Facebook</button>
                                <button className="dropdown-item" type="button"><i className="fi-twitter fs-base opacity-75 me-2" />Twitter</button>
                                <button className="dropdown-item" type="button"><i className="fi-instagram fs-base opacity-75 me-2" />Instagram</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Nav pills*/}
                <ul className="nav nav-pills border-bottom pb-3 mb-4">
                    <li className="nav-item"><Link className="nav-link d-flex align-items-center" to={`/businessdetail/${slug}`}><i className="fi-image me-2" />Gallery</Link></li>
                    <li className="nav-item"><Link className="nav-link d-flex align-items-center" to={`/businessinfo/${slug}`}><i className="fi-info-circle me-2" />Info</Link></li>
                    <li className="nav-item"><Link className="nav-link d-flex align-items-center" to={`/businessreview/${slug}`}><i className="fi-edit me-2" />Reviews</Link></li>
                </ul>
            </section>
            {/* Page content*/}
            <section className="container pb-5 mb-md-4">
                <div className="row">
                    {/* Left column*/}
                    <div className="col-md-7 mb-md-0 mb-4 pb-md-0 pb-2">
                        <h2 className="h4 mb-4">Average rating</h2>
                        <div className="row mb-md-5 mb-4">
                            {/* Rating breakdown*/}
                            <div className="col-sm-8 order-sm-1 order-2">
                                <div className="d-flex align-items-center mb-2 fs-sm">
                                    <div className="text-nowrap">5<i className="fi-star mt-n1 ms-1 align-middle opacity-70" /></div>
                                    <div className="progress w-100 mx-3">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${five_review_percent}%` }} aria-valuenow={five_review_percent} aria-valuemin={0} aria-valuemax={100} />
                                    </div><span style={{ minWidth: 48 }}>{five_review_percent}%</span>
                                </div>
                                <div className="d-flex align-items-center mb-2 fs-sm">
                                    <div className="text-nowrap">4<i className="fi-star mt-n1 ms-1 align-middle opacity-70" /></div>
                                    <div className="progress w-100 mx-3">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${four_review_percent}%` }} aria-valuenow={four_review_percent} aria-valuemin={0} aria-valuemax={100} />
                                    </div><span style={{ minWidth: 48 }}>{four_review_percent}%</span>
                                </div>
                                <div className="d-flex align-items-center mb-2 fs-sm">
                                    <div className="text-nowrap">3<i className="fi-star mt-n1 ms-1 align-middle opacity-70" /></div>
                                    <div className="progress w-100 mx-3">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${three_review_percent}%` }} aria-valuenow={three_review_percent} aria-valuemin={0} aria-valuemax={100} />
                                    </div><span style={{ minWidth: 48 }}>{three_review_percent}%</span>
                                </div>
                                <div className="d-flex align-items-center mb-2 fs-sm">
                                    <div className="text-nowrap">2<i className="fi-star mt-n1 ms-1 align-middle opacity-70" /></div>
                                    <div className="progress w-100 mx-3">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${two_review_percent}%` }} aria-valuenow={two_review_percent} aria-valuemin={0} aria-valuemax={100} />
                                    </div><span style={{ minWidth: 48 }}>{two_review_percent}%</span>
                                </div>
                                <div className="d-flex align-items-center mb-2 fs-sm">
                                    <div className="text-nowrap">1<i className="fi-star mt-n1 ms-1 align-middle opacity-70" /></div>
                                    <div className="progress w-100 mx-3">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${one_review_percent}%` }} aria-valuenow={one_review_percent} aria-valuemin={0} aria-valuemax={100} />
                                    </div><span style={{ minWidth: 48 }}>{one_review_percent}%</span>
                                </div>
                            </div>
                            {/* Score*/}
                            <div className="col-sm-4 order-sm-2 order-1 mb-sm-0 mb-3 text-center">
                                <h5 className="display-4 mb-2">{average_reviews}</h5>
                                <div><span className="star-rating">
                                    {
                                        average_reviews == 1 && <i className="star-rating-icon fi-star-filled active" />
                                    }
                                    {
                                        average_reviews == 2 && <div>
                                            <i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" />
                                        </div>
                                    }
                                    {
                                        average_reviews == 3 && <div>
                                            <i className="star-rating-icon fi-star-filled active" />
                                            <i className="star-rating-icon fi-star-filled active" />
                                            <i className="star-rating-icon fi-star-filled active" />
                                        </div>
                                    }
                                    {
                                        average_reviews == 4 && <div>
                                            <i className="star-rating-icon fi-star-filled active" />
                                            <i className="star-rating-icon fi-star-filled active" />
                                            <i className="star-rating-icon fi-star-filled active" />
                                            <i className="star-rating-icon fi-star-filled active" />
                                        </div>
                                    }
                                    {
                                        average_reviews == 5 && <div>
                                            <i className="star-rating-icon fi-star-filled active" />
                                            <i className="star-rating-icon fi-star-filled active" />
                                            <i className="star-rating-icon fi-star-filled active" />
                                            <i className="star-rating-icon fi-star-filled active" />
                                            <i className="star-rating-icon fi-star-filled active" />
                                        </div>
                                    }
                                </span>
                                </div><span className="fs-sm">{count} reviews</span>
                            </div>
                        </div>
                        {/* Add review btn + Reviews sort*/}
                        <div className="d-flex flex-sm-row flex-column align-items-sm-center justify-content-between mb-4 pb-4 border-bottom">
                            {
                                user && item_data.approve_reviews == true && <a className="btn btn-outline-primary rounded-pill mb-sm-0 mb-3" href="#modal-review" data-bs-toggle="modal"><i className="fi-edit mt-n1 me-1 align-middle" />Add review</a>
                            }
                            <div className="d-flex align-items-center ms-sm-4">
                                <label className="d-inline-block me-2 pe-1 text-muted text-nowrap" htmlFor="reviews-sort"><i className="fi-arrows-sort mt-n1 me-1 align-middle opacity-80" />Sort by:</label>
                                <select className="form-select" id="reviews-sort" style={{ minWidth: 180 }}>
                                    <option>Newest</option>
                                    <option>Oldest</option>
                                    <option>Popular</option>
                                    <option>High rating</option>
                                    <option>Low rating</option>
                                </select>
                            </div>
                        </div>
                        {
                            reviewdata.map((review) => {
                                return (
                                    <div className="mb-4 pb-4 border-bottom">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="d-flex align-items-center pe-2"><img className="rounded-circle me-1" src={review.image_field} width={48} alt="Avatar" />
                                                <div className="ps-2">
                                                    <h6 className="fs-base mb-0">{review.user}</h6><span className="star-rating">
                                                        {
                                                            review.rate == 0 &&
                                                            <div>
                                                                <p>No reviews</p>
                                                            </div>
                                                        }
                                                        {
                                                            review.rate == 1 &&
                                                            <i className="star-rating-icon fi-star-filled active" />
                                                        }
                                                        {
                                                            review.rate == 2 &&
                                                            <div>
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                            </div>
                                                        }
                                                        {
                                                            review.rate == 3 &&
                                                            <div>
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                            </div>
                                                        }
                                                        {
                                                            review.rate == 4 &&
                                                            <div>
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                            </div>
                                                        }
                                                        {
                                                            review.rate == 5 &&
                                                            <div>
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                                <i className="star-rating-icon fi-star-filled active" />
                                                            </div>
                                                        }
                                                    </span>
                                                </div>
                                            </div><span className="text-muted fs-sm">Jan 17, 2021</span>
                                        </div>
                                        <p>{review.comment}</p>
                                    </div>
                                )
                            })
                        }
                        {/* Review pagination + Add review btn*/}
                        <div className="d-flex align-items-center justify-content-between">
                            <nav aria-label="Reviews pagination">
                                <ReactPaginate
                                    className="pagination mb-1"
                                    breakLabel="..."
                                    nextLabel="Next"
                                    pageRangeDisplayed={5}
                                    pageCount={pagecount}
                                    onPageChange={handleClickchange}
                                    previousLabel="Previous"
                                    renderOnZeroPageCount={null}
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    activeClassName="page-item active"
                                    activeLinkClassName="page-link"
                                />
                            </nav>
                            {
                                user && item_data.approve_reviews == true && <a className="btn btn-outline-primary rounded-pill ms-4" href="#modal-review" data-bs-toggle="modal"><i className="fi-edit mt-n1 me-1 align-middle" />Add review</a>
                            }
                        </div>
                    </div>
                    {/* Sidebar*/}
                    <aside className="col-md-5">
                        {/* Place card*/}
                        <div className="card mb-4 p-2 shadow-sm">
                            <div className="card-body">
                                {/* Place info*/}
                                <div className="d-flex align-items-start mb-3 pb-2 border-bottom"><img src={item_data.image_field} width={60} alt="Thumbnail" />
                                    <div className="ps-2 ms-1">
                                        <h3 className="h5 mb-2">{item_data.title}</h3>
                                        <ul className="list-unstyled d-flex flex-wrap fs-sm">
                                            <li className="me-2 mb-1 pe-1"><i className="fi-star-filled mt-n1 me-1 text-warning align-middle opacity-70" /><b>{average_reviews} </b>({count})</li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Place contacts*/}
                                <div className="mb-3 pb-3 border-bottom">
                                    {
                                        item_data.location && <div>
                                            <h4 className="h5 mb-2">Main Location</h4>
                                            <ul className="nav row row-cols-sm-2 row-cols-1 gy-1">
                                                <li className="col"><i className="fi-map-pin mt-1 me-2 align-middle opacity-70" />{item_data.location}</li>
                                                <li className="col"><i className="fi-phone mt-1 me-2 align-middle opacity-70" />(302) 555-0107(302) 555-0208</li>
                                                <li className="col"><a className="nav-link p-0 fw-normal d-flex align-items-start" href="#"><i className="fi-globe mt-1 me-2 align-middle opacity-60" />{item_data.website_url}</a></li>
                                                <li className="col"><a className="nav-link p-0 fw-normal d-flex align-items-start" href="mailto:bb-hotel@example.com"><i className="fi-mail mt-1 me-2 align-middle opacity-70" />bb-hotel@example.com</a></li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                                {/* Place pricing*/}
                                <div className="mb-3 pb-4 border-bottom">
                                    <div className="row row-cols-1">
                                        <div className="col">  {
                                            user && <div className="col"><button type="button" className="btn btn-primary btn-lg rounded-pill w-sm-auto w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">Contact Now</button></div>
                                        }</div>
                                    </div>
                                </div>
                                {/* Place following*/}
                                <div className="d-flex align-items-center">
                                    <h4 className="h5 mb-0 me-3">Follow:</h4>
                                    <div className="text-nowrap"><a className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2" href="#"><i className="fi-facebook" /></a><a className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2" href="#"><i className="fi-instagram" /></a><a className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle" href="#"><i className="fi-twitter" /></a></div>
                                </div>
                            </div>
                        </div>
                        {/* Location (Map)*/}
                        {
                            item_data.type == 'business' && <div className="col-md-12">
                                <div className="position-relative bg-size-cover bg-position-center bg-repeat-0 h-100 rounded-3" style={{ minHeight: 250 }}>
                                    {
                                        item_data.location &&
                                        <div>
                                        <button className="btn btn-primary" onClick={getcoordinates}>Click to Map</button>
                                    </div>
                                    }
                                    {
                                        latitude && <MapView latitude={latitude} longitude={longitude} />
                                    }
                                </div>
                            </div>
                        }
                    </aside>
                </div>
            </section>
        </div>

    )
}

export default BusinessReview;