import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default function Login() {
    return (

        <div className="login-container">

            <h2>Login</h2>
            <div className="login-input">
                <input name="email" placeholder="Enter Email" type="email" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} onClick={() => this.errorMessage()} />
                <input name="password" placeholder="Enter Password" type="password" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} onClick={() => this.errorMessage()} />
                <button className="btn-login" onClick={() => this.submit()}>Login</button>
            </div>

            <div className="forgot-reset">
                <p>Forgot your password?</p>
                <Link to="/reset">Reset your password</Link>
            </div>

        </div>

    )
}

