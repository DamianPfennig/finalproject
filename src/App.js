import React, { Component } from 'react';
import ProfilePic from './profilepic';
import Uploader from './uploader';
import Logo from './logo';
import axios from './axios';
import Profile from './profile';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import OtherProfile from './otherprofile';
import Users from './users';
import Friends from './friends';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // first: '',
            // last: '',
            // imageUrl: '',
            uploaderIsVisible: false

        }
        this.closeModal = this.closeModal.bind(this);
        this.methodGetUrl = this.methodGetUrl.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        //console.log('mounted')
        //axios to get info about log in user(first, last, pic)...axios /user...and add to component setState...so we can pass info to another component in App

        axios.get('/user', this.state).then(({ data }) => {
            //console.log('getting data from user:::', data)
            this.setState({
                first: data.first,
                last: data.last,
                id: data.id,
                imageUrl: data.image,
                bio: data.bio
            });
            //console.log(' this.state: ', this.state)
        })
    }

    toggleModal() {
        //console.log('togglemodal is running')
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        })
    }

    closeModal() {
        //console.log('close modal')
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        })
    }

    methodGetUrl(url) {
        //console.log('url in App:', url);
        this.setState({
            imageUrl: url
        })
        //console.log('imageUrl in App:', this.state.imageUrl)
        //console.log('this.state::', this.state)

        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        })
    }

    updateBio(bio) {
        this.setState({
            bio: bio
        })
    }



    // methodInApp(arg) {
    //     console.log('uploaded image in App', arg)

    // }

    render() {

        return (
            <BrowserRouter>

                <div className="header">
                    <Logo />

                    <Link className="link-users" to="/users">Find Users</Link>

                    <Link className="link-friends" to="/friends">Friends</Link>


                    <ProfilePic
                        id={this.state.id}
                        imageUrl={this.state.imageUrl}
                        first={this.state.first}
                        last={this.state.last}
                        toggleModal={this.toggleModal}
                    />


                    {/*<h2 onClick={() => this.toggleModal()}>Make visible</h2>*/}

                    {this.state.uploaderIsVisible && <Uploader
                        methodGetUrl={this.methodGetUrl}
                        closeModal={this.closeModal}
                    />}
                </div>


                <div>
                    <Route exact path="/" render={() => (

                        <Profile
                            id={this.state.id}
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.imageUrl}
                            bio={this.state.bio}
                            toggleModal={this.toggleModal}
                            updateBio={this.updateBio}
                        //clickHandler={img => this.setState({ img })}
                        //changeBio={bio => this.setState({ bio })}
                        />
                    )} />

                    <Route exact path="/user/:id" component={OtherProfile} />
                    {/* <Link to="/user/5"></Link> */}


                    <Route exact path="/users" component={Users} />

                    <Route exact path="/friends" component={Friends} />

                </div>

            </BrowserRouter>

        );
    }
}

export default App;

// Route path = "/"----->
// clickHandler={img => this.setState({ img })}
// changeBio={bio => this.setState({ bio })}