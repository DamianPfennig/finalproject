import React from 'react';
import { HashRouter, Route } from 'react-router-dom';


import Registration from './registration';
import Login from './login';
import Reset from './reset';

export default function Welcome() {
    return (
        <div >
            <div className="welcome-title">
                <h1>Welcome to </h1>
                {/* <p className="welcome-logo">the Fusion Network</p> */}
                <div className="welcome-logo">
                    <div className="welcome-logo-letters">
                        <p className="one">The Fusion</p>
                        <p className="two">Network</p>
                    </div>
                    <img className="welcome-logo-image" src="just_rakete.png" />


                    {/* <img src="rakete-background-400.jpg" /> */}
                    {/* <hr className="hr"></hr> */}
                </div>
                <h3>A platform for fusionist to meet each other and exchange their experience at the Fusion Festival</h3>
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