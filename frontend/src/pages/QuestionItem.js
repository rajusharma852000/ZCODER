import React, { useEffect, useState } from 'react';
import { RiExternalLinkFill, RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { FaLock, FaLockOpen } from "react-icons/fa6";

const QuestionItem = ({ note, editNote, deleteNote, user }) => {
    const [visibility, setVisibility] = useState(note?.visibility);
    const navigate = useNavigate();

    useEffect(() => {
        setVisibility(note?.visibility);
        // eslint-disable-next-line
    }, []);

    const onClickChangeVisibility = () => {
        const newVisibility = !visibility;
        setVisibility(newVisibility);
        editNote({ ...note, visibility: newVisibility });
    };

    const handleOnClick = (noteId) => {
        if (noteId) {
            navigate(`/problem/${noteId}`);
        } else {
            navigate(`/pageNotFound/error404`);
        }
    };

    const deleteOnClick = () => {
        deleteNote(note._id);
    };

    const own = user._id === note.user;

    return (
        <div className="flex flex-col justify-between w-[90%] min-h-[100px] h-auto ml-2 mt-3 mb-3 rounded-sm bg-sky-500/[0.2] text-white border-sky-500 border-[1px]">
            <div
                onClick={() => handleOnClick(note?._id)}
                className="line-clamp-2 cursor-pointer overflow-hidden font-sans min-h-[60px] h-auto w-full pl-3 pr-3 pt-1 pb-1 rounded-sm bg-sky-700 hover:bg-sky-800"
            >
                <p className="text-yellow-500 inline font-semibold text-[1.2rem]">Problem: </p>
                {note.question}
            </div>
            <div className="flex flex-row justify-between mb-1 ml-1 mr-1 w-[98%]">
                <div className="flex flex-row w-auto">
                    <span
                        title="language"
                        className="flex cursor-pointer justify-center ml-1 mr-1 pl-1 pr-1 min-w-5 w-auto bg-purple-600"
                    >
                        {note.language}
                    </span>
                    <div
                        onClick={onClickChangeVisibility}
                        className={`pl-1 pr-1 flex w-auto cursor-pointer items-center ${
                            visibility
                                ? 'bg-teal-600 hover:bg-teal-700'
                                : 'bg-[#cf0a35] hover:bg-[#a11f3b]'
                        }`}
                    >
                        {visibility ? (
                            <FaLockOpen title="public" className="h-[23px]" />
                        ) : (
                            <FaLock title="private" className="h-[23px]" />
                        )}
                    </div>
                    {note?.link?.length > 0 && (
                        <div
                            onClick={() => {
                                const url = note.link.startsWith('http')
                                    ? note.link
                                    : `http://${note.link}`;
                                window.open(url, '_blank');
                            }}
                            className="flex w-auto cursor-pointer items-center bg-yellow-600 ml-1 pl-1 pr-1 hover:bg-yellow-500"
                        >
                            <RiExternalLinkFill title="link" className="text-[1rem]" />
                        </div>
                    )}
                    <div
                        onClick={deleteOnClick}
                        className="flex w-auto cursor-pointer items-center bg-red-600 ml-1 pl-1 pr-1 hover:bg-red-700"
                    >
                        <RiDeleteBin6Line title="delete" className="text-[1rem]" />
                    </div>
                </div>
                <div className="flex flex-row w-auto">
                    <span className="flex justify-center rounded-full w-5 bg-slate-400">
                        {own ? 'Y' : user?.firstName?.charAt(0)}
                    </span>
                    <span className="ml-1 mr-1">{own ? 'You' : user?.firstName}</span>
                </div>
            </div>
        </div>
    );
};

export default QuestionItem;
