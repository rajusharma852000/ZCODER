import React from 'react';
import { FaTag, FaQuestionCircle, FaTrophy, FaUser, FaBookmark, FaStar, FaTachometerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LeftNav = () => {
    return (
        <>
            {localStorage.getItem('auth-token') && (
                <div className='hidden lg:block w-[240px] overflow-y-auto h-full py-4 bg-[#0f0f10] absolute md:relative z-10 md:translate-x-0 transition-all'>
                    <div className="flex flex-col justify-center h-auto w-[200px] text-white    ">
                        <Link to='/dashboard'><div className="flex w-full items-center text-[15px] font-medium ml-2 text-white mt-8 mb-3 pl-2 pr-2 pt-1 pb-1 hover:rounded-2 hover:bg-white/[0.15]">
                            <FaTachometerAlt />
                            <span className='ml-2'>Dashboard</span>
                        </div></Link>
                        <Link to='/profile'><div className="flex w-full items-center text-[15px] font-medium ml-2 text-white mt-3 mb-3 pl-2 pr-2 pt-1 pb-1 hover:rounded-2 hover:bg-white/[0.15]">
                            <FaUser />
                            <span className='ml-2'>Profile</span>
                        </div></Link>
                        <Link to='/question'><div className="flex w-full items-center text-[15px] font-medium ml-2 text-white mt-3 mb-3 pl-2 pr-2 pt-1 pb-1 hover:rounded-2 hover:bg-white/[0.15]">
                            <FaQuestionCircle />
                            <span className='ml-2'>Questions</span>
                        </div></Link>
                        <Link to='/contests'><div className="flex w-full items-center text-[15px] font-medium ml-2 text-white mt-3 mb-3 pl-2 pr-2 pt-1 pb-1 hover:rounded-2 hover:bg-white/[0.15]">
                            <FaTrophy />
                            <span className='ml-2'>Contests</span>
                        </div></Link>
                        <Link to='/revision'><div className="flex w-full items-center text-[15px] font-medium ml-2 text-white mt-3 mb-3 pl-2 pr-2 pt-1 pb-1 hover:rounded-2 hover:bg-white/[0.15]">
                            <FaStar />
                            <span className='ml-2'>Revision</span>
                        </div></Link>
                        <Link to='/saved'><div className="flex w-full items-center text-[15px] font-medium ml-2 text-white mt-3 mb-3 pl-2 pr-2 pt-1 pb-1 hover:rounded-2 hover:bg-white/[0.15]">
                            <FaBookmark />
                            <span className='ml-2'>Saved</span>
                        </div></Link>
                        {/* <Link to='/tag'><div className="flex w-full items-center text-[15px] font-medium ml-2 text-white mt-3 mb-3 pl-2 pr-2 pt-1 pb-1 hover:rounded-2 hover:bg-white/[0.15]">
                            <FaTag />
                            <span className='ml-2'>Tag</span>
                        </div></Link> */}
                    </div>

                    {/* ZCoder logo */}
                    <div className="w-full flex items-center mt-4 mb-3">
                        <div className="flex flex-col justify-center items-center w-[78px] h-[78px] ml-2 border-sky-600 bg-blue-950 rounded-full border-[1px] ">
                            <div className="flex justify-center items-center text-[2.5rem]">
                                <div className="h-11 flex justify-center items-center text-purple-600 glow">Z</div>
                                <div className="h-11 flex justify-center items-center text-green-600 glow-teal">C</div>
                            </div>
                            <div className="text-[10px] text-yellow-500">ZCODER</div>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default LeftNav;
