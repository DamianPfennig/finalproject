import React, { useState, useEffect } from 'react';
import axios from './axios';



export default function FriendButton({ url }) {
    //const [newUrl, setNewUrl] = useState(url);
    const [buttonText, setButtonText] = useState();
    useEffect(() => {
        console.log('mounting')
        //console.log('window.location.pathname ', window.location.pathname);
        console.log('url in friendButton: ', url);
        if (url) {
            axios.get(`/initial-friendship-status/${url}`).then(({ data }) => {
                console.log('data from initial-friendship-status: ', data[0]);
                if (data.length == 0) {
                    setButtonText('Make Friendship Request');
                } else if (data[0].accepted == false) {
                    if (data[0].receiver_id == url) {
                        setButtonText('Cancel Friendship Request');
                    } else {
                        setButtonText('Accept Friendship Request');
                    }
                } else if (data[0].accepted == true) {
                    setButtonText('End Friendship');
                }
            }).catch(err => {
                console.log('error in get /initial-friendship-status ', err);
            })
        }
    }, [url]);

    const handleClick = e => {
        //console.log('click in friendship');
        //console.log('value::', e.target.name)
        if (e.target.name == 'Make Friendship Request') {
            setButtonText('Cancel Friendship Request');
            axios.post(`/make-friend-request/${url}`).then(({ data }) => {
                console.log('data in /make-friend-request: ', data);
            }).catch(err => {
                console.log('error in /make-friend-request ', err);
            });
        } else if (e.target.name == 'Accept Friendship Request') {
            setButtonText('End Friendship');
            axios.post(`/accept-friend-request/${url}`).then(({ data }) => {
                console.log('data in /accept-friend-request: ', data);
            }).catch(err => {
                console.log('error in /accept-friend-request ', err);
            });
        } else if (e.target.name == 'End Friendship' || e.target.name == 'Cancel Friendship Request') {
            setButtonText('Make Friendship Request');
            axios.post(`/end-friendship/${url}`).then(({ data }) => {
                console.log('data in /end-friendship: ', data);
            }).catch(err => {
                console.log('error in /end-friendship ', err);
            });
        };


    }



    return (
        <div>

            <button name={buttonText} className="friend-button" onClick={handleClick}>{buttonText}</button>


        </div>
    )
}