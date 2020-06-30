import React, { Component } from 'react';
import axios from 'axios';
import FriendButton from './friendButton';

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        //console.log('otherProfile')
        let url = this.props.match.params.id
        // this.setState({
        //     url: url
        // })
        //console.log('url in otherprofile:', url)
        axios.get(`/otherUser/${url}`).then(({ data }) => {
            console.log('data in otheruser', data.rows[0]);
            this.setState({
                id: data.rows[0].id,
                first: data.rows[0].first,
                last: data.rows[0].last,
                image: data.rows[0].image,
                bio: data.rows[0].bio
            })
            console.log('state in otherprofile:', this.state)
        })
    }


    render() {
        return (
            <div>
                <div className="otherProfile-container">
                    <h2>{this.state.first} {this.state.last}</h2>
                    <img src={this.state.image} alt={this.state.first} alt={this.state.last} />
                    <p>{this.state.bio}</p>

                </div>

                <FriendButton
                    id={this.state.id}
                />
            </div>


        );
    }
}

export default OtherProfile;