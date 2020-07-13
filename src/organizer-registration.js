import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

class OrganizerRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log('this.state: ', this.state));
    }

    submit() {
        console.log('about to submit!!!!')
        axios.post('/organizer', this.state).then(({ data }) => {
            console.log('data from server: ', data.success)
            if (data.success) {
                location.replace('/festival-registration')
            } else {
                this.setState({
                    error: true
                });
            }
        }).catch(err => console.log('error ', err))
    }


    render() {
        return (
            <div className="registration-container">
                <h2>Please enter Email and Password</h2>
                {this.state.error && <div className="registration-error">Oops something went wrong!</div>}
                <div className="registration">
                    <input id="email" name="email" placeholder="Enter Email" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input id="password" name="password" placeholder="Enter Password" type="password" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <button className="btn-registration" onClick={() => this.submit()}>Register</button>
                </div>
                <br></br>
                <p>Are you already registered?</p>
                <Link to="/login">Login</Link>
            </div>

            //short for Fragments---doesn't add another div
            // <>
            //     <h1>I am Registration!!!</h1>
            // </>
        );
    }
}

export default OrganizerRegistration;