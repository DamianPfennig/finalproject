export function reducer(state = {}, action) {
    if (action.type == 'RECEIVE_FRIENDS_REQUESTS') {
        state = {
            ...state,
            friendsWannabes: action.friendsAndRequests
        }
        console.log('state in reducer:: ', state);
        return state;
    }

    // if (action.type == 'ACCEPT_FRIENDSHIP') {
    //     state = {
    //         ...state,
    //         user: state.map(user => {
    //             if (user.id == action.id) {
    //                 return {
    //                     ...user,
    //                     accepted: true
    //                 }

    //             }
    //         })
    //     }
    //     return state;
    // }
    return state;





}