import React, { useState, useEffect } from "react";
import axios from './axios';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [inputUsers, setInputUsers] = useState([]);
    const [findUsers, setFindUsers] = useState([]);
    const [showNewestUsers, setShowNewestUsers] = useState(true);
    //const [showUserByLetters, setShowUsersByLetter] = useState(false);

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
        setInputUsers(e.target.value)
        setShowNewestUsers(false)

        axios.get(`/findUsers/${e.target.value}`).then(({ data }) => {
            console.log('data from findUsers::: ', data);
            setFindUsers(data);

        })


    }

    // const handleClick = e => {
    //     setShowNewestUsers(false)
    // }





    return (
        <div className="users-container">
            <h1>This are our most recent users</h1>

            {
                showNewestUsers ?


                    users.map((elem, idx) => {
                        return (
                            <div className="users-info" key={idx}>
                                <h3 className="users-name">{elem.first}</h3>
                                <img className="users-image" src={elem.image} />
                            </div>
                        )
                    })


                    :
                    null

            }


            <p>Find a user by the name:</p>
            <input onChange={handleChange}></input>


            {findUsers.length > 0 && findUsers.map((elem, idx) => {
                return (
                    <div className="users-info" key={idx}>
                        <h3 className="users-name">{elem.first}</h3>
                        <img className="users-image" src={elem.image} />
                    </div>
                )
            })}





            {/* {
                { inputUsers }.length == 0 ?

                    null :

                    findUsers.map(elem => {
                        return (
                            <h1>{elem.first}</h1>
                        )
                    })
            } */}





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