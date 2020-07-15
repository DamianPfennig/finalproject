import React, { Component } from 'react';

class Stars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaIsVisible: false,
            buttonVisible: true
        }
    }
    render() {
        // let rows = []
        // for (let i = 0; i < 4; i++) {
        //     rows.push();
        //     return rows;
        // }
        return (
            <div><i className="fa fa-star checked fa-lg"></i></div>
        )


    }
}

export default Stars;