import React, { useState } from 'react';
import axios from '../axios';


//we pass a path aso we can use hook in login AND registration
export function useSubmit(path, values) {
    const [error, setError] = useState(false);
    const handleClick = () => {
        axios.post(path, values).then(({ data }) => {
            if (!data.success) {
                setError(true);
            } else {
                location.replace('/');
            }
        }).catch(err => {
            console.log(err);
            setError(true);
        })
    };

    return [error, handleClick]
}