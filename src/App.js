import React, { Component } from 'react';
import ProfilePic from './presentation';
import Uploader from './uploader';
import Logo from './logo';
import axios from './axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //first: 'Damian',
            //last: 'Pfennig',
            // defaultImage: 
            uploaderIsVisible: false
        }
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        console.log('mounted')
        //axios to get info about log in user(first, last, pic)...axios /user...and add to component setState...so we can pass info to another component in App

        axios.get('/user', this.state).then(({ data }) => {
            console.log('getting data from user', data)
            this.setState({
                first: data.first,
                last: data.last,
                id: data.id,
                image: data.image
            });
            console.log(' this.state: ', this.state)
        })
    }

    toggleModal() {
        console.log('togglemodal is running')
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        })
    }

    closeModal() {
        console.log('close modal')
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        })
    }

    methodInApp(arg) {
        console.log('uploaded image in App', arg)

    }

    render() {
        return (
            <div>
                <div>
                    <Logo />
                </div>
                <div onClick={() => this.toggleModal()}>
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        image={this.state.image}
                    />
                </div>


                {/*<h2 onClick={() => this.toggleModal()}>Make visible</h2>*/}

                {this.state.uploaderIsVisible && <Uploader
                    methodInApp={this.methodInApp}
                    closeModal={this.closeModal}
                />}
            </div>

        );
    }
}

export default App;