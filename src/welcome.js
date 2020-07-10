import React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';


export default function Welcome() {
    return (
        <BrowserRouter>

            <div className="main-section" >

                <div className="welcome-title">
                    <h1>Festi Guide</h1>
                </div>

                <div className="attendees-registration-link">
                    <Link to="/attendees-registration">Are you a festival lover? Join our Platform!</Link>
                </div>

                <div className="festival-registration-link">
                    <Link to="/festival-registration">Add your Festival to our Platform</Link>
                </div>


                <div className="welcome-festival-container">
                    <div className="welcome-festival">
                        <h1>Festival 1</h1>
                    </div>
                    <div className="welcome-festival">
                        <h1>Festival 2</h1>
                    </div>
                    <div className="welcome-festival">
                        <h1>Festival 3</h1>
                    </div>
                    <div className="welcome-festival">
                        <h1>Festival 4</h1>
                    </div>
                </div>

            </div >
        </BrowserRouter >
    )
}

