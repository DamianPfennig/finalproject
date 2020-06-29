import React, { useState, useEffect } from "react";
import axios from './axios';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log('mounting');
        (async () => {
            const { data } = await axios.get('/users.json');
            setUsers(data);
            console.log('data:', data);

        })();
    }, [])





    return (
        <div className="users-container">
            <h1>This are our most recent users</h1>

            {users.map((elem, idx) => {
                return (
                    <div className="users-info" users-infokey={idx}>
                        <h3 className="users-name">{elem.first}</h3>
                        <img className="users-image" src={elem.image} />
                    </div>
                )
            })}


        </div>

    )
}