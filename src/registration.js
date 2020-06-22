import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange(e) {
        console.log('e.target.value:', e.target.value);
        console.log('e.target.name: ', e.target.name);
        this.setState({
            [e.target.name]: e.target.value
            //is asynchronous, thats why the callback function bellow
        }, () => console.log('this.state: ', this.state));
    }

    submit() {
        console.log('about to submit!!!!')
        //get this.state info and send it to server with axios
        axios.post('/register', this.state).then(({ data }) => {
            console.log('data from server: ', data)
            if (data.success) {
                //log user into app
                location.replace('/')
            } else {
                //div pop-up 'something went wrong'
                this.setState({
                    error: true
                });
            }
        }).catch(err => console.log('error ', err))
    }


    render() {
        return (
            <div className="registration">
                <h1>I am Registration!!!</h1>
                {this.state.error && <div>Oops something went wrong!</div>}
                <input name="first" placeholder="first" onChange={e => this.handleChange(e)} />
                <input name="last" placeholder="last" onChange={e => this.handleChange(e)} />
                <input name="email" placeholder="email" type="email" onChange={e => this.handleChange(e)} />
                <input name="password" placeholder="password" type="password" onChange={e => this.handleChange(e)} />
                <button onClick={() => this.submit()}>Register</button>
            </div>
            //short for Fragments---doesn't add another div
            // <>
            //     <h1>I am Registration!!!</h1>
            // </>
        );
    }
}

export default Registration;