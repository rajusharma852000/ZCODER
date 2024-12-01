import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DisplayItem from './pages/DisplayItem';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import ForgotPassword from './pages/FogotPassword';
import Question from './pages/Question';
import AddModal from './components/AddModal';
import UserProfileModal from './components/UserProfileModal'
import ImageCroper from './components/ImageCroper';
import Contests from './pages/Contests';
import Revision from './pages/Revision';
import Saved from './pages/Saved';

import AuthAction from './context/AuthAction';
import NoteAction from './context/NoteAction';
import CommentAction from './context/CommentAction';



function App() {

  return (
    <>
      <AuthAction>
        <CommentAction>
          <NoteAction>
            <BrowserRouter> 
              <TopNav />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/editProfile' element={< UserProfileModal />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/contests' element={<Contests />} />
                <Route path='/pageNotFound/error404' element={<Error404 />} />
                <Route path='/cropImage' element={<ImageCroper />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path='question' element={<Question />} />
                <Route path='/addmodal/:userName' element={<AddModal />} />
                <Route path='/problem/:id' element={<DisplayItem />} />


                <Route path='/revision' element={<Revision />} />
                <Route path='/saved' element={<Saved />} />
              </Routes>
            </BrowserRouter>
          </NoteAction>
        </CommentAction>
      </AuthAction>
    </>


  );
}

export default App;



