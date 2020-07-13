// import React, { Component } from 'react';
import axios from './axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { getSelectedFestival, getRatings } from './actions';
import { Link } from 'react-router-dom';


import MapContainer from './map';
import ReactWeather from 'react-open-weather';
import { FaBeer, FaCarAlt, FaDonate } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { BsPeopleFill, BsMusicNoteBeamed, BsStar, BsStarFill } from 'react-icons/bs';

// import Weather from './weather';


function Festival({ match }) {


    const dispatch = useDispatch();

    const selectedFestival = useSelector(state => state.selectedFestival);
    //console.log('data in Festival Component: ', selectedFestival);
    var city;
    var weatherData;
    if (selectedFestival) {
        //console.log('selectedFestival', selectedFestival[0].location)
        city = selectedFestival[0].location;

        axios.get(`/get-weather${city}`).then(({ data }) => {
            console.log('data from server: ', data)
            weatherData = data;

        }).catch(err => console.log('error ', err))
    }




    const retrievedRatings = useSelector(state => state && state.ratings);
    console.log('retrievedRatings ', retrievedRatings);


    var test = [];
    var locationAvg, organizationAvg, foodAvg, toiletesShowersAvg;

    if (retrievedRatings) {
        retrievedRatings.map((elem, idx) => {
            test.push(elem.location)
        })
        //console.log('test::', test)
        let total = 0;
        for (let i = 0; i < test.length; i++) {
            total += test[i]
        }
        locationAvg = total / test.length
        console.log('locationAvg::', locationAvg);
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
        organizationAvg = total / test.length
        console.log('organizationAvg::', organizationAvg);
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
        foodAvg = total / test.length
        console.log('foodAvg::', foodAvg);
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
        toiletesShowersAvg = total / test.length
        console.log('toiletesShowersAvg::', toiletesShowersAvg);
    }
    // const retrievedRatings = useSelector(state => state && state.ratings.map((elem, idx) => {
    //     test = elem.location
    // }))
    //console.log('test::', test)
    const justAddedRatings = useSelector(state => state && state.addRatings);


    console.log('ratings in festival: ', justAddedRatings);
    useEffect(() => {
        console.log(':::::', match.params.id);
        let url = match.params.id;
        console.log(url);
        dispatch(getSelectedFestival(url));
        dispatch(getRatings(url));

    }, [])

    return (
        <div className="festival-page">
            <div className="selected-festival-container">

                <div className="weather-container">
                    <h3>Weather for the next days in {city}</h3>
                    {
                        weatherData &&
                        weatherData.map((elem, idx) => {
                            return (
                                <div className="weather-info" key={idx}>
                                    <p>{elem.day}</p>
                                    <p>{elem.high}</p>
                                    <p>{elem.low}</p>
                                    <p>{elem.skytextday}</p>
                                </div>
                            )
                        })
                    }
                </div>

                {/* <div className="info-container"> */}
                {
                    selectedFestival &&
                    selectedFestival.map((elem, idx) => {
                        return (
                            <div className="info-container" key={idx}>
                                <div className="image-container">
                                    <img src={elem.imageurl} alt="image" />
                                </div>
                                <h1>{elem.name}</h1>
                                <h2>({elem.location})</h2>
                                <h3>{elem.startingdate} - {elem.finishingdate}</h3>
                                <div className="description">
                                    <h4>What is {elem.name}?</h4>
                                    <p>{elem.description}</p>
                                    <h4>Program</h4>
                                    <p>{elem.style}</p>
                                    <h4>Price</h4>
                                    <p>{elem.price} euro</p>
                                    <p><a href={elem.url}>Homepage</a></p>
                                    <h4>Confirmed Artists</h4>
                                    <p className="confirmed-artists">{elem.artists}</p>
                                </div>
                                <br></br>
                                <div>
                                    <Link to={`/ratings/${match.params.id}`} >
                                        <h3>Give your ratings to {elem.name}</h3>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }


                <div className="all-stars-results">
                    <h1>Ratings</h1>
                    <div className="average-ratings">
                        <h3>Average Ratings</h3>
                        <p>Location: {locationAvg}</p>
                        <p>Organization: {organizationAvg}</p>
                        <p>Food: {foodAvg}</p>
                        <p>Toilets and Showers: {toiletesShowersAvg}</p>
                    </div>

                    {
                        retrievedRatings &&
                        retrievedRatings.map((elem, idx) => {
                            return (
                                <div className="each-stars-results" key={idx}>
                                    <p>Location</p>
                                    <p >{elem.location}</p>
                                    <div className="stars-results">
                                        <input type="radio" id="1-star1" name="location" value="1" />
                                        <label htmlFor="1-star1" title="text">{elem.location}</label>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        justAddedRatings &&
                        justAddedRatings.map((elem, idx) => {
                            return (
                                <div className="each-stars-results" key={idx}>

                                    <p>Location</p>

                                    <p >{elem.location}</p>

                                    <div className="stars-results">
                                        <input type="radio" id="1-star1" name="location" value="1" />
                                        <label htmlFor="1-star1" title="text">{elem.location}</label>
                                    </div>

                                    {/* <p>Organization</p>
                                <p>{elem.organization}</p>
                                <p>Food</p>
                                <p>{elem.food}</p>
                                <p>Toilets and Showers</p>
                                <p> {elem.toilets_showers}</p> */}

                                </div>

                            )
                        })
                    }
                </div>


                {/* </div> */}
            </div>
        </div>
    )

}
export default withRouter(Festival);








///////////////////////////////////////////////////////

// class Festival extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             // temperature: undefined,
//             // city: undefined,
//             // country: undefined,
//             // humidity: undefined,
//             // description: undefined,
//             // error: undefined
//         }

//         //this.getWeather = this.getWeather.bind(this);
//     }



//     // async getWeather() {
//     //     console.log('getWeather')
//     //     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Berlin&APPID=${API_KEY}`);
//     //     const weatherData = await JSON.parse(api_call);
//     //     console.log('weather data:: ', weatherData);
//     // }

//     async componentDidMount() {
//         let url = this.props.match.params.id
//         const { data } = await axios.get(`/selectedFestival/${url}`);
//         console.log('data in festival ', data[0]);
//         this.setState = ({
//             name: data[0].name,
//             startingdate: data[0].startingdate,
//             finishingdate: data[0].finishingdate,
//             location: data[0].location,
//             price: data[0].price,
//             style: data[0].style,
//             imageUrl: data[0].imageUrl,
//             homepage: data[0].homepage,
//             description: data[0].description
//         })

//         //this.getWeather();

//     }

//     render() {
//         // if (Object.keys(this.state).length === 0 && this.state.constructor === Object) {
//         //     return
//         // }
//         if (!this.state) {
//             return
//         }
//         return (
//             // <div>
//             //     <div>
//             //         Festival <h2>{this.state.name}</h2>
//             //         <p>from {this.state.startingdate} to {this.state.finishingdate}</p>
//             //     </div >
//             // </div>
//             <div className="festival-page">
//                 <div className="selected-festival-container">
//                     <div className="image-container">
//                         <img src="rockamring.jpg" alt="image" />
//                     </div>
//                     <div className="info-container">
//                         <h1>Fusion Festival</h1>
//                         <h2>Berlin, Germany</h2>
//                         <h3>30.06 - 04.07.2021</h3>
//                         <div className="description">
//                             <h4>What is the Fusion Festival?</h4>
//                             <p>
//                                 The Fusion Festival is a music and arts festival with a countercultural character. It takes place at a former military airport called Müritz Airpark in Lärz, Mecklenburg-Vorpommern, in northeastern Germany.
//                                 The festival name is often depicted in Cyrillic letters as Фузион, but pronounced like the English word fusion ['fjuʒən]. The annual festival was started by the Kulturkosmos organisation in 1997.
//                                 It lasts four to six days, usually at the end of June. In 2016, the Fusion Festival event took place from June 29 - July 3, and which has attracted some 70,000 attendees for each year's festival, since the 2013 event, which the comparable American Burning Man event only matched in 2015
//                             </p>
//                         </div>
//                         <h4>Program</h4>
//                         <p> Music, Theater, Workshops, and much more... </p>
//                         <h4>Price</h4>
//                         <p>120 eur</p>
//                         <p><a href="https://www.fusion-festival">Homepage</a></p>
//                         <h4>Confirmed Artists</h4>
//                         <p className="confirmed-artists"></p>

//                         <br></br>
//                         <div className="map">
//                             <MapContainer
//                             />
//                         </div>


//                     </div>
//                 </div>



//                 {/* <FaBeer
//                 />
//                 <FaCarAlt />
//                 <div className="wheater">

//                 </div> */}

//             </div>
//         )

//     }

// }

// export default Festival;

////////////////////////////////////////////////////////////////////

//await JSON.parse(api_call);
{/* <ReactWeather
                        forecast="5days"
                        apikey="b74c34775e1a7ccb972c3eb120e57e32"
                        type="city"
                        city="Berlin" /> */}