import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('auth-token')) navigate('/dashboard');
        //eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="flex justify-around items-center flex-wrap w-full h-[calc(100vh-56px)] text-white bg-black translate-y-14">

                {/* left-half */}
                <div className="w-[490px] h-[292px]">
                    <div className="flex flex-col items-center justify-center w-full h-[200px]">
                        <div className="relative flex items-center justify-center h-[140px] w-[90%] text-[10rem]">
                            <div className="text-purple-700 mr-2 h-[120px] flex items-center justify-center glow">Z</div>
                            <div className="text-teal-600 ml-2 h-[120px] flex items-center justify-center glow-teal">C</div>
                        </div>
                        <div className="text-[1.3rem]"><p className="tracking-wide">ZCODER</p></div>
                    </div>
                    <div className="mt-3 text-[1.4rem] flex justify-center items-center px-5 w-full h-[20px]">We welcome you at Zcoder</div>
                </div>

                {/* right-half */}
                <div className="max-w-[550px] h-[240px] mb-5 flex flex-col justify-center items-center">
                    <div className='text-purple-700 flex justify-center items-center w-[95%] h-[50px] p-[5px_10px]'>
                        <h1>Make Learning fun: Zcoder</h1>
                    </div>
                    <div className='flex justify-center items-center w-[95%] h-[130px] m-1'>
                        <p className="text-[1.1rem] p-[5px_10px] leading-[1.5]">ZCoder is a platform which provides users with the ability to create profiles, bookmark coding problems along with their solutions, and engage in a collaborative environment through commenting on each other's solutions.</p>
                    </div>
                    <Link to='/signup' className='flex items-center justify-center text-white p-[5px_10px] w-[139px] h-[43px] rounded-[25px] no-underline border border-purple-700 bg-[rgba(128,0,128,0.15)] cursor-pointer hover:bg-purple-700'>Create Account</Link>
                </div>

            </div>
        </>
    )
}

export default Home
