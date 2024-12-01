import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";

function LikeDislikeButtons({ comment, onEngagement, userId }) {
    const [likeCount, setLikeCount] = useState(comment?.likes);
    const [dislikeCount, setDislikeCount] = useState(comment?.dislikes);
    const [likedBy, setLikedBy] = useState(comment?.likedBy);
    const [dislikedBy, setDislikedBy] = useState(comment?.dislikedBy);
    const [hasStateChanged, setHasStateChanged] = useState(false);

    // Derive initial states from props
    const likeState = useMemo(() => likedBy?.includes(userId), [likedBy, userId]);
    const dislikeState = useMemo(() => dislikedBy?.includes(userId), [dislikedBy, userId]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onEngagement({ likes: likeCount, dislikes: dislikeCount, likedBy, dislikedBy, id: comment?._id });
            setHasStateChanged(false);
        }, 1000); 

        return () => clearTimeout(timeout); 
        //eslint-disable-next-line
    }, [hasStateChanged]);

    // Handle like button click
    const handleLike = () => {
        setHasStateChanged(true);
        if (likeState) {
            // Remove like
            setLikeCount((prev) => prev - 1);
            setLikedBy((prevState) => prevState.filter((id) => id !== userId));
        } else {
            // Add like
            setLikeCount((prev) => prev + 1);
            setLikedBy((prevState) => [...prevState, userId]);

            // If previously disliked, remove dislike
            if (dislikeState) {
                setDislikeCount((prev) => prev - 1);
                setDislikedBy((prevState) => prevState.filter((id) => id !== userId));
            }
        }
    };

    // Handle dislike button click
    const handleDislike = () => {
        setHasStateChanged(true);
        if (dislikeState) {
            // Remove dislike
            setDislikeCount((prev) => prev - 1);
            setDislikedBy((prevState) => prevState.filter((id) => id !== userId));
        } else {
            // Add dislike
            setDislikeCount((prev) => prev + 1);
            setDislikedBy((prevState) => [...prevState, userId]);

            // If previously liked, remove like
            if (likeState) {
                setLikeCount((prev) => prev - 1);
                setLikedBy((prevState) => prevState.filter((id) => id !== userId));
            }
        }
    };

    function formatLikeCount(count) {
        if (count >= 1_00_00_000) {
            return (count / 1_00_00_000).toFixed(1) + " Crore";
        } else if (count >= 1_00_000) {
            return (count / 1_00_000).toFixed(1) + " Lakhs";
        } else if (count >= 1_000) {
            return (count / 1_000).toFixed(1) + " K";
        } else {
            return count.toString();
        }
    }

    return (
        <div className="flex items-center space-x-4 ml-[-10px]">
            {/* Like Button */}
            <div className="flex items-center space-x-1">
                <button onClick={handleLike} className={`p-2 rounded-full text-lg bg-transparent ${likeState ? "text-white" : "text-[#aaa]"}  hover:bg-slate-800 focus:outline-none transition-colors`} >
                    {likeState ? <AiFillLike /> : <AiOutlineLike />}
                </button>
                <span className="text-[#aaa]">{formatLikeCount(likeCount)}</span>
            </div>

            {/* Dislike Button */}
            <div className="flex items-center space-x-1">
                <button onClick={handleDislike} className={`p-2 rounded-full text-lg bg-transparent ${dislikeState ? "text-white" : "text-[#aaa]"}  hover:bg-slate-800 focus:outline-none transition-colors`} >
                    {dislikeState ? <AiFillDislike /> : <AiOutlineDislike />}
                </button>
                <span className="text-[#aaa]">{formatLikeCount(dislikeCount)}</span>
            </div>
        </div>
    );
}

export default LikeDislikeButtons;
