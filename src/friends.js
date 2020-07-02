import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import receiveFriendsAndRequests from './actions';
import { Link } from 'react-router-dom';


export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friendsWannabes &&
        //console.log('state from useSelector in friends:: ', state.friendsWannabes)
        state.friendsWannabes.filter(user => user.accepted == true)
    );
    console.log('friends: ', friends);

    const wannabes = useSelector(state => state.friendsWannabes &&
        //console.log('state from useSelector in friends:: ', state.friendsWannabes)
        state.friendsWannabes.filter(user => user.accepted == false)
    );
    console.log('wannabes: ', wannabes);

    useEffect(() => {
        console.log('friends mount');
        dispatch(receiveFriendsAndRequests());

    }, [])

    return (
        <div>
            <div className="friends-container">
                <h1>Users you are already friends with</h1>
                {
                    friends &&
                    friends.map((elem, idx) => {
                        return (
                            <div className="friends" key={idx}>
                                <h3>{elem.first}</h3>
                                <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
                            </div>
                        )
                    })
                }
            </div>
            <div className="wannabes-container"></div>
            <h1>Users who send you a friendship request</h1>
            {
                wannabes &&
                wannabes.map((elem, idx) => {
                    return (
                        <div className="wannabes" key={idx}>
                            <h3>{elem.first}</h3>
                            <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
                        </div>
                    )
                })
            }


        </div>
    )
}