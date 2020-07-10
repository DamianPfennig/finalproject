import React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';

import Login from './login';
import Logo from './logo';

export default function Root() {
    return (
        <div >
            <h1>ROOT</h1>

            <div className="header">
                <Logo />
                <div className="menu">
                    <Link className="link-profile" to="/">Home</Link>
                    <Link className="link-log-im" to="/login">Log-in</Link>
                </div>
            </div>

            <div className="welcome-container">
                <HashRouter>
                    <div className="welcome-input">
                        <Route exact path='/festival-registration' component={Registration} />
                        <Route exact path='/atendees-registration' component={Registration} />
                        <Route exact path='/login' component={Login} />
                    </div>
                </HashRouter>
            </div>
        </div>
    )
}