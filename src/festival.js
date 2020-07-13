// import React, { Component } from 'react';
import axios from './axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { getSelectedFestival } from './actions';
import { Link } from 'react-router-dom';


import MapContainer from './map';
import ReactWeather from 'react-open-weather';
import { FaBeer, FaCarAlt, FaDonate } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { BsPeopleFill, BsMusicNoteBeamed, BsStar, BsStarFill } from 'react-icons/bs';

// import Weather from './weather';
// const API_KEY = "b74c34775e1a7ccb972c3eb120e57e32";

function Festival({ match }) {
    const dispatch = useDispatch();
    const selectedFestival = useSelector(state => state.selectedFestival);
    console.log('data in Festival Component: ', selectedFestival)

    useEffect(() => {
        console.log(':::::', match.params.id);
        let url = match.params.id;
        console.log(url)
        dispatch(getSelectedFestival(url));
    }, [])

    return (
        <div className="festival-page">
            <div className="selected-festival-container">

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