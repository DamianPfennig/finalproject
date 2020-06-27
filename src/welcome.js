import React from 'react';
import { HashRouter, Route } from 'react-router-dom';


import Registration from './registration';
import Login from './login';
import Reset from './reset';

export default function Welcome() {
    return (
        <div >
            <div className="welcome-title">
                <h1>Welcome to the Fusion Network</h1>
                <h3>A platform for fusionist to meet each other and exchange their experience at the Fusion Festival</h3>
                <hr></hr>
            </div>
            <div className="welcome-container">
                <HashRouter>
                    <div className="welcome-input">
                        <Route exact path='/' component={Registration} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/reset' component={Reset} />

                    </div>
                </HashRouter>
            </div>
        </div>
    )
}