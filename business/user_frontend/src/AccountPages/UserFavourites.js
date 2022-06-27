import React from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
const UserFavourites = () => {
    const [businessdata, setBusinessData] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [link, setLink] = React.useState('/api/display_favourites/');
    const getBusiness = async () => {
        const url = link;
        const response = await fetch(url);
        const data = await response.json();
        if (response.status == 200) {
            setBusinessData(data["results"]);
            setCount(data.count);
        }
        else {
            console.log("data not recieved");
        }
    }
    const pagecount = Math.ceil(count / 10);
    const handleClickchange = (e) => {
        let pagenomber = e.selected + 1;
        if (pagenomber == 1) {
            setLink('/api/display_favourites/');
        }
        else {
            setLink(`/api/display_favourites/?page=${pagenomber}`);
        }
    }
    React.useEffect(() => {
        getBusiness();
    }, [link]);
    return (
        <div>
            <div className="container-fluid mt-5 pt-5 p-0">
                <div className="row g-0 mt-n3">
                    {/* Page content*/}
                    <div className="col-lg-12 col-xl-12 position-relative overflow-hidden pb-5 pt-4 px-3 px-xl-4 px-xxl-5">
                        {/* Map popup*/}
                        <div className="map-popup invisible" id="map">
                            <button className="btn btn-icon btn-light btn-sm shadow-sm rounded-circle" type="button" data-bs-toggle-className="invisible" data-bs-target="#map"><i className="fi-x fs-xs" /></button>
                            <div className="interactive-map" data-map-options-json="json/map-options-city-guide.json" />
                        </div>
                        {/* Breadcrumb*/}
                        <nav className="mb-3 pt-md-2" aria-label="Breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="city-guide-home-v1.html" to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Your Favorites</li>
                            </ol>
                        </nav>
                        {/* Title*/}
                        <div className="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4">
                            <h1 className="h2 mb-sm-0">Your Favorites</h1><a className="d-inline-block fw-bold text-decoration-none py-1" href="#" data-bs-toggle-className="invisible" data-bs-target="#map"><i className="fi-map me-2" />Map view</a>
                        </div>
                        {/* Sorting*/}
                        <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2">
                            <hr className="d-none d-sm-block w-100 mx-4" />
                            <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted"><i className="fi-check-circle me-2" /><span className="fs-sm mt-n1">{count} results</span></div>
                        </div>
                        {/* Catalog grid*/}
                        <div className="row row-cols-xl-3 row-cols-sm-2 row-cols-1 gy-4 gx-3 gx-xxl-4 py-4">
                            {
                                businessdata.map((item) => {
                                    return (
                                        <div className="col pb-sm-2">
                                            <article className="position-relative">
                                                <div className="position-relative mb-3">
                                                    <button className="btn btn-icon btn-light-primary btn-xs text-primary rounded-circle position-absolute top-0 end-0 m-3 zindex-5" type="button" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Favorites"><i className="fi-heart" /></button><img className="rounded-3" src={item.image_url} alt="Article img" />
                                                </div>
                                                <h3 className="mb-2 fs-lg"><Link className="nav-link stretched-link" to={`/businessdetail/${item.item_slug}`}>{item.item_title}</Link></h3>
                                            </article>
                                            <Link className="btn btn-danger" to={`/favoritesremove/${item.item_slug}`}>Remove</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* Pagination*/}
                        <nav className="border-top pb-md-4 pt-4" aria-label="Page navigation example">
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
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserFavourites;