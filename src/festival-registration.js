import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


class FestivalRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            selectedImage: false

        }
        this.selectedImage = this.selectedImage.bind(this);
        //this.submitImage = this.submitImage.bind(this);
    }

    handleChange(e) {
        // console.log('e.target: ', e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    selectedImage(event) {
        console.log('event:::::.', event.target.files[0])
        this.setState({
            file: event.target.files[0],
            imageName: event.target.files[0].imageName,
            selectedImage: true
        })
        //console.log('upload image running')
    }

    submitImage() {
        var formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('imageName', this.state.imageName);
        console.log('submit')
        axios.post('/uploadImage', formData).then(({ data }) => {
            console.log('upload image: ', data)
        }).catch(function (err) {
            console.log('err in POST', err)
        })
    }




    handleClick() {
        var formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('imageName', this.state.imageName);
        formData.append('name', this.state.name);
        formData.append('homepage', this.state.homepage);
        formData.append('startingDate', this.state.startingDate);
        formData.append('finishingDate', this.state.finishingDate);
        formData.append('location', this.state.location);
        formData.append('country', this.state.country);
        formData.append('price', this.state.price);
        formData.append('style', this.state.style);
        formData.append('confirmed_artists', this.state.confirmed_artists);
        formData.append('description', this.state.description);
        console.log('this.state in handleClick: ', this.state)
        axios.post('/festival-registration', formData).then(({ data }) => {
            console.log('data from server: ', data)
            if (data.length != 0) {
                //log user into app
                location.replace('/home')
            } else {
                //div pop-up 'something went wrong'
                this.setState({
                    error: true
                });
            }
        }).catch(err => console.log('error ', err))
    }


    render() {
        return (
            <div className="festival-registration-container">
                <h2>Give us some information about your Festival</h2>
                {this.state.error && <div className="registration-error">Oops something went wrong!</div>}
                <div className="festival-registration">
                    {/* onChange={e => this.handleChange(e)} */}

                    {/* <input type="file" id="url" className="upload-image" name="url" accept="image/*" multiple onChange={() => this.selectedImage(event)} />

                    <button className="btn-submit-image" onClick={() => this.submitImage()}>Upload Image</button>
                    <br></br> */}

                    {/* <input id="email" name="email" placeholder="Enter Email" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input id="password" name="password" placeholder="Enter Password" type="password" spellCheck="false" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <br></br> */}
                    <input id="name" name="name" placeholder="Name of the Festival" spellCheck="false" onChange={e => this.handleChange(e)} />

                    <input id="homepage" name="homepage" placeholder="Homepage " spellCheck="false" onChange={e => this.handleChange(e)} />

                    <input id="startingDate" name="startingDate" placeholder="Starting Day ('YYYY-MM-DD')" spellCheck="false" onChange={e => this.handleChange(e)} />

                    <input id="finishingDate" name="finishingDate" placeholder="Finishing Day ('YYYY-MM-DD')" spellCheck="false" onChange={e => this.handleChange(e)} />

                    <input id="location" name="location" placeholder="Location" spellCheck="false" onChange={e => this.handleChange(e)} />

                    <input id="country" name="country" placeholder="Country" spellCheck="false" onChange={e => this.handleChange(e)} />

                    <input id="price" name="price" placeholder="Price" spellCheck="false" onChange={e => this.handleChange(e)} />

                    <input id="style" name="style" placeholder="Style" spellCheck="false" onChange={e => this.handleChange(e)} />

                    <input id="confirmed_artists" name="confirmed_artists" placeholder="Confirmed Artists" spellCheck="false" onChange={e => this.handleChange(e)} />
                    <p>Select an image</p>
                    <input type="file" id="url" className="upload-image" name="url" accept="image/*" multiple onChange={() => this.selectedImage(event)} />
                    {/* {
                        this.state.selectedImage ?
                            <label className="image-label" htmlFor="file">{this.state.name}</label>

                            :
                            <label className="image-label" htmlFor="file">Choose an image</label>
                    } */}

                    <br></br>
                    <textarea id="description" name="description" placeholder="Write some lines describing your festival" spellCheck="false" rows="12" cols="55" wrap="hard" onChange={e => this.handleChange(e)}></textarea>

                    <button className="btn-festival-registration" onClick={() => this.handleClick()}>Register Festival</button>

                </div>
                <br></br>
                {/* <p>Are you already registered?</p>
                <Link to="/login">Login</Link> */}
            </div>


            //short for Fragments---doesn't add another div
            // <>
            //     <h1>I am Registration!!!</h1>
            // </>
        );
    }
}

export default FestivalRegistration;
