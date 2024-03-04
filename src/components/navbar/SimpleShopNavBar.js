import React from 'react'
import logo from '../../assets/img/logo.png'
import {useNavigate, Link} from 'react-router-dom'

export default function SimpleShopNavBar() {
	const navigate = useNavigate();
	return (
		<>
			<div className="h-16 flex font-ubuntu items-center shadow-md z-50 bg-kalloba w-full shadow-xl sticky top-0 font-ubuntu">
				<span className='ml-3 hover:cursor-pointer' onClick={()=> navigate(-1)}>
					<i className="bi bi-arrow-left-circle text-red-500 text-3xl" ></i>
				</span>
				<span className='ml-5'>
					<Link to={'/'}>
						<img src={logo} className='h-6' alt="kalloba" />
					</Link>
				</span>
			</div>
		</>
	)
}
