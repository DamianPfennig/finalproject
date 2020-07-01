import React, { useState } from 'react';
import axios from '../axios';

function useMakeFriend() {

    const handleClick = (e) => {
        axios.post().then(({ data }) => {

        }).catch(err => {
            console.log(err);
            setError(true);
        })
    }
}