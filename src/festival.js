import React, { Component } from 'react';
import axios from './axios';

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
            <div>

                <div>
                    Festival <h2>{this.state.name}</h2>
                    <p>from {this.state.startingdate} to {this.state.finishingdate}</p>
                </div >
            </div>
        )

    }

}

export default Festival;