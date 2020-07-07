import React, { Component } from 'react';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="logo">
                <p>The Fusion Network</p>
                {/* <img src="rakete-background-400.jpg" /> */}
                {/* <hr className="hr"></hr> */}
            </div>
        );
    }
}

export default Logo;