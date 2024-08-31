import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DisplayItem from './pages/DisplayItem';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import AuthAction from './context/AuthAction';
import Home from './pages/Home';
import ForgotPassword from './pages/FogotPassword';
import Question from './pages/Question';
import AddModal from './components/AddModal';
import NoteAction from './context/NoteAction';
import UserProfileModal from './components/UserProfileModal'
import ImageCroper from './components/ImageCroper';
import Contests from './pages/Contests';
import Important from './pages/Important';


function App() {

  return (
    <>
      <AuthAction>
        <NoteAction>
          <BrowserRouter>
            <TopNav />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/problem/:id' element={<DisplayItem />} />
              <Route path='/pageNotFound/error404' element={<Error404 />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              <Route path='question' element={<Question />} />
              <Route path='/addmodal/:userName' element={<AddModal />} />
              <Route path='/editProfile' element={< UserProfileModal/>} />
              <Route path='/cropImage' element={<ImageCroper/>} />
              <Route path='/contests' element={<Contests/>} />
              <Route path='/important' element={<Important/>} />
            </Routes>
          </BrowserRouter>
        </NoteAction>
      </AuthAction>
    </>


  );
}

export default App;



