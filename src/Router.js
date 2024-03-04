import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ShopIndex from './views/ShopIndex'
import Login from './views/auth/Login'
import Profile from './components/profile/Profile'
import BecomeSeller from './views/seller/BecomeSeller'
import RegisterSeller from './views/seller/RegisterSeller'
import Dashboard from './components/admin/Dashboard'
import AuthPrivateRoute from './components/private-route/AuthPrivateRoute'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Orders from './views/seller/pages/Orders'

export default function Base() {
	const location = useLocation();
	return (
		<>
		    <TransitionGroup component={null}>
				<CSSTransition key={location.key} classNames="fade" timeout={300}>
					<Routes>
						{/* home page */}
						<Route path="/" element={<ShopIndex/>}></Route>
						<Route path="/login" element={<Login/>}></Route>
						<Route path="/profile" element={<AuthPrivateRoute component={Profile} />}></Route>

						{/* seller routes */}
						<Route path="/seller/become-seller" element={<BecomeSeller/>}></Route>
						<Route path="/seller/register" element={<RegisterSeller/>}></Route>
						<Route path="/seller" element={<AuthPrivateRoute component={Dashboard} admin={true} />} ></Route>
						<Route path="/seller/orders" element={<Orders/>}></Route>

						{/* <AuthPrivateRoute component={<Profile/>} path='/profile' /> */}
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		</>
	)
}
