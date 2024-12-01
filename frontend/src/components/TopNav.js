import React, { useContext, useEffect, useState } from 'react';
import { SlMenu } from 'react-icons/sl';
import { CgClose } from 'react-icons/cg';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { authContext } from '../context/Context';
import profileLogo from '../images/profileLogo.jpg';

const TopNav = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { getUser, leftNavVisibility, setLeftNavVisibility } = useContext(authContext);
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('zcoder-user') !== null) {
            const res = localStorage.getItem("zcoder-user");
            const data = JSON?.parse(res);
            setUser(data);
        }
        else {
            const fetchUser = async () => {
                if (localStorage.getItem('auth-token')) {
                    const res = await getUser();
                    setUser(res);
                    localStorage.setItem("zcoder-user", JSON.stringify(res));
                }
            }
            fetchUser();
        }
        //eslint-disable-next-line
    }, [location]);

    const onClickLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('zcoder-user');
        navigate('/login');
    }

    const onClickToogleLeftNav = () => {
        setLeftNavVisibility(!leftNavVisibility);
    }

    return (
        <>
            {
                localStorage.getItem('auth-token') ?
                    <>
                        <div className="fixed top-0  z-10 flex flex-row items-center justify-between w-full min-w-[100vw] h-14 px-4 md:px-5 dark:bg-black">
                            <div className='flex h-5 items-center'>

                                {/* sidebar controls */}
                                <div onClick={onClickToogleLeftNav} className="flex  md:mr-3 curson-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                                    {leftNavVisibility ? (
                                        <CgClose className='text-white text-xl' />
                                    ) : (
                                        <SlMenu className='text-white text-xl' />
                                    )
                                    }
                                </div>

                                {/* Website Name */}
                                <div className="flex items-center justify-center text-white italic text-[1.5rem] font-bold bg-blue-700 w-[110px]">ZCODER</div>
                            </div>
                            {/* <div className="group flex items-center">
                                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                                        <IoIosSearch className="text-white text-xl" />
                                    </div>
                                    <input
                                        type="text"
                                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                                        onChange={(e) => { }}
                                        placeholder="Search"
                                    />
                                </div>
                                <button className='w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]'>
                                    <IoIosSearch className='text-white text-xl' />
                                </button>
                            </div> */}
                            <div className="flex items-center">
                                <button className='w-[85px] h-7 bg-red-600 text-white rounded-sm hover:bg-red-700 mr-3'
                                    onClick={onClickLogout}
                                >Signout</button>
                                <div className="flex h-8 w-auto overflow-hidden rounded-full md:ml-4 text-white">
                                    <img onClick={() => { navigate('/profile') }} className='h-8 w-8 rounded-full cursor-pointer' src={user?.profilePicture || profileLogo} alt='' />
                                    <p onClick={() => { navigate('/profile') }} className='ml-2 cursor-pointer'>{user?.firstName}</p>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="fixed top-0  z-10 flex flex-row items-center justify-between w-full min-w-[100vw] h-14 px-4 md:px-5 dark:bg-black">
                            <div className='after-login'>
                                <ul className='list-none flex items-center py-[10px] px-[20px] flex-wrap'>
                                    <li> <NavLink className='no-underline my-[10px] mx-[30px] text-white hover:text-[#ae1ad3] active:text-[#045588]' to='/'> Home  </NavLink></li>
                                    <li> <NavLink className='no-underline my-[10px] mx-[30px] text-white hover:text-[#ae1ad3] active:text-[#045588]' to='/dashboard'> Dashboard  </NavLink></li>
                                </ul>
                            </div>
                            <div className="before-login">
                                <ul className='list-none flex items-center py-[10px] px-[20px] flex-wrap'>
                                    <li> <NavLink className='no-underline my-[10px] mx-[30px] text-white hover:text-[#ae1ad3] active:text-[#045588]' to='/login'> Login  </NavLink></li>
                                    <li> <NavLink className='no-underline my-[10px] mx-[30px] text-white hover:text-[#ae1ad3] active:text-[#045588]' to='/Signup'> Signup  </NavLink></li>
                                </ul>
                            </div>
                        </div>

                    </>
            }
        </>
    )
}

export default TopNav
