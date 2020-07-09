import React, { Component } from 'react';
import axios from './axios';

class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaIsVisible: false,
            buttonVisible: true
        }
        this.inputBio = this.inputBio.bind(this);
        //this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        this.setState({})
        console.log('props in inputBio: ', this.props.bio)
    }

    toggleTextarea() {
        this.setState({
            textAreaIsVisible: !this.state.textAreaIsVisible,
            buttonVisible: !this.state.buttonVisible

        })

    }

    handleCancel() {
        this.setState({
            textAreaIsVisible: !this.state.textAreaIsVisible,
            buttonVisible: !this.state.buttonVisible,
        });
        axios.get('/getBio').then(({ data }) => {
            console.log('data from server: ', data)
            this.props.updateBio(data.bio);
        }).catch(err => console.log('error ', err))
    }

    inputBio(e) {
        console.log('event in inputBio: ', e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log('this.state in inputBio: ', this.state));
        this.props.updateBio(e.target.value);
    }

    saveBio(event) {
        console.log(event)
        axios.post('/bioediting', this.state).then(({ data }) => {
            console.log('data from server: ', data)
            this.setState({
                bio: data.bio
            })
            // if (data.success) {
            //     //log user into app
            //     location.replace('/')
            // } else {
            //     //div pop-up 'something went wrong'
            //     this.setState({
            //         error: true
            //     });
            // }
            this.setState({
                textAreaIsVisible: !this.state.textAreaIsVisible,
                buttonVisible: !this.state.buttonVisible,
            })
        }).catch(err => console.log('error ', err))
    }

    render() {
        // if (!this.state.bio) {
        //     return null;
        // }
        return (
            <div className="bioEditor">

                <h2>{this.props.first} {this.props.last}</h2>

                {
                    this.state.textAreaIsVisible ?
                        <div className="textarea">
                            <button className="btn-bio-save" onClick={() => this.saveBio()}>Save</button>
                            <button className="btn-bio-cancel" onClick={() => this.handleCancel()}> Cancel</button>
                            <textarea id="bioediting" name="biotext" spellCheck="false" rows="12" cols="55" wrap="hard" onChange={this.inputBio} value={this.props.bio}></textarea>

                        </div>
                        :
                        <p>{this.props.bio}</p>
                }

                {/* {
                    this.state.buttonVisible ?
                        <button className="btn-bio" onClick={() => this.toggleTextarea()}>Edit your Bio</button>
                        :
                        null
                } */}
                {
                    this.props.bio ?
                        <button className="btn-bio" onClick={() => this.toggleTextarea()}>Edit your Bio</button>
                        :

                        <button className="btn-bio" onClick={() => this.toggleTextarea()}>Add your Bio</button>
                }





            </div >

        );
    }
}

export default BioEditor;


//in componentdidmount
        // axios.get('/isBio', this.state).then(({ data }) => {

        // })
        // if (this.state.bio) {
        //     this.setState({
        //         textBio: true
        //     })
        // } else {
        //     this.setState({
        //         textBio: false
        //     })
        // }