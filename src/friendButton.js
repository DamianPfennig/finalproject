import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function FriendButton({ id }) {
    //const [url, setUrl] = useState(id);
    const [buttonText, setButtonText] = useState();
    useEffect(() => {
        setButtonText('Make Friend Request');
        console.log('id in friendButton: ', id);
        axios.get(`/initial-friendship-status/${id}`).then(({ data }) => {
            console.log('data from initial-friendship-status: ', data)
        }).catch(err => {
            console.log('error in get /friendship ', err)
        })
    }, []);

    return (
        <div>
            <h1>FriendButton</h1>
            <button>{buttonText}</button>
            <p>{id}</p>
        </div>
    )
}