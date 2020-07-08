import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { useSelector, useDispatch } from 'react-redux';
import axios from './axios';
import { Link } from 'react-router-dom';



export default function OnlineUsers() {
    //console.log('connected');
    //let onlineUsers = [];
    const onlineUsers = useSelector(state => state && state.users);
    console.log('onlineUsers: ', onlineUsers)


    useEffect(() => {
        console.log('onlineUsers mounted')

        // socket.on('onlineUsers', data => {
        //     console.log('data in connected: ', data)
        //     //axios.get('user-connected:')
        //     onlineUsers.push(data);
        //     console.log('onlineUsers: ', onlineUsers);
        // });
    }, []);


    return (
        <div className="online-users-container">
            <h3>This users are connected</h3>
            {
                onlineUsers &&
                //<div>HELLO!!!</div>
                onlineUsers.map((elem, idx) => {
                    return (
                        <div className="online-users" key={idx}>
                            <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
                            <p>{elem.first}</p>
                            {/* <div className="online-users-info"> 
                                 <p>{elem.message}</p>
                                <p>({elem.created_at})</p> 
                            </div> */}
                        </div>
                    )
                })

            }
        </div>
    )
}