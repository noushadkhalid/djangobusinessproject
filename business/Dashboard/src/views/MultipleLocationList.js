import React from "react";
import { useParams,Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import AuthContext from "../context/AuthContext";
const MultipleLocationList = () => {
    const { slug } = useParams();
    const [businessdata, setBusinessData] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [link, setLink] = React.useState(`/api/getparticularbusinesslocations/?slug=${slug}`);
    const { vendor_ask } = React.useContext(AuthContext);
    const getBusiness = async () => {
        const url = link;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
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
            setLink(`/api/getparticularbusinesslocations/?slug=${slug}`);
        }
        else {
            setLink(`/api/getparticularbusinesslocations/?page=${pagenomber}&slug=${slug}`);
        }
    }
    React.useEffect(() => {
        getBusiness();
    }, [link]);
    return (
        <div>
            {
                vendor_ask == true ? <div className="content-wrapper" >
                    {/* Content Header (Page header) */}
                    < section className="content-header" >
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>DataTables</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">DataTables</li>
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
                                            <h3 className="card-title">All the Products that you have created</h3>
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body">
                                            <table id="example2" className="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Business</th>
                                                        <th>Location</th>
                                                        <th>Open At</th>
                                                        <th>Close At</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        businessdata && businessdata.map((item) => {
                                                            return (
                                                                <tr>
                                                                    <td>{item.business}</td>
                                                                    <td><p>{item.location.slice(0,28)}</p></td>
                                                                    <td>
                                                                        {item.timingfrom}
                                                                    </td>
                                                                    <td>
                                                                        {item.timingto}
                                                                    </td>
                                                                    <td><Link className="btn btn-primary" to={`/updatelocation/${item.slug}`}>Edit</Link>
                                                                    </td>
                                                                    <td>
                                                                        <Link className="btn btn-danger" to={`/deletelocation/${slug}/${item.slug}`}>Delete</Link>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Business</th>
                                                        <th>Location</th>
                                                        <th>Open At</th>
                                                        <th>Close At</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
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
                </div> : <h1></h1>
            }
        </div>
    )
}
export default MultipleLocationList;