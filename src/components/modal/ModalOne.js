import React from 'react'
export default function ModalOne(props) {
    return (
        <>
            <div className='grid place-items-center h-screen w-screen absolute bg-gray-500/[0.5] z-50'>
                <div className='w-2/5 bg-white rounded-lg md:mb-24'>
                    <ul className='divide-y-2 h-full'>
                        <li className='py-3 h-1/4'>
                            <div className='grid grid-cols-2'>
                                <span className='ml-3'> {props.title}</span>
                                <span className='text-right mr-3'>
                                    <i className="bi bi-x-circle-fill text-kalloba hover:text-red-600 cursor-pointer"></i>
                                </span>
                            </div>
                        </li>
                        <li className=''>
                            {props.children}
                        </li>
                        <li className='h-1/4 items-center'>
                            <div className='grid grid-cols-1'>
                                <span className='text-right mr-3 my-3'>
                                    <button className='transition-all ease-in duration-350 text-right px-4 py-2 mr-3 bg-red-500 hover:bg-red-600 text-white rounded-lg mt-1'>{props.cancelTitle}</button>
                                    <button className='transition-all ease-in duration-350 text-right px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg mt-1'>{props.successTitle}</button>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
