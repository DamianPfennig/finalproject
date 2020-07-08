export function reducer(state = {}, action) {
    if (action.type == 'RECEIVE_FRIENDS_REQUESTS') {
        state = {
            ...state,
            friendsWannabes: action.friendsAndRequests
        }
        //console.log('state in reducer:: ', state);
        return state;
    }

    if (action.type == 'ACCEPT_FRIENDSHIP') {
        //console.log('state in reducer:::', state)
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(user => {
                if (user.id != action.id) {
                    return user;
                } else {
                    return {
                        ...user,
                        accepted: true
                    }

                }
            })
        }
        console.log('state in reducer:::', state)
        return state;
    }

    if (action.type == 'END_FRIENDSHIP') {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(user => {
                if (user.id != action.id) {
                    return user;
                } else {
                    return {
                        ...user,
                        accepted: null
                    }
                }
            })
        }
    }

    if (action.type == 'GET_LAST_MESSAGES') {
        state = {
            ...state,
            chatMessages: action.data
        }
        return state;
    }

    if (action.type == 'ADD_NEW_MESSAGE') {
        state = {
            ...state,
            //newMessage: action.data
            chatMessages: [...state.chatMessages, ...action.data]

            // chatMessages: state.chatMessages.map(
            //     msg=>{
            //         if(!action.data){
            //             return msg
            //         } else {
            //             return{
            //                 [...msg, ...action.data]
            //             }
            //         }
            //     })
        }
        return state;
    }

    if (action.type == 'ADD_USERS_CONNECTED') {
        state = {
            ...state,
            users: action.data

        }
        return state
    }
    return state;





}