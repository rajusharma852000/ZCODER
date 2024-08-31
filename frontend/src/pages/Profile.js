import React, { useContext, useEffect } from 'react';
import LeftNav from '../components/LeftNav';
import { FaFacebook, FaLinkedin, FaInstagramSquare, FaGithubSquare } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { authContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import profileLogo from '../images/profileLogo.jpg';

const Profile = (props) => {
  const navigate = useNavigate();
  const { user, getUser, updatedUserDetails, setUpdatedUserDetails, leftNavVisibility } = useContext(authContext);

  const onClickEditProfile = () => {
    navigate('/editProfile');
  }
  const onClickSocialHandles = (event) => {
    const socialHandle = event.currentTarget.getAttribute('name'); // or event.target.name
    const halfURL = updatedUserDetails?.[socialHandle];
    if (halfURL && halfURL?.length > 0) {
      const url = halfURL.startsWith('http://') || halfURL.startsWith('https://') ? halfURL : `http://${halfURL}`;
      window.open(url, '_blank');
    }
  }
  useEffect(()=>{
    if(!localStorage.getItem('auth-token')) navigate('/login');
    // eslint-disable-next-line
},[])
  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    setUpdatedUserDetails(user);
    //eslint-disable-next-line
  }, [user]);



  return (
    <div className="flex w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black">
      {leftNavVisibility && <LeftNav />}
      <div className="relative flex flex-col grow items-center w-[calc(100%-240px)] h-auto overflow-y-auto text-white p-3">
        {/* top div */}
        <div className="relative h-[200px] w-full bg-blue-950 rounded-md">
          <div className="relative flex items-start pt-4 justify-center h-[170px] xs:h-[200px] w-[90%] text-[7rem] xs:text-[10rem]">
            <div className="text-purple-700 mr-2 h-[90px] xs:h-[120px]  flex items-center justify-center glow">Z</div>
            <div className="text-teal-600 ml-2 h-[90px] xs:h-[120px]  flex items-center justify-center glow-teal">C</div>
          </div>
        </div>

        {/* lower div */}
        <div className="relative flex flex-col border-1 border-white w-[calc(100%-30px)] bg-orange-500 mt-[-50px] rounded-md z-10 h-auto">
          <div className="flex xs:p-3 flex-col md:flex-row xs:justify-start h-full w-full">
            <div className='relative flex flex-col h-[150px] xs:h-full justify-center items-center mb-3 mt-6  xs:mt-0'>
              <div className='flex w-auto h-auto'>
                <img className='h-[100px] w-[100px] xs:h-[160px] xs:w-[160px] md:h-[250px] md:w-[250px] xs:mb-4 mb-2 sm:mb-0 rounded-full mx-auto xs:mx-0' src={updatedUserDetails?.profilePicture || profileLogo} alt='' />
              </div>
              <span><p className='xs:text-[0.8rem] text-[0.5rem]'>{updatedUserDetails?.college}</p></span>
              <span className='xs:text-[0.8rem] mb-2 xs:mb-0 text-[0.5rem]'>{updatedUserDetails?.location}</span>
              <div className='flex h-[50px] w-auto justify-center items-center'>
                <FaFacebook onClick={onClickSocialHandles} name='facebook' className='bg-blue-500 rounded-full ml-1 mr-1 text-2xl border-[2px] border-orange-500 hover:border-yellow-400 active:border-green-500' />
                <FaLinkedin onClick={onClickSocialHandles} name='linkedin' className='bg-blue-700 ml-1 mr-1 text-2xl border-[2px] border-orange-500 hover:border-yellow-400 active:border-green-500' />
                <FaInstagramSquare onClick={onClickSocialHandles} name='instagram' className='bg-orange-500 ml-1 mr-1 text-2xl border-[2px] border-orange-500 hover:border-yellow-400 active:border-green-500' />
                <FaGithubSquare onClick={onClickSocialHandles} name='github' className='text-black ml-1 mr-1 text-2xl border-[2px] border-orange-500 hover:border-yellow-400 active:border-green-500' />
                <FaXTwitter onClick={onClickSocialHandles} name='x' className='bg-black ml-1 mr-1 text-2xl border-[2px] border-orange-500 hover:border-yellow-400 active:border-green-500' />
              </div>
            </div>
            <div className=" relative mt-3 flex flex-col xs:ml-8 ml-0 w-[95%] md:w-[calc(100%-200px)] h-auto justify-center items-center xs:items-start">
              <div className='flex items-center justify-center xs:justify-start text-white w-[90%] mb-1 mt-1 bg-orange-600 hover:bg-orange-700 rounded-md flex-wrap'>
                <span className='hidden xs:block font-bold text-[1rem] pl-1 mr-3'>Name :</span>
                <span className='xs:text-[1rem] text-[0.8rem] pr-1'>{updatedUserDetails?.firstName + " " + updatedUserDetails?.lastName}</span>
              </div>
              <div className='flex items-center justify-center xs:justify-start text-white w-[90%] mb-1 mt-1 p-1 bg-orange-600 hover:bg-orange-700 rounded-md'>
                <span className='hidden xs:block font-bold text-[1rem] pl-1 mr-3'>Email :</span>
                <span className='xs:text-[1rem] text-[0.8rem] pr-1'>{updatedUserDetails?.email}</span>
              </div>
              {updatedUserDetails?.dateOfBirth?.length > 0 && <div className='flex items-center justify-center xs:justify-start text-white w-[90%] mb-1 mt-1 p-1 bg-orange-600 hover:bg-orange-700 rounded-md'>
                <span className='hidden xs:block font-bold text-[1rem] pl-1 mr-3'>DOB :</span>
                <span className='xs:text-[1rem] text-[0.8rem] pr-1'>{updatedUserDetails?.dateOfBirth?.split('T')[0]}</span>
              </div>}
              <div className='flex items-center justify-center xs:justify-start text-white w-[90%] mb-1 mt-1 p-1 bg-orange-600 hover:bg-orange-700 rounded-md'>
                <span className='hidden xs:block font-bold text-[1rem] pl-1 mr-3'>Profession :</span>
                <span className='xs:text-[1rem] text-[0.8rem] pr-1'>{updatedUserDetails?.profession}</span>
              </div>
              <div className='flex items-center justify-center xs:justify-start text-white w-[90%] mb-1 mt-1 p-1 bg-orange-600 hover:bg-orange-700 rounded-md'>
                <span className='hidden xs:block font-bold text-[1rem] pl-1 mr-3'>College/Company :</span>
                <span className='xs:text-[1rem] text-[0.8rem] pr-1'>{updatedUserDetails?.college}</span>
              </div>

              {updatedUserDetails?.technicalSkills?.length > 0 && <div className="w-[90%] flex justify-center xs:justify-start h-auto p-1 bg-orange-600 border-orange-600 hover:bg-orange-700 border-2">
                <div className='hidden xs:block w-[130px] font-bold text-[1rem] pl-1 mr-3'>Technical Skills :</div>
                <div className='flex flex-wrap gap-x-2 h-auto'>
                  {updatedUserDetails?.technicalSkills?.map((skill, index) => {
                    return (
                      <div key={index} className="bg-orange-700 px-1 flex items-center xs:h-6 h-5 mt-1 mb-1 xs:text-[1rem] text-[0.8rem]">
                        <span>{skill}</span>
                      </div>
                    )
                  })}
                </div>
              </div>}

            </div>
          </div>
          <div className="flex justify-end w-full px-2 py-2 ">
            <button onClick={onClickEditProfile} className='flex justify-center items-center xs:w-[110px] w-[85px] px-1 h-6 xs:h-9 text-[0.7rem] xs:text-[1rem] border-[1px] border-white text-white bg-green-600 hover:bg-green-700 rounded-sm'>Edit Profile<FaArrowCircleRight className='ml-2' /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
