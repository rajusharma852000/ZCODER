import React, { useContext, useEffect, useState } from 'react';
import LeftNav from '../components/LeftNav';
import { useNavigate } from 'react-router-dom';
import { noteContext, authContext } from '../context/Context';
import QuestionItem from './QuestionItem';
import { toast } from 'react-hot-toast'
import Spinner from '../components/Spinner';

const Question = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [notes, setNotes] = useState({});
    const { getUser, leftNavVisibility } = useContext(authContext);
    const { getNotes, editNote, deleteNote } = useContext(noteContext);
    const [loader, setLoader] = useState(false);

    let reversedNotes = Array.isArray(notes) ? [...notes].reverse() : [];

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/login');
        }
        const fetchData = async () => {
            setLoader(true);
            if (!localStorage.getItem('zcoder-user') || localStorage.getItem('zcoder-user') === undefined) {
                const res1 = await getUser();
                setUser(res1);
            }
            else {
                const res = localStorage.getItem("zcoder-user");
                const data = JSON.parse(res);
                setUser(data);
            }
            const res2 = await getNotes();
            setNotes(res2);
            setLoader(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleDeleteNote = async (noteId) => {
        const res = await deleteNote(noteId);
        if (res?.success) {
            toast.success("Note Deleted");
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        } else {
            toast.error("Error deleting note");
        }
    };

    const saveOnClick = () => {
        navigate(`/addmodal/${user?.firstName}`);
    };

    return (
        <div className="flex w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black">
            {leftNavVisibility && <LeftNav />}
            <div className="flex flex-col grow items-center w-[calc(100%-240px)] h-full">
                <div className="flex justify-between items-center w-[80%] min-h-12 rounded-md font-serif bg-slate-400 text-[1.5rem] mt-6 mb-2 pl-3 text-white">
                    <span>Your Questions</span>
                    <button
                        onClick={saveOnClick}
                        className="min-w-[100px] w-auto h-full text-[1.3rem] pl-2 pr-2 pt-1 pb-1 bg-teal-700 rounded-sm border-teal-500 border-[1px] hover:bg-teal-800 hover:border-teal-600"
                    >
                        {notes.length <= 0 ? 'Add New Question' : 'Add More Questions'}
                    </button>
                </div>

                {loader ? <Spinner /> : (<><div className="flex flex-col items-start w-[80%] h-auto mt-5 mb-6 overflow-y-auto">
                    {reversedNotes.length > 0 ? (
                        reversedNotes.map((note) => (
                            <QuestionItem
                                key={note._id}
                                note={note}
                                editNote={editNote}
                                deleteNote={handleDeleteNote}
                                user={user}
                            />
                        ))
                    ) : (
                        <p className="text-white">No notes available</p>
                    )}
                </div>
                </>)}
            </div>
        </div>
    );
};

export default Question;
