import React from 'react';


export default function ProfilePic(props) {
    console.log('props', props);
    const imageUrl = props.imageUrl || 'default.png';

    return (
        <div>
            <div className="profileImage">
                <img src={imageUrl} alt={props.first} alt={props.last} ></img>
                <p>{props.first} {props.last}</p>
            </div>
        </div>

    )
}




//<img src={props.imageUrl}></img>
//export default function Presentational ({first, last, imageUrl})
//imageUrl = imageUrl || 'default.png'