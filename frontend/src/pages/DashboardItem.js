import React, { useContext, useEffect, useState } from 'react';
import { RiExternalLinkFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/Context';

const DashboardItem = ({ note }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const {getUser, } = useContext(authContext);

    const handleOnClick = (noteId) => {
        if (noteId !== null) {
            navigate(`/problem/${noteId}`);
        } else {
            navigate(`/pageNotFound/error404`);
        }
    };
    const own = () => {
        if (user !== undefined && user?._id === note?.user) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        const fetchData = async () =>{
            if(localStorage.getItem('zcoder-user')){
                const res = localStorage.getItem("zcoder-user");
                const data = JSON.parse(res);
                setUser(data);
            }
            else if(localStorage.getItem('auth-token')){
                const data = await getUser();
                setUser(data);
            }
        }
        fetchData();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="flex flex-col justify-between w-[90%] min-h-[100px] h-auto ml-2 mt-3 mb-3 rounded-sm bg-sky-500/[0.2] text-white border-sky-500 border-[1px]">
            <div onClick={() => handleOnClick(note?._id?.toString())} className="line-clamp-2 cursor-pointer overflow-hidden font-sans min-h-[60px] h-auto w-full pl-3 pr-3 pt-1 pb-1 rounded-sm bg-sky-700 hover:bg-sky-800">
                <p className='text-yellow-500    inline font-semibold text-[1.2rem]'>Problem: </p>{note?.question}
            </div>
            <div className='flex flex-row justify-between mt-2 mb-1 ml-1 mr-1 w-full '>
                <div title="Language" className='flex flex-row w-auto grow cursor-pointer'>
                    {/* language */}
                    <span className='flex justify-center ml-1 mr-1 pl-1 pr-1 min-w-5 w-auto bg-purple-600'>{note?.language}</span>

                    {/* redirect */}
                    {note?.link?.length > 0 && <div onClick={() => {
                        if (note?.link && note?.link?.length > 0) {
                            const url = note?.link.startsWith('http://') || note?.link.startsWith('https://') ? note?.link : `http://${note?.link}`;
                            window.open(url, '_blank');
                        }
                    }} className='flex w-auto items-center cursor-pointer bg-yellow-600 ml-1 pl-1 pr-1 hover:bg-yellow-700'>
                        <RiExternalLinkFill title="Open Link" className="text-[1rem] bg[#87ceeb1a] relative cursor-pointer rounded-full font-bold " />
                    </div>}
                </div>
                <div className='flex flex-row w-auto mr-3'>
                    <span className="flex justify-center items-center rounded-full w-6 h-6 bg-slate-400">{own() ? 'Y' : note?.name?.charAt(0)}</span>
                    <span className='ml-1 mr-1'>{own() ? 'You' : note?.name}</span>
                </div>
            </div>
        </div>
    )
}

export default DashboardItem;
