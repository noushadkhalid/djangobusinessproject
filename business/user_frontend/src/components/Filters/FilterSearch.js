import React from "react";
import AuthContext from "../../context/AuthContext";
const FilterSearch = () => {
    const { filtersearch } = React.useContext(AuthContext);
    const [checked,setChecked]=React.useState(false);
    const [checked2,setChecked2]=React.useState(false);
    const [checked3,setChecked3]=React.useState(false);
    const [checked4,setChecked4]=React.useState(false);
    const [checked5,setChecked5]=React.useState(false);
    const handleValue1 = () => {
        if (checked) {
            setChecked(false);
        }
        else {
            setChecked(true);
        }
    }
    const handleValue2 = () => {
        if (checked2) {
            setChecked2(false);
        }
        else {
            setChecked2(true);
        }
    }
    const handleValue3 = () => {
        if (checked3) {
            setChecked3(false);
        }
        else {
            setChecked3(true);
        }
    }
    const handleValue4 = () => {
        if (checked4) {
            setChecked4(false);
        }
        else {
            setChecked4(true);
        }
    }
    const handleValue5 = () => {
        if (checked5) {
            setChecked5(false);
        }
        else {
            setChecked5(true);
        }
    }
    return (
        <div>
            <form onSubmit={filtersearch}>
                <div className="pb-4 mb-2">
                    <h3 className="h6">Enter Address</h3>
                    <input className="form-control" type="text" placeholder="Address..." name="address"  />
                    <h3 className="h6">Enter City</h3>
                    <input className="form-control" type="text" placeholder="City..." name="city"  />
                </div>
                <div className="pb-4 mb-2">
                    <h3 className="h6">Average rating</h3>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="5-star" name="star_5" value={checked5 ? 5 : 0} onChange={handleValue5} checked={checked5}/>
                        <label className="form-check-label fs-sm align-middle mt-n2" htmlFor="5-star"><span className="star-rating"><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /></span>
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="4-star" name="star_4" value={checked4 ? 4 :0} onChange={handleValue4} checked={checked4} />
                        <label className="form-check-label fs-sm align-middle mt-n2" htmlFor="4-star"><span className="star-rating"><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star" /></span>
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="3-star" name="star_3" value={checked3 ? 3 : 0} onChange={handleValue3} checked={checked3} />
                        <label className="form-check-label fs-sm align-middle mt-n2" htmlFor="3-star"><span className="star-rating"><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star" /><i className="star-rating-icon fi-star" /></span>
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="2-star" name="star_2" value={checked2 ? 2 : 0} onChange={handleValue2} checked={checked2} />
                        <label className="form-check-label fs-sm align-middle mt-n2" htmlFor="2-star"><span className="star-rating"><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star" /><i className="star-rating-icon fi-star" /><i className="star-rating-icon fi-star" /></span>
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="1-star" name="star_1" value={checked ? 1 : 0} onChange={handleValue1} checked={checked} />
                        <label className="form-check-label fs-sm align-middle mt-n2" htmlFor="1-star"><span className="star-rating"><i className="star-rating-icon fi-star-filled active" /><i className="star-rating-icon fi-star" /><i className="star-rating-icon fi-star" /><i className="star-rating-icon fi-star" /><i className="star-rating-icon fi-star" /></span>
                        </label>
                    </div>
                </div>
                <div className="border-top py-4">
                    <button className="btn btn-outline-primary rounded-pill" type="submit"><i className="fi-rotate-right me-2" />Apply Filters</button>
                </div>
            </form>
        </div>
    )
}
export default FilterSearch;