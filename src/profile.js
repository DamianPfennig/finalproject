import React from 'react';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';

export default function Profile({ first, last, imageUrl, bio, toggleModal }) {
    return (

        <div className="mainProfile">

            {/* <div onClick={toggleModal}>
                <ProfilePic
                    imageUrl={imageUrl}
                    first={first}
                    last={last}
                //onClick={toggleModal}
                />
            </div> */}


            <div className="bigPicture">
                <ProfilePic
                    imageUrl={imageUrl}
                />
            </div>



            <BioEditor
                first={first}
                last={last}
                bio={bio}
            // changeBio={props.changeBio}
            />

        </div >
    )
}