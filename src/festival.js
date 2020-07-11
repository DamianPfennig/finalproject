import React, { Component } from 'react';
import axios from './axios';
// import GoogleApiWrapper from './map';
import ReactWeather from 'react-open-weather';
import { FaBeer, FaCarAlt, FaDonate } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { BsPeopleFill, BsMusicNoteBeamed, BsStar, BsStarFill } from 'react-icons/bs';



class Festival extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        let url = this.props.match.params.id
        const { data } = await axios.get(`/selectedFestival/${url}`);
        console.log('data in festival ', data[0]);
        this.setState = ({
            name: data[0].name,
            startingdate: data[0].startingdate,
            finishingdate: data[0].finishingdate,
            location: data[0].location,
            price: data[0].price,
            style: data[0].style,
            imageUrl: data[0].imageUrl,
            homepage: data[0].homepage,
            description: data[0].description
        })

    }

    render() {
        // if (Object.keys(this.state).length === 0 && this.state.constructor === Object) {
        //     return
        // }
        if (!this.state) {
            return
        }
        return (
            // <div>
            //     <div>
            //         Festival <h2>{this.state.name}</h2>
            //         <p>from {this.state.startingdate} to {this.state.finishingdate}</p>
            //     </div >
            // </div>
            <div className="festival-page">
                <div className="selected-festival-container">
                    <h3>Fusion Festival</h3>
                    <div className="festival-content">
                        <h2>Location: Berlin</h2>
                        <h3>Dates: 30.06 - 04.07.2021</h3>
                        <p>Price: 120 eur</p>
                        <p>Program: Music, Theater, Workshops, and much more... </p>
                        <p>Description: The best independent festival!!</p>
                    </div>
                </div>
                <FaBeer
                />
                <FaCarAlt />

                {/* <ReactWeather
                    forecast="5days"
                    apikey="b74c34775e1a7ccb972c3eb120e57e32"
                    type="city"
                    city="Berlin" /> */}
            </div>
        )

    }

}

export default Festival;