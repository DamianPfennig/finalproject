import React, { Component } from 'react';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="logo">
                <div className="logo-letters">
                    <p className="one">The Fusion</p>
                    <p className="two">Network</p>
                </div>
                <img className="logo-image" src="just_rakete.png" />

            </div>
        );
    }
}

export default Logo;