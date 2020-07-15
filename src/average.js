import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "react-router";
import { getRatings } from './actions';
import ReactDelayRender from 'react-delay-render';


import $ from "jquery";


function Average({ match }) {
    const dispatch = useDispatch();

    const retrievedRatings = useSelector(state => state && state.ratings);
    //console.log('retrievedRatings ', retrievedRatings);

    ///////////////////////////
    var test = [];
    var locationAvg, organizationAvg, foodAvg, toiletesShowersAvg;
    const ratings = {}
    function empty() {
        test.length = 0
    }

    if (retrievedRatings) {
        retrievedRatings.map((elem, idx) => {
            test.push(elem.location)
        })
        //console.log('test::', test)
        let total = 0;
        for (let i = 0; i < test.length; i++) {
            total += test[i]
        }
        //console.log('total: ', total)
        locationAvg = total / test.length;
        //locationAvg.toFixed(1);
        ratings['location'] = locationAvg.toFixed(1);
        //console.log('locationAvg::', locationAvg);
        empty();
    }

    if (retrievedRatings) {
        retrievedRatings.map((elem, idx) => {
            test.push(elem.organization)
        })
        //console.log('test::', test)
        let total = 0;
        for (let i = 0; i < test.length; i++) {
            total += test[i]
        }
        organizationAvg = total / test.length;
        ratings['organization'] = organizationAvg.toFixed(1);
        //console.log('organizationAvg::', organizationAvg);
        empty();
    }

    if (retrievedRatings) {
        retrievedRatings.map((elem, idx) => {
            test.push(elem.food)
        })
        //console.log('test::', test)
        let total = 0;
        for (let i = 0; i < test.length; i++) {
            total += test[i]
        }
        //console.log('total food: ', total)

        foodAvg = total / test.length
        ratings['food'] = foodAvg.toFixed(1);
        //console.log('foodAvg::', foodAvg.toFixed(1));
        empty();
    }

    if (retrievedRatings) {
        retrievedRatings.map((elem, idx) => {
            test.push(elem.toilets_showers);
        })
        //console.log('test showers::', test)
        let total = 0;
        for (let i = 0; i < test.length; i++) {
            total += test[i]
        }
        //console.log('total showers: ', total)
        toiletesShowersAvg = total / test.length;
        ratings['toiletesShowers'] = toiletesShowersAvg.toFixed(1);
        //console.log('toiletesShowersAvg::', toiletesShowersAvg.toFixed(1));
    }
    useEffect(() => {


        const starTotal = 5;

        for (const key in ratings) {
            //console.log('KEYYYYYYY!!!!', key)
            const starPercentage = (ratings[key] / starTotal) * 100;
            const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
            document.querySelector(`.${key} .stars-inner`).style.width = starPercentageRounded;
            document.querySelector(`.${key} .number-rating`).innerHTML = ratings[key];
        }
    }, [retrievedRatings])

    ///////////////////////////////////////

    useEffect(() => {
        console.log(':::::', match.params.id);
        let url = match.params.id;
        dispatch(getRatings(url));
    }, [])


    return (
        <div className="average-ratings">
            <h3>Average</h3>
            <table>
                <tbody>
                    <tr className="location">
                        <td>Location</td>
                        <td>
                            <div className="stars-outer">
                                <div className="stars-inner"></div>
                            </div>
                            <span className="number-rating"></span>
                        </td>
                    </tr>
                    <tr className="organization">
                        <td>Organization</td>
                        <td>
                            <div className="stars-outer">
                                <div className="stars-inner"></div>
                            </div>
                            <span className="number-rating"></span>
                        </td>
                    </tr>
                    <tr className="food">
                        <td>Food</td>
                        <td>
                            <div className="stars-outer">
                                <div className="stars-inner"></div>
                            </div>
                            <span className="number-rating"></span>
                        </td>
                    </tr>
                    <tr className="toiletesShowers">
                        <td>Toilets and Showers</td>
                        <td>
                            <div className="stars-outer">
                                <div className="stars-inner"></div>
                            </div>
                            <span className="number-rating"></span>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

    )


}

export default withRouter(Average);



/////////////////////////////

// if (retrievedRatings) {
//     retrievedRatings.map((elem, idx) => {
//         test.push(elem.location)
//     })
//     //console.log('test::', test)
//     let total = 0;
//     for (let i = 0; i < test.length; i++) {
//         total += test[i]
//     }
//     locationAvg = total / test.length;
//     //locationAvg.toFixed(1);
//     ratings['location'] = locationAvg.toFixed(1);
//     //console.log('locationAvg::', locationAvg);
// }

// if (retrievedRatings) {
//     retrievedRatings.map((elem, idx) => {
//         test.push(elem.organization)
//     })
//     //console.log('test::', test)
//     let total = 0;
//     for (let i = 0; i < test.length; i++) {
//         total += test[i]
//     }
//     organizationAvg = total / test.length;
//     ratings['organization'] = organizationAvg.toFixed(1);
//     //console.log('organizationAvg::', organizationAvg);
// }

// if (retrievedRatings) {
//     retrievedRatings.map((elem, idx) => {
//         test.push(elem.food)
//     })
//     //console.log('test::', test)
//     let total = 0;
//     for (let i = 0; i < test.length; i++) {
//         total += test[i]
//     }
//     foodAvg = total / test.length
//     ratings['food'] = foodAvg.toFixed(1);
//     //console.log('foodAvg::', foodAvg.toFixed(1));
// }

// if (retrievedRatings) {
//     retrievedRatings.map((elem, idx) => {
//         test.push(elem.food);
//     })
//     //console.log('test::', test)
//     let total = 0;
//     for (let i = 0; i < test.length; i++) {
//         total += test[i]
//     }
//     toiletesShowersAvg = total / test.length;
//     ratings['toiletesShowers'] = toiletesShowersAvg.toFixed(1);
//     //console.log('toiletesShowersAvg::', toiletesShowersAvg.toFixed(1));

//     console.log('RATINGS: ', ratings)
// }