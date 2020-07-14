import React, { Component } from 'react';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import axios from './axios';
// import ReactWeather from 'react-open-weather';
//Optional include of the default css styles 
// import 'react-open-weather/lib/css/ReactWeather.css';

import Welcome from './welcome';
import OrganizerRegistration from './organizer-registration';
import FestivalRegistration from './festival-registration';
import AttendeesRegistration from './attendees-registration';
import Login from './login';
import Header from './header';
import Home from './home';
import Festival from './festival';
import Ratings from './ratings';
import Average from './average';

// import Weather from '../weather';
//const API_KEY



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Header />

                    <Route exact path="/home" component={Home} />
                    <Route extact path="/organizer-registration" component={OrganizerRegistration} />
                    <Route exact path="/festival/:id" component={Festival} />

                    <Route exact path='/festival-registration' component={FestivalRegistration} />
                    <Route exact path='/attendees-registration' component={AttendeesRegistration} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/ratings/:id' component={Ratings} />
                    <Route exact path='/average/:id' component={Average} />



                </div>
            </BrowserRouter>
        )
    }
}


export default App;

{/* <Welcome /> */ }
{/* <Home /> */ }
{/* <Route exact path='/home' render={() => (
                        <Home
                            id={this.state.id}
                            name={this.state.name}
                            startingDate={this.state.startingDate}
                            finishingDate={this.state.finishingDate}
                            location={this.state.location}
                            price={this.state.price}
                            style={this.state.style}
                            imageUrl={this.state.imageUrl}
                            homepage={this.state.homepage}
                            description={this.state.description}
                        />
                    )} /> */}


{/* <BrowserRouter>
    <div>
        <Root />
        <Route exact path='/festival-registration' component={FestivalRegistration} />
        <Route exact path='/atendees-registration' component={AttendeesRegistration} />
        <Route exact path='/login' component={Login} />
       
    </div>
</BrowserRouter> */}

{/* <div className="welcome-container">
                    <HashRouter>
                        <div className="welcome-input">
                            <Route exact path='/festival-registration' component={Registration} />
                            <Route exact path='/login' component={Login} />
                        </div>
                    </HashRouter>
                </div> */}