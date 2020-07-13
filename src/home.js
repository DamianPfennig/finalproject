import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { getFestivals } from './actions';
import axios from './axios';

export default function Home() {

    const dispatch = useDispatch();
    const festivals = useSelector(state => state.festivals);

    console.log('festivals: ', festivals)


    useEffect(() => {
        console.log('mounting')
        dispatch(getFestivals());
    }, [])


    return (
        <div className="welcome-festival-container">

            {/* <div className="festival-info">
                <h3>{elem.name}</h3>
                <Link to={'/festival/8'} >
                    <div className="image-container">
                        <div className="overlay"></div>
                        <img src={elem.imageurl} />
                    </div>
                    <div className="festival-content">
                        <h2>{elem.location}</h2>
                        <br></br>
                        <h3>{elem.startingdate} - {elem.finishingdate}</h3>
                    </div>
                </Link>

            </div> */}
            {
                festivals &&
                festivals.map((elem, idx) => {
                    return (

                        <div className="festival-info" key={idx}>
                            <h2>{elem.name}</h2>
                            <Link to={`/festival/${elem.id}`} >
                                <div className="image-container">
                                    <div className="overlay"></div>
                                    <img src={elem.imageurl} />
                                </div>
                                <div className="festival-content">
                                    <h3>{elem.location}</h3>
                                    <h3>{elem.startingdate} - {elem.finishingdate}</h3>

                                </div>


                                {/* <h3>{elem.name}</h3>
                                <p>{elem.startingdate} - {elem.finishingdate}</p>
                                <p>({elem.location})</p>
                                <p>{elem.url}</p>
                                <p>{elem.style}</p>
                                <p>{elem.description}</p>
                                <img src={elem.imageurl} /> */}
                            </Link>

                        </div>

                    )

                })
            }


        </div>
    )

}




///////////////////////////////////////////////////////////
{/* <div className="festivals">
                <Festivals
                    id={id}
                    name={name}
                    startingDate={startingDate}
                    finishingDate={finishingDate}
                    location={location}
                    price={price}
                    style={style}
                    imageUrl={imageUrl}
                    homepage={homepage}
                    description={description}
                />

            </div> */}


  // console.log('mounting')
        // axios.get('/festivals').then(({ data }) => {
        //     console.log(data)

        //     setFestivalsInfo(data);

        //     id: data.id,
        //     name: data.name,
        //     startingDate: data.startingDate,
        //     finishingDate: data.finishingDate,
        //     location: data.location,
        //     price: data.price,
        //     style: data.style,
        //     imageUrl: data.imageUrl,
        //     homepage: data.url,
        //     description: data.description

        // }).catch(err => console.log('error in home', err));
        // console.log('festivalsInfo: ', festivalsInfo)

    // { id,
    //     name,
    //     startingDate,
    //     finishingDate,
    //     location,
    //     price,
    //     style,
    //     imageUrl,
    //     homepage,
    //     description 
    // }


//     return (
//         <div className="home">
//             <div className="welcome-festival-container">
//                 <div className="festival-info">
//                     <Link to="/festival/1">
//                         <h3>Fusion Festival</h3>
//                         <p>30.06 - 04-07-2021</p>
//                         <p>Berlin</p>
//                         <div className="image-container">
//                             <img src="fusion-rakete-farbe.jpg" />
//                         </div>
//                         <p>120 eur</p>
//                         <p>Music, Theater, Workshops, and much more... </p>
//                         <p>The best independent festival!!</p>
//                     </Link>
//                 </div>

//                 <div className="festival-info">
//                     <h3>Woodstock</h3>
//                     <p>22.08 - 25.08.1969</p>
//                     <p>Bethel, New York</p>
//                     <div className="image-container">
//                         <img src="Woodstock.jpg" />
//                     </div>
//                     <p>Folk Music</p>
//                     <p>Music and Love</p>

//                 </div>
//                 <div className="festival-info">
//                     <h3>Summerjam</h3>
//                     <p>02.07 - 04.07.2021</p>
//                     <p>Köln, Germany</p>
//                     <div className="image-container">
//                         <img src="summerjam.jpg" />
//                     </div>
//                     <p>Reggae</p>
//                     <p>Enjoy reggae by the lake</p>


//                 </div>
//                 <div className="festival-info">
//                     <h3>Rock am Ring</h3>
//                     <p>11.06 - 13.06.2021</p>
//                     <p>Nürburgring, Germany</p>
//                     <div className="image-container">
//                         <img src="rockamring.jpg" />
//                     </div>
//                     <p>Reggae</p>
//                     <p>Enjoy reggae by the lake</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }

//     render() {
//         return (
//             <div className="welcome-festival-container">
//                 <div className="festival-info">
//                     <h3>{props.first}</h3>
//                     <p>30.06 - 04-07-2021</p>
//                     <p>{props.location}</p>
//                     <div className="image-container">
//                         <img src="fusion-rakete-farbe.jpg" />
//                     </div>

//                     <p>{props.price}</p>
//                     <p>{props.style}</p>
//                     <p>{props.description}</p>
//                 </div>
//                 <div className="welcome-festival">
//                     <h3>Woodstock></h3>
//                     <p>22.08 - 25.08.1969</p>
//                     <p>Bethel, New York</p>
//                     <div className="image-container">
//                         <img src="Woodstock.jpg" />
//                     </div>
//                     <p>Folk Music</p>
//                     <p>Music and Love</p>

//                 </div>
//                 <div className="welcome-festival">
//                     <h1>Festival 3</h1>
//                 </div>
//                 <div className="welcome-festival">
//                     <h1>Festival 4</h1>
//                 </div>
//             </div>
//         )
//     }
// }
// export default Home;