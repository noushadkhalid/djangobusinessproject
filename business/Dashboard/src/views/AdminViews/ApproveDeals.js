import React from "react";
import AuthContext from "../../context/AuthContext";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
const ApproveDeals = () => {
    const { admin_ask } = React.useContext(AuthContext);
    const [businessdata, setBusinessData] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [link, setLink] = React.useState('/api/alldeals/');
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
            setLink('/api/alldeals/');
        }
        else {
            setLink(`/api/alldeals/?page=${pagenomber}`);
        }
    }
    React.useEffect(() => {
        getBusiness();
    }, [link]);
    return (
        <div>
            {
                admin_ask == true ? <div>
                    <div className="content-wrapper" >
                        {/* Content Header (Page header) */}
                        < section className="content-header" >
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>Deals Table</h1>
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
                        </section >
                        {/* Main content */}
                        < section className="content" >
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Approve Deals</h3>
                                            </div>
                                            {/* /.card-header */}
                                            <div className="card-body">
                                                <table id="example2" className="table table-bordered table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Description</th>
                                                            <th>Business</th>
                                                            <th>Delete</th>
                                                            <th>Approve Status</th>
                                                            <th>Approve</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            businessdata && businessdata.map((item) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.title}</td>
                                                                        <td>{item.description.slice(0, 35)}...</td>
                                                                        <td>
                                                                            {item.business}
                                                                        </td>
                                                                        <td><Link className="btn btn-danger" to={`/deletebusiness/${item.slug}`}>Delete</Link>
                                                                        </td>
                                                                        {
                                                                            item.approved == true && <td>Approved</td>
                                                                        }
                                                                        {
                                                                            item.approved == false && <td>Not Approved</td>
                                                                        }
                                                                        <td><Link className="btn btn-primary" to={`/approvedetails/${item.slug}`}>Approve</Link>
                                                                    </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Description</th>
                                                            <th>Business</th>
                                                            <th>Delete</th>
                                                            <th>Approve Status</th>
                                                            <th>Approve</th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                                <div className="container" style={{ marginTop: 12 }}>
                                                    <nav aria-label="Page navigation example">
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
                                            {/* /.card-body */}
                                        </div>
                                        {/* /.card */}
                                    </div>
                                    {/* /.col */}
                                </div>
                                {/* /.row */}
                            </div>
                            {/* /.container-fluid */}
                        </section >
                        {/* /.content */}
                    </div>
                </div> : <div className="content-wrapper"></div>
            }
        </div>
    )
}
export default ApproveDeals;