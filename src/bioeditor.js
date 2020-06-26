import React, { Component } from 'react';
import axios from './axios';

class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaIsVisible: false
        }
        this.inputBio = this.inputBio.bind(this);
        //this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        this.setState({})
        console.log('props in inputBio: ', this.props.bio)
        axios.get('/isBio', this.state).then(({ data }) => {

        })
        // if (this.state.bio) {
        //     this.setState({
        //         textBio: true
        //     })
        // } else {
        //     this.setState({
        //         textBio: false
        //     })
        // }
    }

    toggleTextarea() {
        this.setState({
            textAreaIsVisible: !this.state.textAreaIsVisible
        })
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
                textAreaIsVisible: !this.state.textAreaIsVisible
            })
        }).catch(err => console.log('error ', err))
    }

    render() {
        // if (!this.props.bio) {
        //     return;
        // }
        return (
            <div className="bioEditor">

                <h1>{this.props.first} {this.props.last}</h1>
                {
                    this.props.bio ?
                        <p onClick={() => this.toggleTextarea()}>Edit your bio</p>

                        :
                        <p onClick={() => this.toggleTextarea()}>Add your bio</p>
                }

                {
                    this.state.textAreaIsVisible ?
                        <div className="textarea">
                            <textarea id="bioediting" name="biotext" rows="20" cols="50" onChange={this.inputBio}></textarea>
                            <button onClick={() => this.saveBio()}>Save</button>
                        </div>
                        : null
                }



                <p>{this.props.bio}</p>




            </div>

        );
    }
}

export default BioEditor;