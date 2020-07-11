import React, { Component } from 'react';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import axios from './axios';

import Welcome from './welcome';
import FestivalRegistration from './festival-registration';
import AttendeesRegistration from './attendees-registration';
import Login from './login';
import Header from './header';
import Home from './home';
import Festival from './festival';



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
                    {/* <Welcome /> */}
                    {/* <Home /> */}
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


                    <Route exact path="/home" component={Home} />
                    <Route exact path="/festival/:id" component={Festival} />

                    <Route exact path='/festival-registration' component={FestivalRegistration} />
                    <Route exact path='/atendees-registration' component={AttendeesRegistration} />
                    <Route exact path='/login' component={Login} />



                </div>
            </BrowserRouter>
        )
    }
}


export default App;


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