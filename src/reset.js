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
            } else {
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
                <div >
                    <h1>Please write your email adress</h1>
                    {this.state.error && <div>Oops something went wrong! Please try again</div>}
                    <input name="email" placeholder="email" type="email" onChange={e => this.handleChange(e)} />
                    <button onClick={() => this.submit()}>Send</button>
                </div>
            )
        } else if (step === 2) {
            return (
                <div>
                    {this.state.error && <div>Oops something went wrong! Please try again</div>}
                    <p>Please enter your code</p>
                    <input name="code" key="code" placeholder="code" onChange={e => this.handleChange(e)} />
                    <p>Please enter your new password</p>
                    <input name="password" placeholder="password" type="password" onChange={e => this.handleChange(e)} />
                    <button onClick={() => this.submitVerify()}>Send</button>
                </div>
            )
        } else if (step === 3) {
            return (
                <div>
                    <h3>Password changed</h3>
                    <Link to="/login">Login</Link>
                </div>
            )

        }

    }



    render() {
        return (
            <div>
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