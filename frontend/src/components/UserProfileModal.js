import React, { useContext, useEffect, useState } from 'react';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import LeftNav from './LeftNav';
import { useNavigate } from 'react-router-dom';
import profileLogo from '../images/profileLogo.jpg';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { authContext } from '../context/Context';
import ReactCrop from 'react-image-crop';
import { toast } from 'react-hot-toast'
import 'react-image-crop/dist/ReactCrop.css';
import Spinner from './Spinner';

const UserProfileModal = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [skills, setSkills] = useState([]);
    const [showTechnicalSkillModal, setShowTechnicalSkillModal] = useState(false);
    const [pass, setPass] = useState({ password: '', confirmPassword: '' });
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [loader, setLoader] = useState(false);
    const [passVisibility, setPassVisibility] = useState({ passwordVisibility: false, confirmPasswordVisibility: false })

    const { getUser, updateUser, leftNavVisibility } = useContext(authContext);

    useEffect(() => {
        const fetchUser = async () => {
            setLoader(true);
            // const res = await getUser();
            const data = localStorage.getItem("zcoder-user");
            const res = JSON.parse(data);
            setUser(res);
            setUser(res);
            setSkills(res?.technicalSkills);
            setLoader(false);
        }
        fetchUser();
        //eslint-disable-next-line
    }, []);

    const handleFileChange = (event) => {
        selectFile(URL?.createObjectURL(event?.target?.files[0]));
        const imageModal = document.querySelector('.imageModal');
        imageModal.style.display = 'flex';
    }

    const cancleCroppingImage = () => {
        const imageModal = document.querySelector('.imageModal');
        imageModal.style.display = 'none';
    }
    const getCroppedImage = () => {
        const imageModal = document.querySelector('.imageModal');

        if (!image || !crop.width || !crop.height) {
            imageModal.style.display = 'none';
            toast.error("can't update image");
            return;
        }

        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        const base64Image = canvas.toDataURL('image/jpeg');
        setUser({ ...user, profilePicture: base64Image });
        selectFile(null);
        imageModal.style.display = 'none';
        toast.success('image updated successfully');
    };
    const edituser = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    const onClickSaveuser = () => {
        setUser(user);
        updateUser(user);
        toast.success("updated successfully");
    }
    const onClickSavePasswordDetails = () => {
        if (pass?.password === pass?.confirmPassword) {
            setUser({ ...user, password: pass?.confirmPassword });
            updateUser({ user, password: pass?.confirmPassword });
            toast.success("changed successfully");
        }
        else toast.error("password doesn't match");
    }
    const onClickClearPasswordDetails = (event) => {
        setPass({ password: '', confirmPassword: '' });
    }
    const onChangeEditPassword = (event) => {
        setPass({ ...pass, [event.target.name]: event.target.value })
    }
    const togglePasswordVisibility = () => {
        setPassVisibility({ ...passVisibility, passwordVisibility: !passVisibility?.passwordVisibility });
    }
    const toggleConfirmPasswordVisibility = () => {
        setPassVisibility({ ...passVisibility, confirmPasswordVisibility: !passVisibility?.confirmPasswordVisibility });
    }
    const handleBackToProfile = () => {
        navigate('/profile');
    }
    const handleEditTechnicalSkills = () => {
        document.querySelector('input[name="skill"]').value = '';
        setShowTechnicalSkillModal(true);
    }
    const closeSkillModal = () => {
        setShowTechnicalSkillModal(false);
    }
    const onClickSaveUserSkillDetails = () => {
        updateUser({ ...user, technicalSkills: skills })
        toast.success("Skills updated successfully")
    }
    const addANewSkill = () => {
        const inputField = document.querySelector('input[name="skill"]');
        let isPresent = false;
        skills.forEach((ele) => {
            if (inputField?.value?.length === 0 || inputField?.value?.length > 15 || ele === inputField?.value) isPresent = true;
        })

        if (!isPresent) {
            setSkills(prevSkills => {
                const newSkills = [...prevSkills, inputField?.value];
                setUser({ ...user, technicalSkills: newSkills });
                return newSkills;
            });
        }
        setShowTechnicalSkillModal(false);
    }
    const deleteSkill = (skill) => {
        let newSkills = skills?.filter((ele) => {
            if (ele !== skill) return true;
            else return false;
        })
        setSkills(newSkills);
        setUser({ ...user, technicalSkills: newSkills });
    }
    const onClickUploadProfilePicture = () => {
        setUser(user);
        updateUser(user);
        toast.success("uploaded successfully");
    }


    return (
        <>

            <div onClick={() => { showTechnicalSkillModal && setShowTechnicalSkillModal(false) }} className="flex w-full h-[calc(100%-56px)] absolute top-0 left-0 translate-y-14 bg-black">
                {leftNavVisibility && <LeftNav />}
                <div className="flex flex-col grow w-[calc(100%-240px)] h-full overflow-y-auto text-white p-3">
                    <button onClick={handleBackToProfile} className='flex justify-center items-center w-[170px] rounded-md px-2 h-10 py-3 text-white bg-[#27272a] text-[1.2rem] hover:bg-zinc-700'> <IoArrowBackCircleSharp className='mr-1 text-xl' />Back to Profile</button>

                    {loader ? <Spinner /> : (<><div className="flex flex-col mt-5 bg-[#27272a] w-full p-3 rounded-md">
                        <div className="flex justify-center px-4 w-full mt-6 border-b-2 border-b-zinc-600">
                            <div className='w-[47%]'>
                                <p className='font-bold text-[2rem]'>Basic Details</p>
                                <p>name, email, phone etc.</p>
                            </div>
                            <div className="w-[47%] flex flex-col">
                                <div className="flex">
                                    <img src={user?.profilePicture || profileLogo} alt="Profile Logo" className="w-24 h-24 mr-1 rounded-md" />
                                    <label htmlFor="dropzone_file" className='flex flex-col items-center justify-center w-full h-24 border-2 mr-1 border-gray-300 dark:border-zinc-600 border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-zinc-900'>
                                        <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'><span className='font-semibold'>Click to Upload </span> or drag and drop</p>
                                        <p className='text-xs text-gray-500 dark:text-gray-400'>PNG, JPG or JPEG (Max. 1mb)</p>
                                    </label>
                                    <input onChange={handleFileChange} type="file" className='h-0 w-0' id='dropzone_file' name='dropzone_file' accept='.jpeg, .png, .jpg' />
                                    <button onClick={onClickUploadProfilePicture} className='mt-2 bg-brand_50 px-4 py-2 rounded-md hover:bg-red-700 active:bg-green-600 bg-red-600 text-white' type='submit'>Upload Image</button>
                                </div>
                                <div className='flex mt-6 gap-x-4'>
                                    <div className="flex flex-col">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" name='firstName' onChange={edituser} value={user?.firstName || ''} className='bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" name='lastName' onChange={edituser} value={user?.lastName || ''} className='bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                </div>
                                <div className='flex mt-6 gap-x-4'>
                                    <div className="flex flex-col">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' onChange={edituser} value={user?.email || ''} className='bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="profession">Profession</label>
                                        <input type="text" name='profession' onChange={edituser} value={user?.profession || ''} className='bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>

                                </div>
                                <div className='flex mt-6 gap-x-4'>
                                    <div className="flex flex-col">
                                        <label htmlFor="location">Location</label>
                                        <input type="text" name='location' onChange={edituser} value={user?.location || ''} className='w-full bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="dateOfBirth">Date of Birth</label>
                                        <input type="date" name='dateOfBirth' onChange={edituser} value={user?.dateOfBirth || ''} className='w-full bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                </div>
                                <div className='flex mt-6 w-full'>
                                    <div className="flex flex-col w-[90%]">
                                        <label htmlFor="college">College/Company</label>
                                        <input type="text" name='college' onChange={edituser} value={user?.college || ''} className='w-full bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                </div>
                                <div className="flex mb-8 gap-x-6">
                                    <button onClick={onClickSaveuser} className='h-12 w-20 bg-green-600 mt-6 rounded-md hover:bg-green-700'>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center px-4 w-full mt-6 border-b-2 border-b-zinc-600">
                            <div className='w-[47%]'>
                                <p className='font-bold text-[2rem]'>Social Links</p>
                                <p>Your Social Links</p>
                            </div>
                            <div className="w-[47%] flex flex-col mb-8">
                                <div className='flex mt-6 gap-x-4'>
                                    <div className="flex flex-col">
                                        <label htmlFor="github">Github</label>
                                        <input type="text" name='github' onChange={edituser} value={user?.github || ''} className='bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="linkedin">Linkedin</label>
                                        <input type="email" name='linkedin' onChange={edituser} value={user?.linkedin || ''} className='bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                </div>
                                <div className='flex mt-6 w-full gap-x-4'>
                                    <div className="flex flex-col">
                                        <label htmlFor="instagram">Instagram</label>
                                        <input type="text" name='instagram' onChange={edituser} value={user?.instagram || ''} className='w-full bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="x">X</label>
                                        <input type="text" name='x' onChange={edituser} value={user?.x || ''} className='w-full bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                </div>
                                <div className='flex mt-6 w-full'>
                                    <div className="flex flex-col">
                                        <label htmlFor="facebook">Facebook</label>
                                        <input type="text" name='facebook' onChange={edituser} value={user?.facebook || ''} className='w-full bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                    </div>
                                </div>
                                <div className="flex mt-6 gap-x-6">
                                    <button onClick={onClickSaveuser} className='h-12 w-20 bg-green-600 rounded-md hover:bg-green-700'>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center px-4 w-full mt-6 border-b-2 border-b-zinc-600">
                            <div className='w-[47%]'>
                                <p className='font-bold text-[2rem]'>Set Password</p>
                                <p>Set your password associated with your account</p>
                            </div>
                            <div className="w-[47%] flex flex-col mb-20">
                                <div className='flex mt-6 gap-x-4'>
                                    <div className="flex">
                                        <input type={passVisibility?.passwordVisibility ? 'text' : 'password'} name='password' onChange={onChangeEditPassword} value={pass?.password || ''} placeholder='New Password' className='bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                        <button type="button" onClick={togglePasswordVisibility} className=" relative right-6 bg-transparent text-gray-500 focus:outline-none">
                                            {passVisibility?.passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                                        </button>
                                    </div>
                                    <div className="flex">
                                        <input type={passVisibility?.confirmPasswordVisibility ? 'text' : 'password'} name='confirmPassword' onChange={onChangeEditPassword} value={pass?.confirmPassword || ''} placeholder='Confirm Password' className='bg-transparent border-[1px] border-gray-600 h-10 rounded-md px-2 text-[1rem] py-1' />
                                        <button type="button" onClick={toggleConfirmPasswordVisibility} className=" relative right-6 bg-transparent text-gray-500 focus:outline-none">
                                            {passVisibility?.confirmPasswordVisibility ? <FaEye /> : <FaEyeSlash />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex mt-10 gap-x-6">
                                    <button onClick={onClickSavePasswordDetails} className='h-12 w-20 bg-green-600 rounded-md hover:bg-green-700'>Save</button>
                                    <button onClick={onClickClearPasswordDetails} className='h-12 w-20 bg-red-600 rounded-md hover:bg-red-700'>Clear</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center px-4 w-full mt-6 border-b-2 border-b-zinc-600">
                            <div className='w-[47%]'>
                                <p className='font-bold text-[2rem]'>Technical Skills</p>
                                <p>Highlighting Technical Expertise</p>
                            </div>
                            <div className="w-[47%] flex flex-col mb-16">
                                <div className='flex'>
                                    <div className="w-[75%] flex flex-wrap gap-x-2 min-h-24 h-auto px-3 py-3 bg-transparent border-gray-500 border-2">
                                        {user?.technicalSkills?.map((skill, index) => {
                                            return (
                                                <div key={index} className="bg-red-600/[0.5] px-1 flex items-center h-7 mb-2">
                                                    <span>{skill}</span>
                                                    <RxCross2 onClick={() => { deleteSkill(skill) }} className='ml-2 hover:bg-red-600 cursor-pointer' />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div onClick={handleEditTechnicalSkills} className="flex cursor-pointer justify-center items-center w-16 bg-transparent border-gray-500 border-2 border-l-0 text-[3rem] hover:bg-zinc-900">+</div>
                                </div>
                                <div className="flex mt-10 gap-x-6">
                                    <button onClick={onClickSaveUserSkillDetails} className='h-12 w-20 bg-green-600 rounded-md hover:bg-green-700'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div></>)}
                </div>
            </div>

            {/* technical skill modal */}
            <div className={`${showTechnicalSkillModal ? 'block' : 'hidden'} absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center bg-zinc-900 border-2 border-zinc-500 h-[150px] w-[400px] z-50 text-white`}>
                <div className='flex flex-col mt-4 w-[90%]'>
                    <input type="text" name='skill' placeholder='Add a Skill' className='bg-zinc-800 border-zinc-500 border-2 px-3 py-1' />
                </div>
                <div className="flex mt-4 gap-x-6">
                    <button onClick={addANewSkill} className='h-8 w-16 bg-green-600 rounded-md hover:bg-green-700 text-white'>Add</button>
                    <button onClick={closeSkillModal} className='h-8 w-16 bg-red-600 rounded-md hover:bg-red-700 text-white'>Cancel</button>
                </div>
            </div>

            {/* image modal */}
            <div className='imageModal hidden absolute z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex-col items-center bg-zinc-900 border-2 border-zinc-500 min-h-[360px] min-w-[200px] w-[360px] justify-center'>
                {src && <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} className='relative w-[200px] object-contain' />}
                <div className='flex  justify-between items-center w-[200px] mt-4 text-white text-[0.8rem]' >
                    <button className='bg-green-500 w-20 h-6 hover:bg-green-600 active:bg-green-700 rounded-md' onClick={getCroppedImage}>Crop Image</button>
                    <button className='bg-red-500 w-20 h-6 hover:bg-red-600 active:bg-red-700 rounded-md' onClick={cancleCroppingImage}>Cancel</button>
                </div>
            </div>

        </>
    )
}

export default UserProfileModal;

