import { authContext } from "./Context.js";
import React, { useState } from 'react';

const AuthAction = (props) => {
    const host = "http://localhost:5000";
    const [user, setUser] = useState([]);
    const [updatedUserDetails, setUpdatedUserDetails] = useState();
    const [leftNavVisibility, setLeftNavVisibility] = useState(true);

    //get user details
    const getUser = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token')
                },
            })
            const json = await response.json();
            setUser(json.user);
        }
        catch (error) {
            console.log({ message: "failed to get user details", error: error });
        }
    };

    //update user details
    const updateUser = async ({ firstName, lastName, email, password, profilePicture, technicalSkills, dateOfBirth, location, profession, college, facebook, linkedin, instagram, github, x, visibilityPublic }) => {
        try {
            const response = await fetch(`${host}/api/auth/updateuser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ firstName, lastName, email, password, profilePicture, technicalSkills, dateOfBirth, location, profession, college,  facebook, linkedin, instagram, github, x, visibilityPublic })
            });
            const json = await response.json();
            setUser(json.user);
        }
        catch (error) {
            console.log({ update: "failed to update", error: error });
            return;
        }
    }

    return (
        <>
            <authContext.Provider value={{ user, getUser, updateUser, updatedUserDetails, setUpdatedUserDetails, leftNavVisibility, setLeftNavVisibility }}>
                {props.children}
            </authContext.Provider>
        </>
    )
}

export default AuthAction;