import React from 'react';
import {Routes, Route} from 'react-router-dom';
import PrivateRoute from './hocs/privateRoute/privateRoute';
import { ToastContainer} from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/home';
import Room from './pages/room/room';
import { setUser } from './store/auth';

const App =  () => {

  const dispatch = useDispatch();

  return (
    <>
    <ToastContainer/>
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/:meetingId' element={<PrivateRoute> <Room/> </PrivateRoute>}/>
    </Routes>
    </>
  );
};

export default App;
