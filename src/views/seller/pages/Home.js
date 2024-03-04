import React from 'react'

export default function Home() {
  return (
    <div className='m-2'>
        <div className='md:grid md:grid-cols-3 gap-4 flex md:flex-none overflow-x-auto rounded-lg'>
            <div className='bg-white h-20 rounded-lg flex items-center justify-between px-5'>
                <span className='text-sm md:text-lg px-3 truncate'>Commandes en attente</span>

                <span className='px-4 font-bold'>12</span>

                <i className='bi bi-archive-fill flex-none bg-green-500/[.3] px-2 py-1 rounded-md text-green-500'></i>
            </div>
            <div className='bg-white h-20 rounded-lg flex items-center justify-between px-5'>
                <span className='text-sm md:text-lg px-3 truncate'>Ventes du mois</span>

                <span className='px-4 font-bold'>12</span>

                <i className='bi bi-shop-window flex-none bg-orange-500/[.3] px-2 py-1 rounded-md text-orange-500'></i>
            </div>
            <div className='bg-white h-20 rounded-lg flex items-center justify-between px-5'>
                <span className='text-sm md:text-lg px-3 truncate'>Nombre de clients</span>

                <span className='px-4 font-bold'>12</span>

                <i className='bi bi-person-video2 flex-none bg-indigo-500/[.3] px-2 py-1 rounded-md text-indigo-500'></i>
            </div>
        </div>
    </div>
  )
}
