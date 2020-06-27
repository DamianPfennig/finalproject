import React from 'react';


export default function ProfilePic(props) {
    //console.log('props', props);
    //url="/default.jpg"
    //const imageUrl = props.imageUrl || '/default.png';
    let imageUrl;
    if (props.imageUrl) {
        imageUrl = props.imageUrl
    } else {
        imageUrl = '/default.png'
    }



    return (
        <div className="imageContainer" onClick={() => props.toggleModal()} >
            {/* <p>Upload a picture</p> */}
            <img src={imageUrl} alt={props.first} alt={props.last} />
            <p>{props.first} {props.last}</p>

        </div>

    )
}

// import React from 'react';


// export default function ProfilePic(props) {
//     //console.log('props', props);
//     const imageUrl = props.imageUrl || 'default.png';

//     return (
//         <div className="profileImage" >
//             {/* <p>Upload a picture</p> */}
//             <img src={imageUrl} alt={props.first} alt={props.last} ></img>
//             <p>{props.first} {props.last}</p>

//         </div>

//     )
// }