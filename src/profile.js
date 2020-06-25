import React from 'react';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';

export default function Profile({ first, last, imageUrl, toggleModal }) {
    return (

        <div>
            <h1>Profile Component</h1>
            <h3>{first} {last}</h3>


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
                {/* <img src={imageUrl} alt={first} alt={last} > */}

            </div>



            {/* <BioEditor
                bio={props.bio}
                changeBio={props.changeBio}
            /> */}

        </div >
    )
}