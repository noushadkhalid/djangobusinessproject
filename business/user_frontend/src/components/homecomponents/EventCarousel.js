import React from "react";
import { Link } from "react-router-dom";
const EventCarousel = () => {
    const [eventsdata, setEventsData] = React.useState([]);
    const getBusiness = async () => {
        const url = '/api/eventslist';
        const response = await fetch(url);
        const data = await response.json();
        if (response.status == 200) {
            setEventsData(data["results"]);
        }
        else {
            console.log("data not recieved");
        }
    }
    React.useEffect(() => {
        getBusiness();
    }, []);
    const firstslide = eventsdata.slice(0, 3);
    const secondslide = eventsdata.slice(4, 7);
    const thirdslide = eventsdata.slice(7, 11);
    return (
        <div>
            <link rel="stylesheet" href="/static/cardcss/style.css"></link>
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4 pb-2">
                    <h2 className="h3 mb-sm-0">Find Events</h2><Link className="btn btn-link fw-normal ms-sm-3 p-0" to="/events">View all<i className="fi-arrow-long-right ms-2" /></Link>
                </div>
                <div id="carouselExampleDark3" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {
                            firstslide.length > 0 ? <button type="button" data-bs-target="#carouselExampleDark3" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" /> : <div style={{ display: 'none' }}></div>
                        }
                        {
                            secondslide.length > 0 ? <button type="button" data-bs-target="#carouselExampleDark3" data-bs-slide-to={1} aria-label="Slide 2" /> : <div style={{ display: 'none' }}></div>
                        }
                        {
                            thirdslide.length > 0 ? <button type="button" data-bs-target="#carouselExampleDark3" data-bs-slide-to={2} aria-label="Slide 3" /> : <div style={{ display: 'none' }}></div>
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
                                                            <p className="card-text">{item.description}</p>
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
                                                            <p className="card-text">{item.description}</p>
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
                                                            <p className="card-text">{item.description}</p>
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
                    </div>
                    {
                        secondslide.length > 0 || thirdslide.length > 0 ?
                            <div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark3" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark3" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            : <div style={{ display: 'none' }}></div>
                    }
                </div>
            </div>
        </div>
    )
}
export default EventCarousel;