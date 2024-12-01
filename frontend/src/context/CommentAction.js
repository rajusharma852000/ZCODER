import { commentContext } from "./Context";

const CommentAction = (props) => {
    const host = "https://zcoder-backend-0wh6.onrender.com";

    const findCommentsByNoteId = async ({ noteId }) => {
        const response = await fetch(`${host}/api/comment/findCommentsByNoteId/${noteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const json = await response.json();
        return json;
    }

    const addComment = async (data) => {
        const response = await fetch(`${host}/api/comment/addcomment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    }

    const updateCommentById = async (data) => {
        const response = await fetch(`${host}/api/comment/updatecomment/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    }
    const updateCommentEngagement = async (data) => {
        const response = await fetch(`${host}/api/comment/updatecommentengagement/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    }

    const deleteCommentById = async ({ id }) => {
        const response = await fetch(`${host}/api/comment/deletecomment/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const json = await response.json();
        return json;
    }



    return (
        <commentContext.Provider value={{ findCommentsByNoteId, addComment, updateCommentById, deleteCommentById, updateCommentEngagement }}>
            {props.children}
        </commentContext.Provider>
    )
}

export default CommentAction;