import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import FestivalRegistration from './festival-registration';
import AttendeesRegistration from './attendees-registration';


export default function Welcome() {
    return (
        <BrowserRouter>

            <div className="main-section" >
                <div className="welcome-container">
                    <div className="welcome-title">
                        <h1>Festi Guide</h1>
                    </div>

                    <div className="attendees-registration-link">
                        <Link to="/attendees-registration">Are you a festival lover? Join our Platform!</Link>
                    </div>

                    <div className="festival-registration-link">
                        <Link to="/festival-registration">Add your Festival to our Platform</Link>
                    </div>

                    <div>
                        <Link to="/home">Enter as a visitor</Link>
                    </div>
                </div>

                <Route exact path='/festival-registration' component={FestivalRegistration} />
                <Route exact path='/attendees-registration' component={AttendeesRegistration} />

            </div >
        </BrowserRouter >
    )
}

