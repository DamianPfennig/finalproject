import React, { Component } from 'react';
import axios from './axios';



class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            file: null

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
            name: event.target.files[0].name
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

        axios.post('/upload', formData).then(({ data }) => {
            //console.log('resp from Post/upload---url:::', data.image)
            this.props.methodGetUrl(data.image);
        }).catch(function (err) {
            console.log('err in POST', err)
        })
    }

    render() {
        return (
            <div>
                <div className="modal-background">
                    <div className="modal">
                        <p onClick={() => this.closeModalInUploader()}>X</p>
                        <h2>
                            Want to change or upload your image?
                        </h2>
                        <input type="file" id="file" name="file" accept="image/*" onChange={this.selectedImage} />
                        <button onClick={() => this.uploadImage()}>Upload</button>
                        {/* <h2 onClick={() => this.methodInUploader()}>
                            Click here to run method in uploader
                        </h2> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Uploader;
//onClick={() => this.uploadImage()}