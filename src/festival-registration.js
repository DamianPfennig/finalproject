import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


export default function FestivalRegistration() {

    return (
        <div className="festival-registration-container">
            <h2>Please fill out the registration form</h2>
            {this.state.error && <div className="registration-error">Oops something went wrong!</div>}
            <div className="festival-registration">

                <input id="first" name="name" placeholder="Name of Festival" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                <input id="last" name="dates" placeholder="Dates" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                <input id="email" name="location" placeholder="Location" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                <input id="price" name="price" placeholder="Price" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                <input id="style" name="style" placeholder="Style" type="password" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                <input id="description" name="description" placeholder="Description" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />

                <button className="btn-festival-registration" onClick={() => this.submit()}>Register</button>
            </div>
            <br></br>
            <p>Are you already registered?</p>
            <Link to="/login">Login</Link>
        </div>

        //short for Fragments---doesn't add another div
        // <>
        //     <h1>I am Registration!!!</h1>
        // </>
    );
}
