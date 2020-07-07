import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange(e) {
        //console.log('e.target.value:', e.target.value);
        //console.log('e.target.name: ', e.target.name);
        this.setState({
            [e.target.name]: e.target.value
            //is asynchronous, thats why the callback function bellow
        }, () => console.log('this.state: ', this.state));
    }

    submit() {
        console.log('about to submit!!!!')
        //get this.state info and send it to server with axios
        axios.post('/register', this.state).then(({ data }) => {
            console.log('data from server: ', data.success)
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
            <div className="registration-container">
                <h2>Please fill out the registration form</h2>
                {this.state.error && <div className="registration-error">Oops something went wrong!</div>}
                <div className="registration">
                    {/* <label htmlFor="first">First Name</label> */}
                    <input id="first" name="first" placeholder="Enter First Name" spellCheck="false" onChange={e => this.handleChange(e)} />
                    {/* <label htmlFor="last">Last Name</label> */}
                    <input id="last" name="last" placeholder="Enter Last Name" spellCheck="false" onChange={e => this.handleChange(e)} />
                    {/* <label htmlFor="email">Email</label> */}
                    <input id="email" name="email" placeholder="Enter Email" type="email" spellCheck="false" onChange={e => this.handleChange(e)} />
                    {/* <label htmlFor="password">Password</label> */}
                    <input id="password" name="password" placeholder="Enter Password" type="password" spellCheck="false" onChange={e => this.handleChange(e)} />

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

export default Registration;