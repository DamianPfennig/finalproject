import React, { Component } from 'react';


class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.go = this.go.bind(this)
    }

    go() {
        this.setState(prevState => {
            return {
                count: prevState.count + 1
            }
        })
    }

    render() {
        return (
            <div>
                <center>
                    <p> {this.state.count}  <button onClick={this.go} > <i className="far fa-thumbs-up"></i> </button> </p>
                </center>
            </div>
        )
    }
}
export default Likes;
