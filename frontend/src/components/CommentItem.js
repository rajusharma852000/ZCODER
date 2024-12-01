import React, { useEffect, useRef, useState } from 'react';
import LikeDislikeButtons from '../components/LikeDislikeButtons';
import { MdMoreVert } from "react-icons/md";

const CommentItem = ({ index, comm, userId, onUpdate, onDelete, onEngagement }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isUpdateModeOn, setIsUpdateModeOn] = useState(false);
    const [newComment, setNewComment] = useState(comm?.data);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuVisible(false);
        }
    };
    const handleEdit = () => {
        setIsUpdateModeOn(true);
        setIsMenuVisible(false);

    }
    const handleDelete = () => {
        onDelete(comm?._id);
        setIsMenuVisible(false);

    }
    const handleCopy = () => {
        navigator.clipboard.writeText(comm?.data);
        setIsMenuVisible(false);
    }
    const handleCancel = () => {
        setIsUpdateModeOn(false);

    }
    const handleUpdate = () => {
        if (newComment && newComment !== comm?.data.trim()) {
            onUpdate({ data: newComment, id: comm?._id });
        }
        setIsUpdateModeOn(false);
    }

    useEffect(() => {
        if (isMenuVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuVisible]);


    const isOwned = (commUserId) => {
        if (commUserId === userId) return true;
        else return false;
    }

    //to calculate the relative time
    function getRelativeTime(givenTime) {
        const now = new Date();
        const past = new Date(givenTime); // Ensure the given time is a Date object
        const diffInMs = now - past; // Difference in milliseconds

        // Calculate difference in seconds, minutes, hours, days, months, years
        const seconds = Math.floor(diffInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30); // Approximation
        const years = Math.floor(days / 365); // Approximation

        // Determine the relative time string
        if (seconds < 60) {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        } else if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (days < 30) {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (months < 12) {
            return `${months} month${months !== 1 ? 's' : ''} ago`;
        } else {
            return `${years} year${years !== 1 ? 's' : ''} ago`;
        }
    }
    return (
        <>
            <div key={index} className='flex flex-col items-start mb-3 px-4 h-auto w-[90%] text-white'>
                {!isUpdateModeOn && (<>
                    <div className='flex justify-between w-full items-center'>
                        <span className=' relative text-sm'>{"@" + comm?.username + "   "} <span className='text-[#aaa]'>{getRelativeTime(comm?.date)}</span></span>
                        <div className="relative">
                            <MdMoreVert className='text-white text-xl hover:text-slate-400 cursor-pointer' onClick={toggleMenu} />
                            {isMenuVisible && (<div ref={menuRef} className='absolute top-6 right-0 z-10 bg-black border border-gray-700 text-white text-sm rounded-lg'>
                                {isOwned(comm?.userId) && (<>
                                    <button onClick={() => handleEdit(comm)} className='block w-full px-4 py-2 hover:bg-gray-700' > Edit </button>
                                    <button onClick={() => handleDelete(comm)} className='block w-full px-4 py-2 hover:bg-gray-700' > Delete </button>
                                </>)}
                                {!isOwned(comm?.userId) && (<>
                                    <button onClick={() => handleCopy(comm)} className='block w-full px-4 py-2 hover:bg-gray-700' > Copy </button>
                                </>)}
                            </div>
                            )}
                        </div>

                    </div>
                    <p className='w-full'>{comm?.data}</p>
                    <LikeDislikeButtons comment={comm} onEngagement={onEngagement} userId={userId}/>
                </>)}
                {isUpdateModeOn && (<>
                    <input type="text" name="comment" id="comment" value={newComment} placeholder="Add a comment" onChange={(event) => { setNewComment(event.target.value) }} className='border-2 border-transparent border-b-white bg-black w-full focus:outline-none focus:border-b-white' />
                    <div className='flex justify-end p-2 w-full'>
                        <button onClick={handleCancel} className='text-white p-2 bg-transparent hover:bg-slate-700 rounded-lg mr-1'>Cancel</button>
                        <button onClick={handleUpdate} className='text-white p-2 bg-transparent hover:bg-slate-700 rounded-lg ml-1'>Save</button>
                    </div>
                </>)}
            </div>
        </>
    )
}

export default CommentItem
