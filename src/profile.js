import React from 'react';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';

export default function Profile(props) {
    return (
        <div>
            <h1>{props.first} {props.last}</h1>
            {/* <ProfilePic
                url={props.url}
                first={props.first}
                last={props.last}
                clickHandler={props.clickHandler}
            />

            <BioEditor
                bio={props.bio}
                changeBio={props.changeBio}
            /> */}

        </div>
    )
}