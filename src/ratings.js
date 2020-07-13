
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { addRatings } from './actions';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';



function Ratings({ match }) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState();


    useEffect(() => {
        //console.log(':::::', match.params.id);
        // console.log(':::::', match.params.id);
        // let url = match.params.id;
        // console.log(url)
    }, [])

    let input = {}
    input['festivalId'] = match.params.id;
    function handleChange(e) {
        input[e.target.name] = e.target.value;
        console.log('input: ', input)
        // console.log('rating location::', arr);
    }

    function handleClick() {
        dispatch(addRatings(input));
    }

    return (
        <div className="ratings-page">
            <div className="ratings-container">
                <div className="item">
                    <h3>Location</h3>
                    <div className="stars">
                        <input type="radio" id="1-star5" name="location" value="5" onClick={handleChange} />
                        <label htmlFor="1-star5" title="text">5 stars</label>
                        <input type="radio" id="1-star4" name="location" value="4" onClick={handleChange} />
                        <label htmlFor="1-star4" title="text">4 stars</label>
                        <input type="radio" id="1-star3" name="location" value="3" onClick={handleChange} />
                        <label htmlFor="1-star3" title="text">3 stars</label>
                        <input type="radio" id="1-star2" name="location" value="2" onClick={handleChange} />
                        <label htmlFor="1-star2" title="text">2 stars</label>
                        <input type="radio" id="1-star1" name="location" value="1" onClick={handleChange} />
                        <label htmlFor="1-star1" title="text">1 star</label>
                    </div>
                </div>
                <div className="item">
                    <h3>Organization</h3>
                    <div className="stars">
                        <input type="radio" id="2-star5" name="organization" value="5" onClick={handleChange} />
                        <label htmlFor="2-star5" title="text">5 stars</label>
                        <input type="radio" id="2-star4" name="organization" value="4" onClick={handleChange} />
                        <label htmlFor="2-star4" title="text">4 stars</label>
                        <input type="radio" id="2-star3" name="organization" value="3" onClick={handleChange} />
                        <label htmlFor="2-star3" title="text">3 stars</label>
                        <input type="radio" id="2-star2" name="organization" value="2" onClick={handleChange} />
                        <label htmlFor="2-star2" title="text">2 stars</label>
                        <input type="radio" id="2-star1" name="organization" value="1" onClick={handleChange} />
                        <label htmlFor="2-star1" title="text">1 star</label>
                    </div>
                </div>
                <div className="item">
                    <h3>Food</h3>
                    <div className="stars">
                        <input type="radio" id="3-star5" name="food" value="5" onChange={handleChange} />
                        <label htmlFor="3-star5" title="text">5 stars</label>
                        <input type="radio" id="3-star4" name="food" value="4" onChange={handleChange} />
                        <label htmlFor="3-star4" title="text">4 stars</label>
                        <input type="radio" id="3-star3" name="food" value="3" onChange={handleChange} />
                        <label htmlFor="3-star3" title="text">3 stars</label>
                        <input type="radio" id="3-star2" name="food" value="2" onChange={handleChange} />
                        <label htmlFor="3-star2" title="text">2 stars</label>
                        <input type="radio" id="3-star1" name="food" value="1" onChange={handleChange} />
                        <label htmlFor="3-star1" title="text">1 star</label>
                    </div>
                </div>
                <div className="item">
                    <h3>Toilets and Showers</h3>
                    <div className="stars">
                        <input type="radio" id="4-star5" name="toilets_showers" value="5" onChange={handleChange} />
                        <label htmlFor="4-star5" title="text">5 stars</label>
                        <input type="radio" id="4-star4" name="toilets_showers" value="4" onChange={handleChange} />
                        <label htmlFor="4-star4" title="text">4 stars</label>
                        <input type="radio" id="4-star3" name="toilets_showers" value="3" onChange={handleChange} />
                        <label htmlFor="4-star3" title="text">3 stars</label>
                        <input type="radio" id="4-star2" name="toilets_showers" value="2" onChange={handleChange} />
                        <label htmlFor="4-star2" title="text">2 stars</label>
                        <input type="radio" id="4-star1" name="toilets_showers" value="1" onChange={handleChange} />
                        <label htmlFor="4-star1" title="text">1 star</label>
                    </div>
                </div>
                <Link to={`/festival/${match.params.id}`} >
                    <button className="btn-ratings" onClick={handleClick}>Send Ratings</button>
                </Link>

            </div>
        </div>
    )

}

export default withRouter(Ratings);