import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { receiveFriendsAndRequests, acceptFriendship } from './actions';
import { Link } from 'react-router-dom';


export default function Friends() {
    const dispatch = useDispatch();


    const friends = useSelector(state => state.friendsWannabes &&
        //console.log('state from useSelector in friends:: ', state.friendsWannabes)
        state.friendsWannabes.filter(user => user.accepted == true)
    );
    //console.log('friends: ', friends);

    const wannabes = useSelector(state => state.friendsWannabes &&
        //console.log('state from useSelector in friends:: ', state.friendsWannabes)
        state.friendsWannabes.filter(user => user.accepted == false)
    );
    //console.log('wannabes: ', wannabes);

    const friendAccepted = useSelector(state => state.user &&
        console.log('state.user from useSelector in friendAccepted: ', state.user)

    );

    useEffect(() => {
        //console.log('friends mount');
        dispatch(receiveFriendsAndRequests());

    }, []);

    function handleClick(e) {
        //console.log('e.target: ', e.target.value);
        dispatch(acceptFriendship(e.target.value));
    }

    return (
        <div>
            <div className="wannabes-container">
                <h3>Users who send you a friendship request</h3>
                {
                    wannabes &&
                    wannabes.map((elem, idx) => {
                        return (
                            <div className="wannabes" key={idx}>
                                <h3>{elem.first}</h3>
                                <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
                                <button value={elem.id} onClick={handleClick}>Accept Friendship Request</button>
                            </div>
                        )
                    })
                }
            </div>

            <div className="separation"></div>

            <div className="friends-container">
                <h3>Users you are already friends with</h3>
                {
                    !friendAccepted && <div>No friends</div>
                }
                {
                    friends &&
                    friends.map((elem, idx) => {
                        return (
                            <div className="friends" key={idx}>
                                <h3>{elem.first}</h3>
                                <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
                                <button>End Friendship</button>
                            </div>
                        )
                    })
                }
            </div>



        </div>
    )
}