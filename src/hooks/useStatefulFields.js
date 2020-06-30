import React, { useState } from 'react';

export function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = e => {
        setValues({
            //...values preserves the old state of setValues so is not deleted
            ...values,
            //in brackets tell js is a variable
            [e.target.name]: e.target.value
        })
    }

    return [values, handleChange];
}