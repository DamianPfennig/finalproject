export default function reducer(state = {}, action) {
    if (action.type == 'RECEIVE_FRIENDS_REQUESTS') {
        state = {
            ...state,
            friendsWannabes: action.friendsAndRequests
        }
    }
    console.log('state in reducer:: ', state);
    return state;

}