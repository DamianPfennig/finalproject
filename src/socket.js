import * as io from 'socket.io-client';
import { addNewChatMsg, getLastChatMessages } from './actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on('chatMessages', msgs =>
            store.dispatch(getLastChatMessages(msgs))
        );

        socket.on('addChatMsg', msg => {
            console.log('new message in chat: ', msg)
            store.dispatch(addNewChatMsg(msg))
        });

        // socket.on('userChatMessage', msg =>
        //     store.dispatch(userChatMessage(msg))
        // );
    }
};