import React from 'react'
import ShopNavBar from '../components/navbar/ShopNavBar'
import ShopFooter from '../components/Footer.js/ShopFooter'
import FUNCTIONS from '../functions/functions'
export default function ShopIndex() {
	return (
		<div className='grid grid-cols-1'>
			{/* navbar */}
			<div className="h-14 bg-white hidden md:flex font-ubuntu">
					jddjdj
			</div>
			<ShopNavBar refresh={FUNCTIONS.disconnectUser}/>

			<div className='h-screen'>

			</div>

			<ShopFooter/>
		
		</div>
	)
}
