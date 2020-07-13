import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log('this.state in loggedIn: ', this.state));
    }

    errorMessage() {
        this.setState({
            error: false,
            emailError: false
        })
    }

    submit() {
        console.log('about to submit!!!!')
        console.log(this.state)
        axios.post('/login', this.state).then(({ data }) => {
            console.log('data from server: ', data.success);
            if (data.length == 0) {
                console.log('login went wrong');
                this.setState({
                    emailError: true
                });
            }
            if (data.success) {
                console.log('data from server: ', data);
                console.log('login succeed!!');
                location.replace('/festival-registration');
            } else {
                console.log('login went wrong');
                this.setState({
                    error: true
                });
            }
        }).catch(err => console.log('error ', err))
    }


    render() {
        return (
            <div className="login-container">
                <h2>Login</h2>
                <div className="login-input">
                    {this.state.emailError && <div className="login-email-error">Oops, something went wrong with your email. Please, try again. Are you registered?</div>}
                    <input name="email" placeholder="Enter Email" type="email" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} onClick={() => this.errorMessage()} />
                    {this.state.error && <div className="login-password-error">Wrong password. Please, try again.</div>}
                    <input name="password" placeholder="Enter Password" type="password" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} onClick={() => this.errorMessage()} />

                    <button className="btn-login" onClick={() => this.submit()}>Login</button>

                </div>
                <div className="forgot-reset">
                    <p>Forgot your password?</p>
                    <Link to="/reset">Reset your password</Link>
                </div>

            </div>
        );
    }
}

export default Login;








// export default function Login() {
//     return (

//         <div className="login-container">

//             <h2>Login</h2>
//             <div className="login-input">
//                 <input name="email" placeholder="Enter Email" type="email" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} onClick={() => this.errorMessage()} />
//                 <input name="password" placeholder="Enter Password" type="password" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} onClick={() => this.errorMessage()} />
//                 <button className="btn-login" onClick={() => this.submit()}>Login</button>
//             </div>

//             <div className="forgot-reset">
//                 <p>Forgot your password?</p>
//                 <Link to="/reset">Reset your password</Link>
//             </div>

//         </div>

//     )
// }

