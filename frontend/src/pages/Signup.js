import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ firstName: "", lastName: "", email: "", password: "" })

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://zcoder-backend-0wh6.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken);
            navigate('/');
        }
        else {
            console.log({"Invalid Credentials": json.error});
        }
        setCredentials({});
    }
    return (
        <div className="flex items-center justify-center w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 overflow-y-auto bg-black">
            <div className="flex flex-col items-center relative h-[500px] w-[430px] border-[#87ceeb] border-[1px] bg-[#87ceeb]/[0.1]">
                <div className="flex flex-col justify-center items-center mb-2 mt-2 h-[85px] w-[90%]">
                    <div className="flex justify-center items-center text-[3rem]">
                        <div className="flex items-center justify-center mr-[1px] h-12 text-[#800080] ">Z</div>
                        <div className="flex items-center justify-center ml-[1px] h-12 text-[#008075] ">C</div>
                    </div>
                    <div className="mt-[-4px] text-[0.8rem] text-white">ZCODER</div>
                </div>
                <form className='w-[99%]' onSubmit={onSubmit}>
                    <div className="flex flex-col justify-evenly items-center w-[99%] min-h-[250px] mb-5">
                        <input onChange={onChange} name='firstName' value={credentials.firstName} type='text' className='bg-[#eff3f3] w-[80%] h-11 text-[1rem] rounded-sm py-[2px] px-[10px] m-[5px]' placeholder='First Name' />
                        <input onChange={onChange} name='lastName' value={credentials.lastName} type='text' className='bg-[#eff3f3] w-[80%] h-11 text-[1rem] rounded-sm py-[2px] px-[10px] m-[5px]' placeholder='Last Name' />
                        <input onChange={onChange} name='email' value={credentials.email} type='email' className='bg-[#eff3f3] w-[80%] h-11 text-[1rem] rounded-sm py-[2px] px-[10px] m-[5px]' placeholder='Email' autoComplete='email' />
                        <input onChange={onChange} name='password' value={credentials.password} type='password' className='bg-[#eff3f3] w-[80%] h-11 text-[1rem] rounded-sm py-[2px] px-[10px] m-[5px]' placeholder='Password' autoComplete='current-password' />
                    </div>
                    <button type='submit' className='bg-orange-500 text-white font-bold w-[87%] h-12 text-[1.1rem] rounded-sm py-[3px] px-[15px] ml-[25px] hover:bg-orange-600'>Sign Up</button>
                    <div className="h-[50px] mt-[10px] flex justify-between items-center w-[95%]">
                        <Link to='/forgotpassword' className='my-0 mx-5 no-underline text-gray-400 hover:text-blue-700'>Forgot Password</Link>
                        <Link to='/login' className='my-0 mx-5 no-underline text-gray-400 hover:text-blue-700'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
