import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/Context';
import {toast} from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const {login} = useContext(authContext);

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await login(credentials);
    if (res?.success) {
      toast.success("Login successful");
      localStorage.setItem('auth-token', res.authToken);
      navigate('/dashboard');
    }
    else{
      toast.error("Failed: Invalid credentials");
    }
    setCredentials({ email: "", password: "" });
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 overflow-y-auto bg-black">
        <div className="flex flex-col items-center relative h-[500px] w-[430px] border-[#87ceeb] border-[1px] bg-[#87ceeb]/[0.1]">
          <div className="flex flex-col justify-center items-center mb-2 mt-2 h-[85px] w-[90%]">
            <div className="flex justify-center items-center text-[3rem]">
              <div className="flex items-center justify-center mr-[1px] h-12 text-[#800080] ">Z</div>
              <div className="flex items-center justify-center ml-[1px] h-12 text-[#008075] ">C</div>
            </div>
            <div className="mt-[-4px] text-[0.8rem] text-white">ZCODER</div>
          </div>
          <form className='credentials-form w-[99%]' onSubmit={onSubmit}>
            <div className="flex flex-col justify-evenly items-center w-[99%] min-h-[200px] mb-5">
              <input onChange={onChange} type='email' name='email' value={credentials.email} className='bg-[#eff3f3] w-[80%] h-12 text-[1rem] rounded-sm p-[2px_10px] m-1.5' placeholder='email' autoComplete='email'></input>
              <input onChange={onChange} type='password' name='password' value={credentials.password} className='bg-[#eff3f3] w-[80%] h-12 text-[1rem] rounded-sm p-[2px_10px] m-1.5' placeholder='password' autoComplete='current-password'></input>
            </div>
            <button type='submit' className='bg-orange-500 text-white font-bold w-[87%] h-12 text-[1.2rem] rounded-sm py-[3px] px-[15px] ml-[25px] hover:bg-orange-600'>Login</button>
            <div className="h-[50px] mt-[10px] flex justify-between items-center w-[95%]">
              <Link to='/forgotpassword' className='my-0 mx-5 no-underline text-gray-400 hover:text-blue-700'>Forgot Password</Link>
              <Link to='/signup' className='my-0 mx-5 no-underline text-gray-400 hover:text-blue-700'>Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
