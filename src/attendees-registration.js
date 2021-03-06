import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


class AttendeesRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }

    handleChange(e) {
        // console.log('e.target: ', e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick() {
        console.log('this.state: ', this.state)
        axios.post('/attendees-registration', this.state).then(({ data }) => {
            console.log('data from server: ', data)
            if (data.length != 0) {
                //log user into app
                location.replace('/home')
            } else {
                //div pop-up 'something went wrong'
                this.setState({
                    error: true
                });
            }
        }).catch(err => console.log('error ', err))
    }

    // submit() {
    //     console.log('about to submit!!!!')
    //     //get this.state info and send it to server with axios
    //     axios.post('/attendees-registration', this.state).then(({ data }) => {
    //         console.log('data from server: ', data)
    //         if (data.success) {
    //             //log user into app
    //             location.replace('/home')
    //         } else {
    //             //div pop-up 'something went wrong'
    //             this.setState({
    //                 error: true
    //             });
    //         }
    //     }).catch(err => console.log('error ', err))
    // }


    render() {
        return (

            <div className="attendees-registration-container">
                <h2>Please fill out the registration form</h2>
                {this.state.error && <div className="registration-error">Oops something went wrong!</div>}
                <div className="attendees-registration">
                    <input id="first" name="first" placeholder="Enter First Name" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input id="last" name="last" placeholder="Enter Last Name" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input id="email" name="email" placeholder="Enter Email" type="email" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input id="password" name="password" placeholder="Enter Password" type="password" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <button className="btn-attendees-registration" onClick={() => this.handleClick()}>Register</button>
                </div>
                <br></br>
                <div className="login-btn">
                    <p>Are you already registered?</p>
                    <Link to="/login">Login</Link>
                </div>

            </div>

            //short for Fragments---doesn't add another div
            // <>
            //     <h1>I am Registration!!!</h1>
            // </>
        );
    }
}

export default AttendeesRegistration;


