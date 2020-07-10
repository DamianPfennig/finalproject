import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from './axios';

import Root from './root'
import FestivalRegistration from './festival-registration';
import AttendeesRegistration from './attendees-registration';
import Login from './login';
import Header from './header';

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <Route exact path='/festival-registration' component={FestivalRegistration} />
                <Route exact path='/atendees-registration' component={AttendeesRegistration} />
                <Route exact path='/login' component={Login} />

                {/* <div className="welcome-container">
                    <HashRouter>
                        <div className="welcome-input">
                            <Route exact path='/festival-registration' component={Registration} />
                            <Route exact path='/login' component={Login} />


                        </div>
                    </HashRouter>

                </div> */}

            </div>
        </BrowserRouter>
    )
}


{/* <BrowserRouter>

    <div>
        <Root />
        <Route exact path='/festival-registration' component={FestivalRegistration} />
        <Route exact path='/atendees-registration' component={AttendeesRegistration} />
        <Route exact path='/login' component={Login} />
       

    </div>

</BrowserRouter> */}

