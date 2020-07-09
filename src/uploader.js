import React, { Component } from 'react';
import axios from './axios';



class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            file: null,
            selectedImage: false

        }

        this.selectedImage = this.selectedImage.bind(this);
        console.log('props in Uploader', props)
    }

    componentDidMount() {
        console.log('Uploader mounted')
    }

    closeModalInUploader() {
        this.props.closeModal();
        console.log('close the modal in uploader')
    }

    selectedImage(event) {
        console.log('event:::::.', event.target.files[0])
        this.setState({
            //[event.target.name]: event.target.value
            file: event.target.files[0],
            name: event.target.files[0].name,
            selectedImage: true
        }, () => console.log('this.state uploading image: ', this.state));
        //console.log('upload image running')
        // console.log('event:::::.', event.target.files[0])
        // var file = event.target.files[0];
        // this.setState({ file });
        // console.log('this.state: ', this.state);
    }

    uploadImage() {

        //axios getting pic form user
        // console.log('running method in uploader');
        // this.props.methodInApp(this.state.file);

        var formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('name', this.state.name);
        console.log('---------->', this.state)

        // axios.get('/oldImage').then(({ data }) => {
        //     console.log('data:::', data)
        //     if (data.success == true) {
        axios.post('/upload', formData).then(({ data }) => {
            //console.log('resp from Post/upload---url:::', data.image)
            this.props.methodGetUrl(data.image);
        }).catch(function (err) {
            console.log('err in POST', err)
        })
    }
    //     }).catch(err => {
    //         console.log('err in oldImage: ', err);
    //     })

    // }

    render() {
        return (
            <div className="test">
                <div className="modal-background">
                    <div className="modal">
                        <p onClick={() => this.closeModalInUploader()}>X</p>
                        <div className="modal-info">
                            <h3>
                                Change or upload your image?
                            </h3>
                            <div className="modal-input">
                                <input type="file" id="file" className="upload-image" name="file" accept="image/*" onChange={this.selectedImage} />
                                {
                                    this.state.selectedImage ?
                                        <label htmlFor="file">{this.state.name}</label>

                                        :
                                        <label htmlFor="file">Choose an image</label>
                                }
                            </div>
                            <div className="modal-upload-button">
                                <button onClick={() => this.uploadImage()}>Upload</button>
                            </div>
                            {/* <h2 onClick={() => this.methodInUploader()}>
                            Click here to run method in uploader
                        </h2> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Uploader;
//onClick={() => this.uploadImage()}