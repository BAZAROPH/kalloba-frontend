import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AuthPrivateRoute({ component: RouteComponent, admin: role=false}) {
	// check if user is login with
	// const isLogin = useSelector(state => state.isLogin);

    const {isLogin, data} = useSelector(state => ({
        ...state.isLoginReducer,
        ...state.dataReducer
    }))
    
    if (role===true) {
        return (
            data.admin ? (
                    <RouteComponent/>
                ) : (
                    <Navigate to={'/'} replace/>
                )
        )
    }else{

        return (
            isLogin ? (
                <RouteComponent/>
            ) : (
                <Navigate to={'/login'} replace/>
            )
          )
    }
    }
