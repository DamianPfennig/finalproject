import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addChatMsg, getLastChatMessages } from './actions';
import moment from 'moment';

export default function Chat() {
    const date = moment();
    console.log('date::', date)
    //moment().format('LLL');
    const elemRef = useRef()

    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log('here are my last 10 messages: ', chatMessages);

    const keyCheck = e => {
        //console.log('value: ', e.target.value);
        //console.log('key pressed:', e.key);
        if (e.key == 'Enter') {
            //preventDefault don't go to next line in extarea
            e.preventDefault();
            socket.emit('newMsg', e.target.value);
            e.target.value = '';




            // if (e.target.value) {
            //     finalMessages = useSelector(state => state && state.chatMessages.concat(state.newMessage));
            //     console.log('finalMessages: ', finalMessages);
            // }
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

    }, [chatMessages]);
    //run the above everytime there is a new chat message


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
                                <div className="chat-messages-info">
                                    <h3>{elem.first}</h3>
                                    <p>{elem.message}</p>
                                    <p>({elem.created_at})</p>
                                </div>
                            </div>
                        )
                    })
                }



                {/* {
                    newMessage &&
                    newMessage.map((elem, idx) => {
                        return (
                            <div className="chat-messages" key={idx}>
                                <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
                                <div className="chat-messages-info">
                                    <h3>{elem.first}</h3>
                                    <p>{elem.message}</p>
                                    <p>({elem.created_at})</p>
                                </div>
                            </div>
                        )
                    })

                } */}



                {/* <p>Chat messages will go here</p> */}

            </div>
            <textarea placeholder="add you message here" spellCheck="false" rows="12" cols="60" wrap="hard" onKeyDown={keyCheck}></textarea>

        </div>
    );
}


// {
//     newMessage ?
//         chatMessages.concat(newMessage).map((elem, idx) => {
//             return (
//                 <div className="chat-messages" key={idx}>
//                     <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
//                     <h3>{elem.first}</h3>
//                     <p>{elem.message}</p>
//                     <p>  ({elem.created_at})</p>
//                 </div>
//             )
//         })
//         :
//         chatMessages &&
//         chatMessages.map((elem, idx) => {
//             return (
//                 <div className="chat-messages" key={idx}>
//                     <Link to={`/user/${elem.id}`} ><img src={elem.image} /></Link>
//                     <h3>{elem.first}</h3>
//                     <p>{elem.message}</p>
//                     <p>  ({elem.created_at})</p>
//                 </div>
//             )
//         })

// }