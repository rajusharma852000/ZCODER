import React from 'react';
import { noteContext } from "./Context.js";

const NoteAction = (props) => {
    const host = "http://localhost:5000";


    //get public notes
    const getPublicNotes = async () => {
        const response = await fetch(`${host}/api/note/fetchpublicnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        return json;
    }

    //get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/note/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const json = await response.json();
        return json?.notes;
    }


    //add a note
    const addNote = async ({ question, code, description, companyTag, language, link, visibility, revision, saved, name }) => {
        try {
            const response = await fetch(`${host}/api/note/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ question, code, description, companyTag, language, link, visibility, revision, saved, name })
            })
            const json = await response.json();
            return json?.note;
        }
        catch (error) {
            console.log({ message: "error occured in NoteAction.js", error: error, success: false })
        }

    }


    const editNote = async ({ _id, question, description, companyTag, language, code, link, visibility, revision, saved }) => {
        // API call to update the note
        const response = await fetch(`${host}/api/note/updatenote/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ question, description, companyTag, language, code, link, visibility, revision, saved })
        });

        const json = await response.json()
        return json?.note;
    }


    //find a note by id
    const findNote = async (noteid) => {
        const response = await fetch(`${host}/api/note/findnote/${noteid}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const json = await response.json();
        return json?.note[0];
    }


    //Delete a note
    const deleteNote = async (_id) => {
        //todo call to API
        const response = await fetch(`${host}/api/note/deletenote/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const json = await response.json();
        return json;

    }


    //Delete all notes
    const deleteAllNote = async () => {
        //todo call to API
        const response = await fetch(`${host}/api/note/deleteall`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const json = await response.json();
        return json.deleteCount;
        //setnote
    }





    //Add a comment id to Note
    const addCommentIdToNote = async (noteId, commentId) => {
        //todo call to API
        const response = await fetch(`${host}/api/note/addcommentid/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(commentId)
        });
        const json = await response.json();
        return json?.note;
        //setnote
    }



    //Delete a comment id from Note
    const deleteCommentIdFromNote = async (noteId, commentId) => {
        //todo call to API
        const response = await fetch(`${host}/api/note/deletecommentid/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ commentId })
        });
        const json = await response.json();
        return json?.note;
        //setnote
    }


    //get revision notes
    const getRevisionNotes = async () => {
        const response = await fetch(`${host}/api/note/getrevisionnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const json = await response.json();
        return json;
    }
    //get saved notes 
    const getSavedNotes = async () => {
        const response = await fetch(`${host}/api/note/getsavednotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const json = await response.json();
        return json;
    }


    return (
        <noteContext.Provider value={{ getRevisionNotes, getSavedNotes, getNotes, addNote, editNote, deleteNote, deleteAllNote, getPublicNotes, findNote, addCommentIdToNote, deleteCommentIdFromNote }}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteAction;