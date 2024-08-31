import React, { useContext, useEffect, useState, useRef } from 'react';
import LeftNav from '../components/LeftNav';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams, useNavigate } from 'react-router-dom';
import { authContext, noteContext } from '../context/Context';
import { RiExternalLinkFill, RiDeleteBin6Line } from "react-icons/ri";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { FaPlus, FaEdit } from "react-icons/fa";

const DisplayItem = (props) => {
  const navigate = useNavigate();

  //custom styles
  const customStyleTomorrow = { ...tomorrow, 'pre[class*="language-"]': { ...tomorrow['pre[class*="language-"]'], backgroundColor: '#000622', margin: '0px' } };
  const customAtomOneDark = { ...atomOneDark, hljs: { ...atomOneDark.hljs, backgroundColor: '#000622', paddingBottom: '20px', scrollbarWidth: 'thin', scrollbarColor: '#bc6708 #000622' } };

  const { findNote, noteFound, editNote, deleteNote } = useContext(noteContext);
  const { user, getUser, leftNavVisibility } = useContext(authContext);
  const [newNote, setNewNote] = useState(noteFound);
  const [updatedNote, setUpdatedNote] = useState(noteFound);

  //defining modals
  const refLinkModal = useRef(null);
  const refAnswerModal = useRef(null);
  const refQuestionModal = useRef(null);


  const { id } = useParams();
  const own = () => {
    if (user._id !== noteFound.user) {
      return false;
    }
    return true;
  }

  const handleEditVisibility = () => {
    editNote({ ...updatedNote, visibility: !newNote?.visibility });
    setUpdatedNote({ ...updatedNote, visibility: !newNote?.visibility });
    setNewNote({ ...newNote, visibility: !newNote?.visibility })
  }
  const handleEditDelete = () => {
    const noteId = noteFound?._id;
    deleteNote(noteId);
    navigate('/dashboard');
  }
  const handleEditImportant = () => {
    setUpdatedNote({ ...newNote, important: !newNote?.important });
    editNote({ ...newNote, important: !newNote.important });
    setNewNote({ ...newNote, important: !newNote?.important })
  }

  const handleEditAnswer = () => {
    refAnswerModal.current.style.display = 'block';
  }
  const handleEditQuestion = () => {
    refQuestionModal.current.style.display = 'block';
  }
  const handleEditLink = () => {
    refLinkModal.current.style.display = 'block';
  }

  const onChangeNote = (event) => {
    setNewNote({ ...newNote, [event.target.name]: event.target.value });
  }

  const closeRespectiveModal = (target) => {
    if (target === 'link')
      refLinkModal.current.style.display = 'none';
    else if (target === 'code')
      refAnswerModal.current.style.display = 'none';
    else if (target === 'question')
      refQuestionModal.current.style.display = 'none';
  }
  const handleSaveNote = (event) => {
    event.preventDefault();
    setUpdatedNote(newNote);
    editNote(newNote);
    closeRespectiveModal(event.target.name);
  }
  const handleCloseModal = (event) => {
    closeRespectiveModal(event.target.name);
  }

  useEffect(() => {
    if (id) {
      findNote(id);
      getUser();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setNewNote(noteFound);
    setUpdatedNote(noteFound);
  }, [noteFound])
  return (
    <>
      <div className="flex w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black">
        {leftNavVisibility && <LeftNav />}
        <div className="flex w-[calc(100%-240px)] grow h-full items-center justify-center">
          <div className="flex flex-col items-center w-full h-full">

            {/* tools */}
            {own() && <div className="flex flex-wrap items-center w-[90%] mt-3 pb-2 pt-2 pl-2 pr-2 h-auto bg-slate-500/[0.4] border-slate-500 border-[1px] text-white rounded-sm ">
              {localStorage.getItem('auth-token') &&
                <>
                  <div onClick={handleEditQuestion} className="inline-block bg-sky-500 hover:bg-sky-600 m-1 p-1">
                    {/* <span className="ml-[2px] text-[1rem] relative cursor-pointer rounded-full font-bold text-sky-500" id="edit-icon">&#9998;</span> */}
                    <FaEdit className="ml-[2px] text-[1rem] relative cursor-pointer rounded-full font-bold"/>
                    {/* <span className="ml-[2px] mr-[2px] cursor-pointer">Edit Question</span> */}
                  </div>
                  <div onClick={handleEditAnswer} className="inline-block bg-pink-600 hover:bg-pink-700 mx-1 my-1 px-1 py-1">
                    {/* <span className="text-[1rem] relative cursor-pointer rounded-full font-bold" id="plus-icon">+</span> */}
                    <FaPlus className="text-[1rem] relative cursor-pointer rounded-full font-bold"/>
                    {/* <span className="ml-[2px] mr-[2px] cursor-pointer">Solution</span> */}
                  </div>
                  <div onClick={handleEditLink} className="inline-block bg-blue-600 hover:bg-blue-700 mx-1 my-1 px-1">
                    <span className="ml-[2px] text-[0.9rem] relative cursor-pointer rounded-full font-bold" id="link-icon">&#128279;</span>
                  </div>
                  {newNote?.link?.length > 0 && <div onClick={() => {
                    if (newNote?.link && newNote?.link?.length > 0) {
                      const url = newNote?.link?.startsWith('http://') || newNote?.link?.startsWith('https://') ? newNote?.link : `http://${newNote?.link}`;
                      window.open(url, '_blank');
                    }
                  }} className='flex w-auto items-center bg-yellow-500 hover:bg-yellow-600 mx-1 my-1 px-1 py-1'>
                    <RiExternalLinkFill className="text-[1rem] bg[#87ceeb1a] relative cursor-pointer rounded-full font-bold " />
                  </div>}
                  <div onClick={handleEditImportant} className="px-1 inline-block bg-slate-600 hover:bg-slate-700 mx-1 my-1">
                    <span className={`text-[1rem] relative cursor-pointer rounded-full font-bold ${newNote?.important ? 'text-[#ffd700]' : 'text-white'} `} id="star-icon">&#9733;</span>
                  </div>
                  <div onClick={handleEditDelete} className="inline-block bg-red-600 hover:bg-red-700 m-1 p-1">
                    <RiDeleteBin6Line className="text-[1rem] bg[#87ceeb1a] relative cursor-pointer rounded-full font-bold " />
                  </div>
                  <div onClick={handleEditVisibility} className={`px-1 m-1 flex cursor-pointer items-center ${newNote?.visibility === true ? 'bg-teal-600 hover:bg-teal-700' : 'bg-[#cf0a35] hover:bg-[#a11f3b]'}`}>
                    {newNote?.visibility ? (
                      <FaLockOpen className='h-[23px]' />
                    ) : (
                      <FaLock className='h-[23px]' />
                    )
                    }
                  </div>

                </>}
            </div>
            }


            <div className="w-full h-full sm:mt-2 mt-3 pb-2 pt-2 pl-2 pr-2 overflow-y-auto rounded-md text-white flex flex-col items-center">

              {/* Question */}
              <div className='flex justify-between w-[90%] rounded-md min-w-[200px] h-10 pl-3 pr-3 pt-1 pb-1 mb-[-8px] bg-[#000622] font-semibold text-[1.5rem] font-serif text-white border-yellow-700 border-solid border-[1px] border-b-0'>
                <span className='text-[1. 5rem] text-yellow-400'>Question:</span>
                <div className="flex items-center justify-center w-auto h-full">
                  <span className='flex items-center justify-center h-5 w-5 text-[1rem] rounded-full bg-teal-600'>{own() ? 'Y' : updatedNote?.name?.charAt(0)}</span>
                  <span className='text-[1rem] text-pink-500'>{own() ? 'You' : updatedNote?.name}</span>
                </div>
              </div>
              <div className="h-auto w-[90%] min-w-[200px] pt-1 mb-4 rounded-md border-yellow-700 border-solid border-[1px] border-t-0">
                <SyntaxHighlighter language="jsx" style={customStyleTomorrow} lineProps={{ style: { whiteSpace: 'pre-wrap' } }} wrapLines={true}>
                  {updatedNote.question}
                </SyntaxHighlighter>
              </div>


              {/* Answer */}
              <div className='flex justify-between w-[90%] rounded-md min-w-[200px] h-10 pl-3 pr-3 pt-1 pb-1 mb-[-8px] bg-[#000622] font-semibold text-[1.5rem] font-serif text-white border-yellow-700 border-solid border-[1px] border-b-0'>
                <span className='text-[1. 5rem] text-yellow-400'>Solution:</span>
                <div className="flex items-center justify-center w-auto h-full">
                  <span className='flex items-center justify-center h-5 w-5 text-[1rem] rounded-full bg-teal-600'>{own() ? 'Y' : updatedNote?.name?.charAt(0)}</span>
                  <span className='text-[1rem] text-pink-500'>{own() ? 'You' : updatedNote?.name}</span>
                </div>
              </div>
              <div className="h-auto w-[90%] min-w-[200px] pt-1 rounded-md border-yellow-700 border-solid border-[1px] border-t-0">
                <SyntaxHighlighter language="javascript" style={customAtomOneDark} customStyle={{ msOverflowStyle: 'none', paddingLeft: '12px' }}>
                  {updatedNote.code}
                </SyntaxHighlighter>
              </div>

            </div>

          </div>
        </div>
      </div>



      {/*1. modal to add link */}
      <form className='hidden' ref={refLinkModal} >
        <div className="w-[30vw] h-[30vh] bg-black border-black border-[1px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex flex-col items-center justify-center relative w-[30vw] h-[40vh] bg-black border-[1px] border-white">
            <label htmlFor="link" className="text-2xl text-white"><strong>Enter the link</strong></label>
            <input onChange={onChangeNote} placeholder='link' type="text" value={newNote?.link} id="link" name='link' className="w-[80%] h-[42px] px-4 py-2 text-lg font-sans mb-2 text-white bg-purple-700/[0.2] border-purple-600 border-[1px] hover:bg-purple-800/[0.2] hover:border-purple-700" />
            <button onClick={handleSaveNote} name='link' disabled={newNote?.link?.length < 1} type="submit" className={`relative mx-auto w-[80%] h-[40px] text-white m-2  ${newNote?.link?.length < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700/[0.2] hover:bg-green-800/[0.2] border-green-600 hover:bg-green-700 border-[1px] cursor-pointer'}`}>Add</button>
            <button onClick={handleCloseModal} name='link' type="button" className="relative mx-auto w-[80%] h-[40px] text-white m-2 cursor-pointer bg-red-700/[0.2] hover:bg-red-800/[0.2] border-red-600 hover:bg-red-700 border-[1px]">Close</button>
          </div>
        </div>
      </form >

      {/* 2. modal to update solution */}
      < form className='hidden' ref={refAnswerModal} >
        <div className="w-[70vw] h-auto bg-black border-black border-[1px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex flex-col relative w-[70vw] h-[80vh] bg-black border-[1px] border-white">
            <label htmlFor="code" className="text-xl mt-1 mb-2 ml-[5%] text-white"><strong>Update Solution:</strong></label>
            <textarea onChange={onChangeNote} placeholder='type answer here...' type="text" value={newNote?.code} id="code" name='code' className="reltive mx-auto w-[90%] h-[90%] px-4 py-2 text-lg font-sans mb-2 bg-sky-800/[0.2] border-[1px] border-sky-600 hover:bg-sky-900/[0.2] hover:border-sky-700 text-white" />
            <button onClick={handleSaveNote} name='code' disabled={newNote?.code?.length < 1} type="submit" className={`relative mx-auto w-[80%] h-[40px] text-white m-2  ${newNote?.code?.length < 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-700/[0.2] hover:bg-green-800/[0.2] border-green-600 hover:bg-green-700 border-[1px] cursor-pointer'}`}>Update</button>
            <button onClick={handleCloseModal} name='code' type="button" className="relative mx-auto w-[80%] h-[40px] text-white m-2 cursor-pointer bg-red-700/[0.2] hover:bg-red-800/[0.2] border-red-600 hover:bg-red-700 border-[1px]">Close</button>
          </div>
        </div>
      </ form >

      {/* 3. modal to update question */}
      < form className='hidden' ref={refQuestionModal} >
        <div className="w-[70vw] h-auto bg-black border-black border-[1px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex flex-col relative w-[70vw] h-[80vh] bg-black border-[1px] border-white">
            <label htmlFor="question" className="text-xl mt-1 mb-2 ml-[5%] text-white"><strong>Update Question:</strong></label>
            <textarea onChange={onChangeNote} placeholder='type question here...' type="text" value={newNote?.question} id="question" name='question' className="reltive mx-auto w-[90%] h-[90%] px-4 py-2 text-lg font-sans mb-2 bg-sky-800/[0.2] border-[1px] border-sky-600 hover:bg-sky-900/[0.2] hover:border-sky-700 text-white" />
            <button onClick={handleSaveNote} name='question' disabled={newNote?.question?.length < 1} type="submit" className={`relative mx-auto w-[80%] h-[40px] text-white m-2  ${newNote?.question?.length < 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-700/[0.2] hover:bg-green-800/[0.2] border-green-600 hover:bg-green-700 border-[1px] cursor-pointer'}`}>Update</button>
            <button onClick={handleCloseModal} name='question' type="button" className="relative mx-auto w-[80%] h-[40px] text-white m-2 cursor-pointer bg-red-700/[0.2] hover:bg-red-800/[0.2] border-red-600 hover:bg-red-700 border-[1px]">Close</button>
          </div>
        </div>
      </ form >
    </>
  )
}

export default DisplayItem;
