import React, { useContext, useState } from 'react';
import LeftNav from './LeftNav';
import { noteContext, authContext } from '../context/Context';
import { useNavigate, useParams } from 'react-router-dom';

const AddModal = () => {
    const {userName} = useParams();
    const navigate = useNavigate();
    const Context = useContext(noteContext);
    const {leftNavVisibility} = useContext(authContext);
    const { addNote } = Context;
    const [credentials, setCredentials] = useState({ question: "", code: "", link: "", language: "", name: userName });
    const saveOnClick = () => {
        addNote(credentials);
        navigate('/question');
    }
    const closeOnClick = () => {
        navigate('/question');
    }
    const handleOnChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className="flex w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black">
            {leftNavVisibility && <LeftNav />}
                <div className="flex flex-col grow items-center w-[calc(100%-240px)] h-full overflow-y-auto text-white">

                    {/* your question */}
                    <div className="flex flex-col w-[85%] md:mt-5 mt-2">
                        <label htmlFor='question' className='text-[1.3rem] mb-1 text-yellow-500'>Question<strong className='text-red-500'>*</strong></label>
                        <textarea onChange={handleOnChange} value={credentials?.question} name="question" id="question" placeholder='type question here...' rows='5' className='w-full min-w-[200px] pl-3 pt-1 pb-1 pr-3 bg-purple-600/[0.2] border-purple-600 border-[1px] rounded-md hover:border-purple-700 hover:bg-purple-700/[0.2]'></textarea>
                    </div>
                    {/* your answer */}
                    <div className="flex flex-col w-[85%] md:mt-5 mt-2">
                        <label htmlFor='code' className='text-[1.3rem] mb-1 text-yellow-500'>Answer<strong className='text-red-500'>*</strong></label>
                        <textarea onChange={handleOnChange} value={credentials?.code} name="code" id="code" placeholder='type code here...' rows='12' className='w-full min-w-[200px] pl-3 pt-1 pb-1 pr-3 bg-purple-600/[0.2] border-purple-600 border-[1px] rounded-md hover:border-purple-700 hover:bg-purple-700/[0.2]'></textarea>
                    </div>

                    {/* add link */}
                    <div className="flex flex-col w-[85%] md:mt-10 mt-2">
                        <label htmlFor='link' className='text-[1.3rem] mb-1 text-yellow-500'>Link</label>
                        <input onChange={handleOnChange} value={credentials?.link} name="link" id="link" placeholder='Enter link here...' className='w-full min-w-[200px] pl-3 pt-1 pb-1 pr-3 bg-purple-600/[0.2] border-purple-600 border-[1px] rounded-md hover:border-purple-700 hover:bg-purple-700/[0.2]'></input>
                    </div>
                    {/* add language */}
                    <div className="flex flex-col w-[85%] md:mt-10 mt-2">
                        <label htmlFor='language' className='text-[1.3rem] mb-1 text-yellow-500'>language</label>
                        <input onChange={handleOnChange} value={credentials?.language} name="language" id="language" placeholder='Enter language here...' className='w-full min-w-[200px] pl-3 pt-1 pb-1 pr-3 bg-purple-600/[0.2] border-purple-600 border-[1px] rounded-md hover:border-purple-700 hover:bg-purple-700/[0.2]'></input>
                    </div>

                    <div className="flex flex-row h-auto justify-end w-[85%] pr-5 mt-10 mb-14">
                        <button onClick={saveOnClick} className='w-[100px] h-8 mr-2 bg-teal-500/[0.2] border-teal-400 border-[1px] hover:bg-teal-600/[0.2] hover:border-teal-600'>Save</button>
                        <button onClick={closeOnClick} className='w-[100px] h-8 ml-2 bg-red-500/[0.2] border-red-500 border-[1px] hover:bg-red-600/[0.2] hover:border-red-600'>Close</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default AddModal
