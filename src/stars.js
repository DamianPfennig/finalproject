import React, { useState, useEffect } from "react";
import { getSelectedFestival, getRatings } from './actions';
import { withRouter } from "react-router";
import { useSelector, useDispatch } from 'react-redux';


import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Stars({ match }) {
    const dispatch = useDispatch();
    const [value, setValue] = useState();


    const retrievedRatings = useSelector(state => state && state.ratings);


    useEffect(() => {
        let url = match.params.id;
        // dispatch(getSelectedFestival(url));
        dispatch(getRatings(url));
    }, [])

    console.log('retrievedRatings in Stars', retrievedRatings)



    return (
        <div>

            {/* <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">{elem[idx]}</Typography>
                                <Rating name="read-only" value={elem.value} readOnly />
                            </Box> */}


            {
                retrievedRatings &&
                retrievedRatings.map((elem, idx) => {
                    return (
                        <div className="stars-results-container" key={idx}>
                            <div className="only-stars-container">
                                <div className="each-stars-results">
                                    <Typography component="legend">Location</Typography>
                                    <Rating value={elem.location} readOnly />
                                </div>
                                <br></br>
                                <div className="each-stars-results">
                                    <Typography component="legend">Organization</Typography>
                                    <Rating value={elem.organization} readOnly />
                                </div>
                                <br></br>
                                <div className="each-stars-results">
                                    <Typography component="legend">Food</Typography>
                                    <Rating value={elem.food} readOnly />
                                </div>
                                <br></br>
                                <div className="each-stars-results">
                                    <Typography component="legend">Toilets and Showers</Typography>
                                    <Rating value={elem.toilets_showers} readOnly />
                                </div>
                            </div>
                            {/* <br></br>
                            <div className="each-text-result">
                                <h4>User wrote</h4>
                                <p >{elem.recommendation}</p>
                            </div> */}
                            <br></br>
                            <div className="each-text-result">
                                <h4>User wrote</h4>
                                <p >{elem.text}</p>
                            </div>
                        </div>

                    )
                })
            }




        </div>
    );
}

export default withRouter(Stars);



//////////////////////////

// import { getSelectedFestival, getRatings } from './actions';
// import { withRouter } from "react-router";
// import { useSelector, useDispatch } from 'react-redux';


// function Stars({ match }) {
//     const dispatch = useDispatch();

//     const retrievedRatings = useSelector(state => state && state.ratings);
//     console.log('retrievedRatings in Stars: ', retrievedRatings)

//     useEffect(() => {
//         let url = match.params.id;
//         dispatch(getRatings(url));
//     }, [])
//     let arr = []
//     useEffect(() => {
//         // if (retrievedRatings != null) {
//         //     retrievedRatings.map(elem => {
//         //         console.log('elem.location: ', elem.location);
//         //         arr.push(elem.location);
//         //     })
//         //     console.log('arr', arr)
//         //     arr.map(i => {
//         //         console.log('i', i);
//         //         const starTotal = i;

//         //         for (const key in ratings) {
//         //             //console.log('KEYYYYYYY!!!!', key)
//         //             const starPercentage = (ratings[key] / starTotal) * 100;
//         //             const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
//         //             document.querySelector(`.${key} .stars-inner`).style.width = starPercentageRounded;
//         //             document.querySelector(`.${key} .number-rating`).innerHTML = ratings[key];
//         //         }
//         //     })
//         // }
//     }, [retrievedRatings])