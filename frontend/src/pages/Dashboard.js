import React, { useContext, useEffect, useState } from 'react';
import LeftNav from '../components/LeftNav';
import { noteContext, authContext } from '../context/Context';
import DashboardItem from './DashboardItem';
import Spinner from '../components/Spinner';


const Question = () => {
    const { getPublicNotes } = useContext(noteContext);
    const [publicNotes, setPublicNotes] = useState([]);
    const { leftNavVisibility } = useContext(authContext);
    const [loader, setLoader] = useState(false);

    let reversedNotes = [];
    reversedNotes = Array.isArray(publicNotes) ? [...publicNotes].reverse() : [];

    useEffect(() => {
        const findNotes = async () => {
            setLoader(true);
            const data = await getPublicNotes();
            setPublicNotes(data?.notes);
            setLoader(false);
        }
        findNotes();
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <div className="flex w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black">
                {leftNavVisibility && <LeftNav />}
                <div className="flex flex-col grow items-center w-[calc(100%-240px)] h-full">
                    <div className="flex justify-between items-center w-[80%] min-h-12 rounded-md font-serif bg-slate-400 text-[1.5rem] mt-6 mb-2 pl-3 text-white">
                        <span>Top Questions</span>
                    </div>
                    <div className='flex flex-col items-start w-[80%] h-auto mt-5 overflow-y-auto'>
                        {loader
                            ? <Spinner />
                            : (reversedNotes.length > 0 ? (
                                reversedNotes.map((note) => (
                                    <DashboardItem key={note?._id} note={note} />
                                ))
                            ) : (
                                <p className="text-white">No notes available</p>
                            )
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Question;
