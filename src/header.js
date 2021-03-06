import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/home">
                    <li>Home</li>
                </Link>
                <Link to="/organizer-registration">
                    {/* <Link to="/festival-registration"> */}
                    <li>Register your Festival</li>
                </Link>
                {/* <Link to="/login">
                    <li>Log-in</li>
                </Link>*/}
                <Link to="/attendees-registration">
                    {/* <Link to="/festival-registration"> */}
                    <li>Enter Attendees Site</li>
                </Link>

                <a className="link-log-out" href="/log-out">
                    <li>Log-out</li>
                </a>
            </ul>
        </nav >

    )


}