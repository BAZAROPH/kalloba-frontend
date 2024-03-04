
import React from 'react'

export default function FullPageLoader() {
  return (
    <>
        <div className="grid place-items-center h-screen absolute bg-gray-500/[0.5] w-screen h-screen z-50">
            <div className='border-t-transparent fixed mx-9 h-[80px] w-[80px] border-2 border-red-500 animate-spin border-4 rounded-full'>
            </div>
        </div>
    </>
  )
}
