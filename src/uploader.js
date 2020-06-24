import React, { Component } from 'react';
import axios from './axios';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        console.log('props in Uploader', props)
    }

    componentDidMount() {
        console.log('Uploader mounted')
    }

    methodInUploader() {
        //axios getting pic form user
        console.log('running method in uploader');
        this.props.methodInApp('yeah');
    }

    closeModalInUploader() {
        this.props.closeModal();
        console.log('close the modal!!')
    }

    uploadImage() {
        console.log('upload image running')
        var formData = new FormData();
        formData.append('file', this.file);
    }

    render() {
        return (
            <div>
                <div className="modal">
                    <p onClick={() => this.closeModalInUploader()}>X</p>
                    <h2>
                        Want to change or upload your image?
                    </h2>
                    <input type="file" id="image" name="image" accept="image/*" onClick={() => this.uploadImage()}></input>
                    <h2 onClick={() => this.methodInUploader()}>
                        Click here to run method in uploader
                    </h2>
                </div>
            </div>
        );
    }
}

export default Uploader;