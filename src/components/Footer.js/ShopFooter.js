import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ShopFooter() {
    const navigate = useNavigate();
	return (
		<div className='w-full mb-auto fixed bottom-0 sticky top-[100vh] ubuntu bottom-0 bg-kalloba relative text-white'>
			<div className='bg-white/[.1] text-center'>
				Retour en haut
			</div>
			<div className='flex py-auto grid grid-cols-2'>
				<ul className='mx-auto'>
					<li className='py-1 text-sm cursor-pointer font-bold mb-2'>Mieux nous connaitre</li>
					<li className='py-1 text-sm cursor-pointer'>À Propos</li>
					<li className='py-1 text-sm cursor-pointer'>Carrières</li>
					<li className='py-1 text-sm cursor-pointer'>Œuvres</li>
				</ul>

				<ul className='mx-auto'>
					<li className=' py-1 text-sm font-bold mb-2 cursor-pointer'>Gagner de l'argent</li>
					<li className='text-sm py-1 cursor-pointer' onClick={()=>navigate('/seller/become-seller')}>Devenez vendeur</li>
					<li className='text-sm py-1 cursor-pointer'>Devenez partenaire</li>
					<li className='text-sm py-1 cursor-pointer'>Publier vos livres</li>
				</ul>
			</div>

			<div className='bg-black/[.2] p-2 flex items-center justify-between'>
				<div className='text-center mx-auto'>
					<span className='cursor-pointer'>Conditions générales de vente</span><br />
					<span className='cursor-pointer'>Conditions de participations aux ventes</span>
				</div>
			</div>
			<div className="bg-red-600 font-thin mx-auto text-white text-center font-bold">
				© kalloba.com 2022. - Tous droits réservés
			</div>
		</div>
	)
}
