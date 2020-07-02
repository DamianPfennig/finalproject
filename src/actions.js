import axios from './axios';


export async function receiveFriendsAndRequests() {
    console.log('accion initieted')
    const { data } = await axios.get('/friends-requests');
    console.log('data:.', data)
    return {
        type: 'RECEIVE_FRIENDS_REQUESTS',
        friendsAndRequests: data,
        test: 'test'
    }
}

export function acceptFriendship(id) {
    console.log('id in action:::', id)
    axios.post(`/accept-friend-request/${id}`).then(({ data }) => {
        console.log('data in action post :', data);
    }).catch(err => {
        console.log('error from accept friend request in action :', err)
    });
    return {
        type: 'ACCEPT_FRIENDSHIP',
        id
    }
}
