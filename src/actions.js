import axios from './axios';

export async function getFestivals() {
    //console.log('action initiated')
    const { data } = await axios.get('/festivals');
    //console.log('getFestivals data in action: ', data);
    return {
        type: 'RECEIVE_FESTIVALS',
        data: data

    }
}

export async function getSelectedFestival(url) {
    //console.log('action SelectedFestival');
    const { data } = await axios.get(`/selectedFestival/${url}`);
    //console.log('data in festival:: ', data);
    return {
        type: 'GET_SELECTED_FESTIVAL',
        data: data
    }
}

export async function addRatings(arr) {
    // console.log('addRatings in action');
    const { data } = await axios.post('/addRatings', arr);
    //console.log('data in addRatings:: ', data)
    return {
        type: 'ADD_RATINGS',
        data
    }
}

export async function getRatings(url) {
    //console.log('action getRatings');
    const { data } = await axios.get(`/get-ratings/${url}`);
    //console.log('results in action from getRatings:: ', data);
    return {
        type: 'GET_RATINGS',
        data
    }
}



// export function getSelectedFestival(url) {
//     console.log('action SelectedFestival');
//     axios.get(`/selectedFestival/${url}`).then(({ results }) => {
//         //console.log('data in action post :', results);
//     }).catch(err => {
//         console.log('error from getSelectedfestival in action :', err)
//     });
//     return {
//         type: 'GET_SELECTED_FESTIVAL',
//         results: results
//     }

// }



// export async function receiveFriendsAndRequests() {
//     console.log('accion initieted')
//     const { data } = await axios.get('/friends-requests');
//     console.log('data:.', data)
//     return {
//         type: 'RECEIVE_FRIENDS_REQUESTS',
//         friendsAndRequests: data,
//         test: 'test'
//     }
// }

// export function acceptFriendship(id) {
//     console.log('id in action/acceptFriendship:', id)
//     axios.post(`/accept-friend-request/${id}`).then(({ data }) => {
//         console.log('data in action post :', data);
//     }).catch(err => {
//         console.log('error from accept friend request in action :', err)
//     });
//     return {
//         type: 'ACCEPT_FRIENDSHIP',
//         id
//     }
// }

// export function endFriendship(id) {
//     console.log('id in action/endFriendship: ', id)
//     axios.post(`/end-friendship/${id}`).then(({ data }) => {
//         console.log('data in action/endFriendship: ', data);
//     }).catch(err => {
//         console.log('error in action/endFriendship: ', err);
//     });
//     return {
//         type: 'END_FRIENDSHIP',
//         id
//     }
// }

// export function getLastChatMessages(data) {
//     //console.log('data in action chatMessages: ', data);
//     return {
//         type: 'GET_LAST_MESSAGES',
//         data
//     }
// }

// export function addNewChatMsg(data) {
//     console.log('data in action addChatMsg: ', data);
//     return {
//         type: 'ADD_NEW_MESSAGE',
//         data
//     }
// }

// export function usersConnected(results) {
//     console.log('data in action usersConnected: ', results)
//     return {
//         type: 'ADD_USERS_CONNECTED',
//         results
//     }
// }
