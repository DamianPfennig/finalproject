import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

class Login extends Component {
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
        axios.post('/login', this.state).then(({ data }) => {
            console.log('data from server: ', data.success);
            if (data.success) {
                //log user into app
                //location.replace('/logo')
                console.log('data from server: ', data);
                console.log('login succeed!!');
            } else {
                //div pop-up 'something went wrong'
                console.log('login went wrong');
                this.setState({
                    error: true
                });
            }
        }).catch(err => console.log('error ', err))
    }


    render() {
        return (
            <div>
                <h1>
                    Login please
                </h1>

                {this.state.error && <div>Oops something went wrong! Are you registered?</div>}
                <input name="email" placeholder="email" type="email" onChange={e => this.handleChange(e)} />
                <input name="password" placeholder="password" type="password" onChange={e => this.handleChange(e)} />
                <button onClick={() => this.submit()}>Login</button>
                <Link to="/reset">Reset your password</Link>

            </div>
        );
    }
}

export default Login;