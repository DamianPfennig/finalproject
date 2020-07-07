import React, { Component } from 'react';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="logo">
                <p className="one">The Fusion</p>
                <p className="two">Network</p>
                <img className="logo-image" src="astronaut.png" />
                {/* <img src="rakete-background-400.jpg" /> */}
                {/* <hr className="hr"></hr> */}
            </div>
        );
    }
}

export default Logo;