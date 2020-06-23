import React from 'react';
import { HashRouter, Route } from 'react-router-dom';


import Registration from './registration';
import Login from './login';
import Reset from './reset';

export default function Welcome() {
    return (
        <div>
            <h1>Welcome to My Social Network</h1>
            <HashRouter>
                <div>
                    <Route exact path='/' component={Registration} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/reset' component={Reset} />

                </div>
            </HashRouter>
        </div>
    )
}