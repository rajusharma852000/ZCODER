import { authContext } from "./Context.js";
import React, { useState } from 'react';

const AuthAction = (props) => {
    const host = "http://localhost:5000";
    const [leftNavVisibility, setLeftNavVisibility] = useState(true);
    const [shouldRefresh, setShouldReferesh] = useState(true);

   //signup
    const signup = async (credentials) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            const json = await response.json();
            return json;
        }
        catch (error) {
            console.log({ message: "failed to signup", error: error, success: false });
        }
    };
    
    //login
    const login = async (credentials) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            const json = await response.json();
            return json;
        }
        catch (error) {
            console.log({ message: "failed to login", error: error, success: false });
        }
    };

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
            setShouldReferesh(false);
            return json?.user;

        }
        catch (error) {
            console.log({ message: "failed to get user details", error: error, success: false });
        }
    };

    //update user details
    const updateUser = async (data) => {
        try {
            const response = await fetch(`${host}/api/auth/updateuser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token')
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            setShouldReferesh(true);
            return json?.user;
        }
        catch (error) {
            console.log({ update: "failed to update", error: error, success: false });
            return;
        }
    }
    const saveNote = async(data) =>{
        try {
            const response = await fetch(`${host}/api/auth/savenote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token')
                },
                body: JSON.stringify({importantNotes: data?.importantNotes, savedNotes: data?.savedNotes})
            });
            const json = await response.json();
            setShouldReferesh(true);
            return json;
        }
        catch (error) {
            console.log({ update: "failed to save note", error: error, success: false });
            return;
        }
    }

    return (
        <>
            {/* <authContext.Provider value={{ user, getUser, updateUser, updatedUserDetails, setUpdatedUserDetails, leftNavVisibility, setLeftNavVisibility }}> */}
            <authContext.Provider value={{ getUser, updateUser, leftNavVisibility, setLeftNavVisibility, login, signup, saveNote, shouldRefresh }}>
                {props.children}
            </authContext.Provider>
        </>
    )
}

export default AuthAction;