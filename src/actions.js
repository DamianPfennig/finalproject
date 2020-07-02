import axios from './axios';


export default async function receiveFriendsAndRequests() {
    const { data } = await axios.get('/friends-requests');

    return {
        type: 'RECEIVE_FRIENDS_REQUESTS',
        friendsAndRequests: data
    }
}
