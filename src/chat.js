import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Chat() {
    const elemRef = useRef()
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log('here are my last 10 messages: ', chatMessages);

    const newMessage = useSelector(state => state && state.newMessage);
    console.log('newMessage is::: ', newMessage);

    const keyCheck = e => {
        //console.log('value: ', e.target.value);
        console.log('key pressed:', e.key);
        if (e.key == 'Enter') {
            //preventDefault don't go to next line in extarea
            e.preventDefault();
            //console.log('value: ', e.target.value);
            socket.emit('newMsg', e.target.value);
            e.target.value = '';
        }
    };

    useEffect(() => {
        console.log('mounted');
        console.log('elemRef: ', elemRef);
        console.log('scroll Top: ', elemRef.current.scrollTop);
        console.log('clientHeight: ', elemRef.current.clientHeight);
        console.log('scrollHeight: ', elemRef.current.scrollHeight);

        //scrolltop = scrollheight -clientheight
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;


    }, [newMessage]);
    //run the above everytime there is a chat message


    return (
        <div className="chat-page-container">
            <h1 className="chat-title">Welcome to the Chat-Room</h1>
            <div className="chat-messages-container" ref={elemRef}>
                {
                    chatMessages &&
                    chatMessages.map((elem, idx) => {
                        return (
                            <div className="chat-messages" key={idx}>
                                <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
                                <h3>{elem.first}</h3>
                                <p>{elem.message}</p>
                                <p>  ({elem.created_at})</p>
                            </div>
                        )
                    })
                }
                {
                    newMessage &&
                    newMessage.map((elem, idx) => {
                        return (
                            <div className="chat-messages" key={idx}>
                                <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
                                <h3>{elem.first}</h3>
                                <p>{elem.message}</p>
                                <p>  ({elem.created_at})</p>
                            </div>
                        )
                    })

                }



                {/* <p>Chat messages will go here</p> */}

            </div>
            <textarea placeholder="add you message here" rows="10" cols="50" wrap="hard" onKeyDown={keyCheck}></textarea>

        </div>
    );
}