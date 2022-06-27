import React from "react";
import { useParams,Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import FilterSearch from "./FilterSearch";
import ReactPaginate from "react-paginate";
const FilterItems = () => {
    const { address, city, rate_1, rate_2, rate_3, rate_4, rate_5 } = useParams();
    const [businessdata, setBusinessData] = React.useState([]);
    const { getCookie } = React.useContext(AuthContext);
    let category = "";
    const [count, setCount] = React.useState(null);
    const [link, setLink] = React.useState(`/api/filter/`);
    const filter_items = async () => {
        const csrf_token = getCookie('csrftoken');
        let filter_url = link;
        const response = await fetch(filter_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ address: address, city: city, rate_1: rate_1, rate_2: rate_2, rate_3: rate_3, rate_4: rate_4, rate_5: rate_5, category: category })
        });
        const data = await response.json();
        if (response.status == 200) {
            setBusinessData(data["results"]);
            setCount(data.count);
        }
        else {
            console.log("data not recieved");
        }
    }
    const pagecount = Math.ceil(count / 8);
    const handleClickchange = (e) => {
        let pagenomber = e.selected + 1;
        if (pagenomber == 1) {
            setLink(`/api/filter/`);
        }
        else {
            setLink(`/api/filter/?page=${pagenomber}`);
        }
    }
    React.useEffect(() => {
        filter_items();
    }, [link]);
    return (
        <div>
            {
                businessdata ?  <div className="container-fluid mt-5 pt-5 p-0">
                <div className="row g-0 mt-n3">
                    {/* Filters sidebar (Offcanvas on mobile)*/}
                    <aside className="col-lg-4 col-xl-3 border-top-lg border-end-lg shadow-sm px-3 px-xl-4 px-xxl-5 pt-lg-2">
                        <div className="offcanvas offcanvas-start offcanvas-collapse" id="filters-sidebar">
                            <div className="offcanvas-header d-flex d-lg-none align-items-center">
                                <h2 className="h5 mb-0">Filters</h2>
                                <button className="btn-close" type="button" data-bs-dismiss="offcanvas" />
                            </div>
                            {/* Nav tabs*/}
                            <div className="offcanvas-header d-block border-bottom py-lg-4 py-3 px-lg-0">
                                <ul className="nav nav-pills" role="tablist">
                                    <li className="nav-item"><a className="nav-link d-flex align-items-center active" href="#categories" data-bs-toggle="tab" role="tab"><i className="fi-list me-2" />Categories</a></li>
                                </ul>
                            </div>
                            <div className="offcanvas-body py-lg-4">
                                {/* Tabs content*/}
                                <div className="tab-content">
                                    {/* Categories*/}
                                    <div className="tab-pane fade show active" id="categories" role="tabpanel">
                                        <div className="row row-cols-lg-2 row-cols-1 g-3">
                                            <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Electronics">
                                                <div className="icon-box-media bg-faded-accent text-accent rounded-circle mb-3 mx-auto"><i className="fi-bed" /></div>
                                                <h3 className="icon-box-title fs-base mb-0">Electronics</h3></a></div>
                                            <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Wood">
                                                <div className="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"><i className="fi-shopping-bag" /></div>
                                                <h3 className="icon-box-title fs-base mb-0">Wood</h3></a></div>
                                            <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Oil Company">
                                                <div className="icon-box-media bg-faded-info text-info rounded-circle mb-3 mx-auto"><i className="fi-meds" /></div>
                                                <h3 className="icon-box-title fs-base mb-0">Oil Company</h3></a></div>
                                            <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Plumber">
                                                <div className="icon-box-media bg-faded-warning text-warning rounded-circle mb-3 mx-auto"><i className="fi-makeup" /></div>
                                                <h3 className="icon-box-title fs-base mb-0">Plumber</h3></a></div>
                                            <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Carpenter">
                                                <div className="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"><i className="fi-entertainment" /></div>
                                                <h3 className="icon-box-title fs-base mb-0">Carpenter</h3></a></div>
                                            <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Iron">
                                                <div className="icon-box-media bg-faded-info text-info rounded-circle mb-3 mx-auto"><i className="fi-car" /></div>
                                                <h3 className="icon-box-title fs-base mb-0">Iron</h3></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                    {/* Page content*/}
                    <div className="col-lg-8 col-xl-9 position-relative overflow-hidden pb-5 pt-4 px-3 px-xl-4 px-xxl-5">
                        {/* Map popup*/}
                        <div className="map-popup invisible" id="map">
                            <button className="btn btn-icon btn-light btn-sm shadow-sm rounded-circle" type="button" data-bs-toggle-className="invisible" data-bs-target="#map"><i className="fi-x fs-xs" /></button>
                            <div className="interactive-map" data-map-options-json="json/map-options-city-guide.json" />
                        </div>
                        {/* Breadcrumb*/}
                        <nav className="mb-3 pt-md-2" aria-label="Breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="city-guide-home-v1.html" to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Your Results</li>
                            </ol>
                        </nav>
                        {/* Title*/}
                        <div className="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4">
                            <h1 className="h2 mb-sm-0">Your Results</h1><a className="d-inline-block fw-bold text-decoration-none py-1" href="#" data-bs-toggle-className="invisible" data-bs-target="#map"><i className="fi-map me-2" />Map view</a>
                        </div>
                        {/* Sorting*/}
                        <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2">
                            <hr className="d-none d-sm-block w-100 mx-4" />
                            <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted"><i className="fi-check-circle me-2" /><span className="fs-sm mt-n1">{count} results</span></div>
                        </div>
                        {/* Catalog grid*/}
                        <div className="row row-cols-xl-3 row-cols-sm-2 row-cols-1 gy-4 gx-3 gx-xxl-4 py-4">
                            {
                                businessdata.length > 0 ?
                                    businessdata.map((item) => {
                                        return (
                                            <div className="col pb-sm-2">
                                                <article className="position-relative">
                                                    <div className="position-relative mb-3">
                                                        <button className="btn btn-icon btn-light-primary btn-xs text-primary rounded-circle position-absolute top-0 end-0 m-3 zindex-5" type="button" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Favorites"><i className="fi-heart" /></button><img className="rounded-3" src={item.image_field} alt="Article img" />
                                                    </div>
                                                    <h3 className="mb-2 fs-lg"><Link className="nav-link stretched-link" to={`/businessdetail/${item.slug}`}>{item.title}</Link></h3>
                                                    <ul className="list-inline mb-0 fs-xs">
                                                        <li className="list-inline-item pe-1"><i className="fi-star-filled mt-n1 me-1 fs-base text-warning align-middle" /><b>{item.rate}</b><span className="text-muted">&nbsp;({item.rate_count})</span></li>
                                                    </ul>
                                                </article>
                                            </div>
                                        )
                                    }) : <div><h2 style={{ textAlign: 'center' }}>Item Does not exists</h2></div>
                            }
                        </div>
                        {/* Pagination*/}
                        <nav className="border-top pb-md-4 pt-4" aria-label="Page navigation example">
                            <ReactPaginate
                                className="pagination mb-1"
                                breakLabel="..."
                                nextLabel="Next"
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
            </div>:<div><h1>Item does not exists</h1></div>
            }
        </div>
    )
}
export default FilterItems;