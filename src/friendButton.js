import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function FriendButton({ url }) {
    //const [newUrl, setNewUrl] = useState(url);
    const [buttonText, setButtonText] = useState();
    useEffect(() => {
        setButtonText('Make Friend Request');
        console.log('url in friendButton: ', url);
        axios.get(`/initial-friendship-status/${url}`).then(({ data }) => {
            console.log('data from initial-friendship-status: ', data)
        }).catch(err => {
            console.log('error in get /friendship ', err)
        })
    }, []);

    return (
        <div>
            <h1>FriendButton</h1>
            <button>{buttonText}</button>
            <p>{url}</p>
        </div>
    )
}