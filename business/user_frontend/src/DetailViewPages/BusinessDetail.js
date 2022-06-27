import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import SendEmail from "../components/EmailViews/SendEmail";
import MapView from "./MapView";
const BusinessDetail = () => {
    const { slug } = useParams();
    const [item_data, setData] = React.useState([]);
    const [businessdata, setBusinessData] = React.useState([]);
    const [reviewdata, setReviewsData] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [locations, setLocations] = React.useState(null);
    const { getCookie, user } = React.useContext(AuthContext);
    const [longitude, setLongitude] = React.useState(null);
    const [latitude, setLatitude] = React.useState(null);
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
    const get_multiple_locations = async () => {
        const location_url = `/api/getparticularbusinesslocations/?slug=${slug}`;
        const response = await fetch(location_url);
        const data = await response.json();
        if (response.status == 200) {
            setLocations(data["results"]);
        }
        else {
            setLocations(null);
        }
    }
    const get_review_details = async () => {
        const url = `/api/reviewdetails/?slug=${slug}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.status == 200) {
            setCount(data.count);
            setReviewsData(data.results);
        }
        else {
            console.log("some error occured");
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
    const getBusiness = async () => {
        const url = `/api/getparticularbusinessdeals/?slug=${slug}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.status == 200) {
            setBusinessData(data["results"]);
        }
        else {
            console.log("data not recieved");
            setBusinessData(null);
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
    let average_reviews = 0
    reviewdata.map((review) => {
        average_reviews += review.rate;
    });
    if (count > 0) {
        average_reviews = Math.ceil(average_reviews / count);
    }
    const firstslide = businessdata && businessdata.slice(0, 3);
    const secondslide = businessdata && businessdata.slice(4, 7);
    const thirdslide = businessdata && businessdata.slice(7, 11);
    React.useEffect(() => {
        getSingleItemDetails();
        getBusiness();
        get_review_details();
        get_multiple_locations();
    }, []);
    return (
        <div>
            {/* Page content*/}
            {/* Page header*/}
            {/* Modal */}
            {
                user && <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <SendEmail vendor_email={item_data.email} vendor_name={item_data.user} slug={slug} />
                </div>
            }
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
            <div>
                {/* Gallery*/}
                <section className="container overflow-auto mb-5" data-simplebar>
                    <div className="row g-2 g-md-3 gallery" data-thumbnails="true" style={{ minWidth: '30rem', display: 'flex', justifyContent: 'center' }}>
                        <div className="col-8"><a href={item_data.image_field}><img src={item_data.image_field} alt="Gallery thumbnail" /></a></div>
                    </div>
                </section>
                {/* Page content*/}
                <section className="container pb-5 mb-md-4">
                    <div className="row">
                        <div className="col-md-7 mb-md-0 mb-3">
                            <div className="card py-2 px-sm-4 px-3 shadow-sm">
                                <div className="card-body mx-n2">
                                    {/* Place info*/}
                                    <div className="d-flex align-items-start mb-3 pb-3 border-bottom"><img src={item_data.image_field} width={60} alt="Thumbnail" />
                                        <div className="ps-2 ms-1">
                                            <h3 className="h5 mb-2">{item_data.title}</h3>
                                            <ul className="list-unstyled d-flex flex-wrap fs-sm">
                                                <li className="me-2 mb-1 pe-1"><i className="fi-star-filled mt-n1 me-1 text-warning align-middle opacity-70" /><b>{average_reviews} </b>({count})</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3">
                                        {
                                            item_data.type == 'classifieds' && <div>
                                                <h4 className="h5 mb-2">Contact Details</h4>
                                                <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="col-md-6">
                                                        <i className="fi-globe mt-1 me-2 align-middle opacity-60" />{item_data.email}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <i className="fi-phone mt-1 me-2 align-middle opacity-70" />{item_data.phone_number}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="mb-3 pb-3">
                                        {
                                            item_data.type == 'events' && <div>
                                                <h4 className="h5 mb-2">Contact Details</h4>
                                                <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="col-md-6">
                                                        <i className="fi-globe mt-1 me-2 align-middle opacity-60" />{item_data.email}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <i className="fi-phone mt-1 me-2 align-middle opacity-70" />{item_data.phone_number}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="mb-3 pb-3">
                                        {
                                            item_data.type == 'deals' && <div>
                                                <h4 className="h5 mb-2">Contact Details</h4>
                                                <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="col-md-6">
                                                        <i className="fi-globe mt-1 me-2 align-middle opacity-60" />{item_data.datefrom} to {item_data.dateto}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <i className="fi-globe mt-1 me-2 align-middle opacity-60" />{item_data.email}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <i className="fi-phone mt-1 me-2 align-middle opacity-70" />{item_data.phone_number}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {/* Place contacts*/}
                                    <div className="mb-3 pb-3">
                                        {
                                            item_data.location && <div>
                                                <h4 className="h5 mb-2">Main Location</h4>
                                                <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="col-md-6">
                                                        <i className="fi-map-pin mt-1 me-2 align-middle opacity-70" />{item_data.location}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <i className="fi-globe mt-1 me-2 align-middle opacity-60" />{item_data.timingfrom} to {item_data.timingto}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <i className="fi-globe mt-1 me-2 align-middle opacity-60" />{item_data.email}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <i className="fi-phone mt-1 me-2 align-middle opacity-70" />{item_data.phone_number}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            locations && <div style={{ marginTop: 10 }}>
                                                <h4 className="h5 mb-2">Other Locations</h4>
                                                {
                                                    locations.map((location) => {
                                                        return (
                                                            <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                                                                <div className="col-md-6">
                                                                    <i className="fi-map-pin mt-1 me-2 align-middle opacity-70" />{location.location}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <i className="fi-globe mt-1 me-2 align-middle opacity-60" />{location.timingfrom} to {location.timingto}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>

                                    {/* Place pricing*/}
                                    <div className="mb-3 pb-3">
                                        <div className="row row-cols-sm-2 row-cols-1">
                                            {
                                                user && <div className="col"><button type="button" className="btn btn-primary btn-lg rounded-pill w-sm-auto w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">Contact Now</button></div>
                                            }
                                        </div>
                                    </div>
                                    {/* Follow*/}
                                    <div className="d-flex align-items-center">
                                        <h4 className="h5 mb-0 me-3">Follow:</h4>
                                        <div className="text-nowrap"><a className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2" href="#"><i className="fi-facebook" /></a><a className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2" href="#"><i className="fi-instagram" /></a><a className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle" href="#"><i className="fi-twitter" /></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Location (Map)*/}
                        {
                            item_data.type == 'business' && <div className="col-md-5">
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
                    </div>
                </section>
                {/* Recently viewed*/}
                {
                    businessdata && <section className="container pb-5 mb-lg-4">
                        <div className="d-flex align-items-center justify-content-between mb-4 pb-2">
                            <h2 className="h3 mb-0">Business Deals</h2><Link className="btn btn-link fw-normal ms-sm-3 p-0" to="/deals">View all<i className="fi-arrow-long-right ms-2" /></Link>
                        </div>
                        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {
                                    firstslide.length > 0 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" /> : <div style={{ display: 'none' }}></div>
                                }
                                {
                                    secondslide.length > 0 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={1} aria-label="Slide 2" /> : <div style={{ display: 'none' }}></div>
                                }
                                {
                                    thirdslide.length > 0 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={2} aria-label="Slide 3" /> : <div style={{ display: 'none' }}></div>
                                }
                            </div>
                            <div className="carousel-inner">
                                {
                                    firstslide.length > 0 ? <div className="carousel-item active">
                                        <div className="row">
                                            {
                                                firstslide.map((item) => {
                                                    return (
                                                        <div className="col-md-4">
                                                            <div className="card">
                                                                <img src={item.image_field} className="card-img-top" alt="carousel-image" style={{ width: '100%', height: '200px' }} />
                                                                <div className="card-body">
                                                                    <h3 className="mb-2 fs-lg"><Link className="nav-link stretched-link" to={`/businessdetail/${item.slug}`}>{item.title}</Link></h3>
                                                                    <p className="card-text">{item.description.slice(0, 25)}</p>
                                                                    <Link to={`/businessdetail/${item.slug}`} className="btn btn-primary" style={{
                                                                        paddingTop: '7px',
                                                                        paddingLeft: '10px', paddingRight: '10px',
                                                                        paddingBottom: '7px',
                                                                        backgroundColor: '#FD5631',
                                                                    }}>Details</Link>
                                                                    <div style={{ marginTop: 20 }}>
                                                                        <ul className="list-inline mb-0 fs-xs">
                                                                            <li className="list-inline-item pe-1"><i className="fi-star-filled mt-n1 me-1 fs-base text-warning align-middle" /><b>{item.rate}</b><span className="text-muted">&nbsp;({item.rate_count})</span></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div> : <div style={{ display: 'none' }}></div>
                                }
                                {
                                    secondslide.length > 0 ? <div className="carousel-item">
                                        <div className="row">
                                            {
                                                secondslide.map((item) => {
                                                    return (
                                                        <div className="col-md-4">
                                                            <div className="card">
                                                                <img src={item.image_field} className="card-img-top" alt="carousel-image" style={{ width: '100%', height: '200px' }} />
                                                                <div className="card-body">
                                                                    <h3 className="mb-2 fs-lg"><Link className="nav-link stretched-link" to={`/businessdetail/${item.slug}`}>{item.title}</Link></h3>
                                                                    <p className="card-text">{item.description.slice(0, 25)}</p>
                                                                    <Link to={`/businessdetail/${item.slug}`} className="btn btn-primary" style={{
                                                                        paddingTop: '7px',
                                                                        paddingLeft: '10px', paddingRight: '10px',
                                                                        paddingBottom: '7px',
                                                                        backgroundColor: '#FD5631',
                                                                    }}>Details</Link>
                                                                    <div style={{ marginTop: 20 }}>
                                                                        <ul className="list-inline mb-0 fs-xs">
                                                                            <li className="list-inline-item pe-1"><i className="fi-star-filled mt-n1 me-1 fs-base text-warning align-middle" /><b>{item.rate}</b><span className="text-muted">&nbsp;({item.rate_count})</span></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                        : <div style={{ display: 'none' }}></div>
                                }
                                {
                                    thirdslide.length > 0 ? <div className="carousel-item">
                                        <div className="row">
                                            {
                                                thirdslide.map((item) => {
                                                    return (
                                                        <div className="col-md-4">
                                                            <div className="card">
                                                                <img src={item.image_field} className="card-img-top" alt="carousel-image" style={{ width: '100%', height: '200px' }} />
                                                                <div className="card-body">
                                                                    <h3 className="mb-2 fs-lg"><Link className="nav-link stretched-link" to={`/businessdetail/${item.slug}`}>{item.title}</Link></h3>
                                                                    <p className="card-text">{item.description.slice(0, 25)}</p>
                                                                    <Link to={`/businessdetail/${item.slug}`} className="btn btn-primary" style={{
                                                                        paddingTop: '7px',
                                                                        paddingLeft: '10px', paddingRight: '10px',
                                                                        paddingBottom: '7px',
                                                                        backgroundColor: '#FD5631',
                                                                    }}>Details</Link>
                                                                    <div style={{ marginTop: 20 }}>
                                                                        <ul className="list-inline mb-0 fs-xs">
                                                                            <li className="list-inline-item pe-1"><i className="fi-star-filled mt-n1 me-1 fs-base text-warning align-middle" /><b>{item.rate}</b><span className="text-muted">&nbsp;({item.rate_count})</span></li>
                                                                            <li className="list-inline-item pe-1"><i className="fi-credit-card mt-n1 me-1 fs-base text-muted align-middle" />$$</li>
                                                                            <li className="list-inline-item pe-1"><i className="fi-map-pin mt-n1 me-1 fs-base text-muted align-middle" />1.4 km from center</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div> : <div style={{ display: 'none' }}></div>
                                }
                            </div>
                            {
                                secondslide.length > 0 || thirdslide.length > 0 ?
                                    <div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true" />
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                    : <div style={{ display: 'none' }}></div>
                            }
                        </div>
                    </section>
                }
            </div>
        </div>
    )
}
export default BusinessDetail;