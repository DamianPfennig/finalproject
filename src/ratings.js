import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { addRatings, getUser } from './actions';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';


function Ratings({ match }) {
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState('');
    const retrievedRatings = useSelector(state => state && state.ratings);


    const userInfo = useSelector(state => state && state.user);
    console.log('userInfo ', userInfo);


    useEffect(() => {
        //console.log(':::::', match.params.id);
        // console.log(':::::', match.params.id);
        // let url = match.params.id;
        // console.log(url)
        dispatch(getUser(match.params.id));
    }, [])

    let input = {}
    input['festivalId'] = match.params.id;
    function handleChange(e) {
        input[e.target.name] = e.target.value;
        console.log('input in handleChange: ', input);
        // console.log('rating location::', arr);
    }
    console.log('match.params.id in rating: ', match.params.id)
    function handleClick() {
        dispatch(addRatings(input));

        location.replace(`/festival/${match.params.id}`);

    }

    function handleText(e) {
        console.log('e.target.value:: ', e.target.value);
        setTextInput(e.target.value);
        console.log('textInput ', textInput)
    }

    function keyCheck(e) {
        if (e.key == 'Enter') {
            //preventDefault don't go to next line in extarea
            e.preventDefault();
            console.log('input Text:', e.target.value);
            //e.target.value = '';
        }
    }

    return (
        <div className="ratings-page">
            <div className="ratings-container">
                <table>
                    <tbody>

                        {/* <h2>Hello {userInfo.first}</h2> */}
                        <tr className="item">

                            <td><h3>Location</h3></td>

                            <td className="stars">
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
                            </td>

                        </tr>

                        <tr className="item">
                            <td><h3>Organization</h3></td>

                            <td className="stars">
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
                            </td>

                        </tr>
                        <tr className="item">
                            <td><h3>Food</h3></td>
                            <td className="stars">
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
                            </td>
                        </tr>
                        <tr className="item">
                            <td><h3>Toilets and Showers</h3></td>
                            <td className="stars">
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
                            </td>
                        </tr>
                    </tbody>
                </table>

                <textarea id="text" name="text" spellCheck="false" rows="8" cols="55" wrap="hard" placeholder="Write some comments about the festival" onChange={handleChange} onKeyDown={keyCheck} ></textarea>



                {/* <Link to={`/festival/${match.params.id}`} > */}
                <button className="btn-ratings" onClick={handleClick}>Send Ratings</button>
                {/* </Link> */}

            </div>
        </div>
    )

}

export default withRouter(Ratings);