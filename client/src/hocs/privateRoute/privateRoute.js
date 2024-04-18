import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {toast} from 'react-toastify';


const PrivateRoute = ({children, ...rest}) => {
    
    const location = useLocation();


    const user = useSelector(state => state.auth);

    if(location.pathname.substring(1) !== user.meetingId || !user.userName.length){
        toast.error('If you wish to join a room, click on "Join The Meeting" button')
    }
   
    return (
        (location.pathname.substring(1) === user.meetingId && user.userName.length) ? children : <Navigate to='/' />
    );
};

export default PrivateRoute;