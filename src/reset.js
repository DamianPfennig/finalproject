import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
    }

    handleChange(e) {
        //console.log('e.target.value:', e.target.value);
        //console.log('e.target.name: ', e.target.name);
        this.setState({
            [e.target.name]: e.target.value
            //is asynchronous, thats why the callback function bellow
        }, () => console.log('this.state: ', this.state));
    }

    submit() {
        console.log('submit in reset');
        axios.post('/reset/start', this.state).then(({ data }) => {
            console.log('data from server after reset: ', data);
            if (data.success) {
                this.setState({
                    step: 2
                });
                console.log('this.state.step:', this.state.step)
            } else if (data.length == 0) {
                console.log('something went wrong in reset')
                //div pop-up 'something went wrong'
                this.setState({
                    error: true
                });
            }

        }).catch(err => console.log('error inserting secretCode', err));
    }

    submitVerify() {
        axios.post('/reset/verify', this.state).then(({ data }) => {
            console.log('verifying code');
            if (data.success) {
                console.log('step: 3')
                this.setState({
                    step: 3
                });
            } else {
                this.setState({
                    error: true
                });
            }

        })

    }



    getCurrentDisplay() {
        const step = this.state.step;
        if (step === 1) {
            return (
                <div className="reset-step1" >
                    <h3>Please write your email adress</h3>
                    {this.state.error && <div className="reset-error">Oops something went wrong! Is it a valid email? Please try again</div>}
                    <br></br>
                    {/* <label for="email">Email</label> */}
                    <input name="email" placeholder="Enter Email" type="email" spellCheck="false" onChange={e => this.handleChange(e)} required />
                    <p>We will send you an email with a code</p>
                    <button className="btn-reset" onClick={() => this.submit()}>Send</button>
                </div>
            )
        } else if (step === 2) {
            return (
                <div className="reset-step2">
                    {this.state.error && <div>Oops something went wrong! Please try again</div>}
                    <p>Please enter your code</p>
                    <input name="code" key="code" placeholder="Enter Code" spellCheck="false" onChange={e => this.handleChange(e)} />
                    <p>Please enter your new password</p>
                    <input name="password" placeholder="password" type="password" spellCheck="false" onChange={e => this.handleChange(e)} />
                    <button onClick={() => this.submitVerify()}>Send</button>
                </div>
            )
        } else if (step === 3) {
            return (
                <div className="reset-step3">
                    <h3>Password changed</h3>
                    <p>You can now <Link to="/login">log-in</Link> with your new password</p>
                </div>
            )

        }

    }



    render() {
        return (
            <div className="reset-container">
                {this.getCurrentDisplay()}
            </div >
        );
    }
}

export default Reset;



// getCurrentDisplay(){
//     const step= this.state.step;
//     if (step===1){
//         return (
//             div---show first display
//         )
//     } else if(step===2) {

//     }

// }