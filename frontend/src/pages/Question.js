import React, { useContext, useEffect } from 'react';
import LeftNav from '../components/LeftNav';
import { useNavigate } from 'react-router-dom';
import { noteContext, authContext } from '../context/Context';
import QuestionItem from './QuestionItem';

const Question = () => {
    const navigate = useNavigate();
    const Context = useContext(noteContext);
    const { getUser, user, leftNavVisibility } = useContext(authContext);
    const { notes, getNotes, editNote } = Context;
    let reversedNotes = [];
    reversedNotes = Array.isArray(notes) ? [...notes].reverse() : [];


    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getNotes();
            getUser();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const saveOnClick = () => {
        navigate(`/addmodal/${user?.firstName}`);
    };



    return (
        <div className="flex w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black">
           {leftNavVisibility && <LeftNav />}
            <div className="flex flex-col grow items-center w-[calc(100%-240px)] h-full">
                <div className="flex justify-between items-center w-[80%] min-h-12 rounded-md font-serif bg-slate-400 text-[1.5rem] mt-6 mb-2 pl-3 text-white">
                    <span>Your Questions</span>
                    <button onClick={saveOnClick} className='min-w-[100px] w-auto h-full text-[1.3rem] pl-2 pr-2 pt-1 pb-1 bg-teal-700 rounded-sm border-teal-500 border-[1px] hover:bg-teal-800 hover:border-teal-600'>
                        {notes.length <= 0 ? 'Add New Question' : 'Add More Questions'}
                    </button>
                </div>
                <div className='flex flex-col items-start w-[80%] h-auto mt-5 mb-6 overflow-y-auto'>
                    {
                        reversedNotes.length > 0 ? (
                            reversedNotes?.map((note) => {
                                return <QuestionItem key={note?._id} note={note} editNote={editNote} user={user} />
                            })
                        ) : (
                            <p className="text-white">No notes available</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Question;
