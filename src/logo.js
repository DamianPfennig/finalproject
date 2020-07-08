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
                <img className="logo-image" src="_rakete.png" />

            </div>
        );
    }
}

export default Logo;