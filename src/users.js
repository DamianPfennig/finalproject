import React, { useState, useEffect } from "react";
import axios from './axios';
import { Link } from 'react-router-dom';


export default function Users() {
    const [users, setUsers] = useState([]);
    const [inputUsers, setInputUsers] = useState([]);
    const [findUsers, setFindUsers] = useState([]);
    const [showNewestUsers, setShowNewestUsers] = useState(true);
    const [showNoUser, setShowNoUser] = useState(false);

    useEffect(() => {
        console.log('mounting');
        console.log('state: ', findUsers);

        (async () => {
            const { data } = await axios.get('/users.json');
            setUsers(data);
            console.log('data:', data);

        })();
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         const { data } = await axios.get(`/findUsers/${inputUsers}`)
    //         setFindUsers(data);
    //         console.log('data from FindUsers: ', data);
    //     })();
    // }, [inputUsers])

    const handleChange = e => {
        console.log('input value: ', e.target.value)
        setInputUsers(e.target.value);
        setShowNewestUsers(false);
        if (e.target.value === '') {
            setShowNoUser(true);
        } else {
            axios.get(`/findUsers/${e.target.value}`).then(({ data }) => {
                console.log('data from findUsers::: ', data);
                setFindUsers(data);
                setShowNoUser(false);

            }).catch(err => {
                console.log('error in findUsers ', err);
            })
        }




    }

    // const handleClick = e => {
    //     setShowNewestUsers(false)
    // }





    return (
        <div className="users-container">
            {
                showNewestUsers ?
                    <div>
                        <h1>This are our most recent users</h1>
                        {users.map((elem, idx) => {
                            return (
                                <div className="users-info" key={idx}>
                                    <h3 className="users-name">{elem.first}</h3>
                                    <img className="users-image" src={elem.image} />
                                </div>
                            )
                        })
                        }

                    </div>
                    :
                    null

            }


            <p>Find a user by the name:</p>
            <input onChange={handleChange}></input>

            {showNoUser ?
                <p>No user found</p>
                :
                null

            }

            {/* {findUsers && findUsers.map((elem, idx) => {
                return (
                    <div className="users-info" key={idx}>
                        <h3 className="users-name">{elem.first}</h3>
                        <img className="users-image" src={elem.image} />
                    </div>
                )
            })} */}





            {
                inputUsers.length === 0 ?
                    null :
                    findUsers.map((elem, idx) => {
                        return (
                            <div className="users-info" key={idx}>
                                <h3 className="users-name">{elem.first}</h3>
                                <Link to={`/user/${elem.id}`} ><img className="users-image" src={elem.image} /></Link>
                            </div>
                        )
                    })
            }





            {/* {findUsers.map((elem, idx) => {
                return (
                    <div className="users-info" key={idx}>
                        <h3 className="users-name">{elem.first}</h3>
                        <img className="users-image" src={elem.image} />
                    </div>
                )
            })} */}



        </div>

    )
}