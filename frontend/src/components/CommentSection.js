import React, { useContext, useEffect, useState } from 'react';
import { commentContext } from '../context/Context';
import CommentItem from './CommentItem';




const CommentSection = ({ noteId, username, userId }) => {
    const { findCommentsByNoteId, addComment, updateCommentEngagement } = useContext(commentContext);
    const { deleteCommentById, updateCommentById } = useContext(commentContext);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getComments = async () => {
            const data = await findCommentsByNoteId({ noteId });
            setComments(data?.comments);
        }
        getComments();
        //eslint-disable-next-line
    }, [])

    const handleAddComment = async () => {
        if (newComment) {
            addComment({ username: username, data: newComment, noteId: noteId });
            setComments((prevComments) => {
                return [...prevComments, { username: username, data: newComment, noteId: noteId, likes: 0, dislikes: 0, likedBy: [], date: Date.now() }]
            });
            setNewComment("");
        }
    }
    const handleUpdateComment = async ({ data, id }) => {
        updateCommentById({ data, id });
        setComments((prevComments) => {
            return prevComments.map((comment) => {
                return comment._id === id ? { ...comment, data: data } : comment;
            });
        });
    }
    const handleDeleteComment = async (commId) => {
        deleteCommentById({ id: commId });
        setComments((prevComments) =>
            prevComments.filter((comment) => comment._id !== commId)
        );

    }
    const handleEngagement = async (data) => {
        await updateCommentEngagement(data);
    }
    const handleCancelComment = () => {
        setNewComment("");
    }

    //to change num into correcsponding shorthand
    function formatNumCount(num) {
        if (num >= 1_00_00_000) { // Crore
            return (num / 1_00_00_000)?.toFixed(1) + " Crore";
        } else if (num >= 1_00_000) { // Lakh
            return (num / 1_00_000).toFixed(1) + " Lakhs";
        } else if (num >= 1_000) { // Thousand
            return (num / 1_000)?.toFixed(1) + " K";
        } else {
            return num?.toString();
        }
    }

    return (
        <>
            <div className='flex flex-col w-[90%] p-3 mt-5'>
                <h3 className='text-2xl mb-6 font-semibold'>{formatNumCount(comments?.length) + " Comments"}</h3>
                <textarea type="text" name="comment" id="comment" value={newComment} placeholder="Add a comment" onChange={(event) => setNewComment(event.target.value)}
                    onInput={(event) => {
                        const target = event.target;
                        target.style.height = "auto"; // Reset the height to auto to calculate scrollHeight
                        target.style.height = `${target.scrollHeight}px`; // Set the height to match the content
                    }}
                    className={`border-b-2 border-transparent overflow-hidden resize-none border-b-white bg-black py-1 px-2 w-full focus:outline-none focus:border-b-white`}
                    style={{ minHeight: "40px", lineHeight: "20px" }} // Ensure a good starting height and line spacing
                />

                <div className='flex justify-end p-2'>
                    <button onClick={handleCancelComment} disabled={newComment.length === 0} className={`text-white p-2 bg-transparent  rounded-lg mr-1  ${newComment.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-700"}`} > Cancel </button>
                    <button onClick={handleAddComment} disabled={newComment.length === 0} className={`text-white p-2 bg-transparent  rounded-lg ml-1  ${newComment.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-700"}`}  >  Comment </button>
                </div>
            </div>
            {comments.length === 0 && (
                <div className='flex flex-col items-start mb-3 px-4 w-[90%] text-white'>
                    <p>No comments yet</p>
                </div>
            )}
            {comments?.map((comm, index) => (
                <CommentItem key={index} comm={comm} userId={userId} onUpdate={handleUpdateComment} onDelete={handleDeleteComment} onEngagement={handleEngagement} />
            ))}
        </>
    );
};

export default CommentSection;
