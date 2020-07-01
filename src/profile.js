import React from 'react';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';


export default function Profile({ id, first, last, imageUrl, bio, updateBio, toggleModal }) {
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


            <div className="bigImageContainer">
                <ProfilePic
                    id={id}
                    imageUrl={imageUrl}
                    toggleModal={toggleModal}
                    first={first}
                    last={last}
                />
            </div>



            <BioEditor
                first={first}
                last={last}
                bio={bio}
                updateBio={updateBio}
            //changeBio={props.changeBio}
            />

        </div >
    )
}