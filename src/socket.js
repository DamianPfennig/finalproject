import * as io from 'socket.io-client';
import { chatMessages, addChatMsg } from './actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on('chatMessages', msgs =>
            store.dispatch(chatMessages(msgs))
        );

        socket.on('addChatMsg', msg => {
            console.log('new message in chat: ', msg)
            store.dispatch(addChatMsg(msg))
        });

        // socket.on('userChatMessage', msg =>
        //     store.dispatch(userChatMessage(msg))
        // );
    }
};