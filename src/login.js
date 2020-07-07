import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';



// import { useStatefulFields } from "./hooks/useStatefulFields";
// import { useSubmit } from "./hooks/useSubmit"

// function Login() {
//     const [values, handleChange] = useStatefulFields();
//     const [error, handleClick] = useSubmit('/login', values);
//     return (
//         <div>
//             {error && <p>something went wrong</p>}
//             <input name="email" onChange={handleChange}></input>
//             <input name="password" onChange={handleChange}></input>
//             <button onClick={handleClick}>Submit</button>
//         </div>
//     )
// }



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
        //get this.state info and send it to server with axios
        axios.post('/login', this.state).then(({ data }) => {
            console.log('data from server: ', data.success);
            if (data.length == 0) {
                //div pop-up 'something went wrong'
                console.log('login went wrong');
                this.setState({
                    emailError: true
                });
            }
            if (data.success) {
                //log user into app
                //location.replace('/logo')
                console.log('data from server: ', data);
                console.log('login succeed!!');
                location.replace('/');
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
            <div className="login-container">
                <h2>Login</h2>
                <div className="login-input">

                    {/* <label htmlFor="email">Email</label> */}
                    {this.state.emailError && <div className="login-email-error">Oops, something went wrong with your email. Please, try again. Are you registered?</div>}
                    <input name="email" placeholder="Enter Email" type="email" spellCheck="false" onChange={e => this.handleChange(e)} onClick={() => this.errorMessage()} />

                    {/* <label htmlFor="password">Password</label> */}
                    {this.state.error && <div className="login-password-error">Wrong password. Please, try again.</div>}
                    <input name="password" placeholder="Enter Password" type="password" spellCheck="false" onChange={e => this.handleChange(e)} onClick={() => this.errorMessage()} />

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