import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/welcome">
                    <li>Home</li>
                </Link>
                <Link to="/login">
                    <li>Log-in</li>
                </Link>
            </ul>
        </nav>

    )


}