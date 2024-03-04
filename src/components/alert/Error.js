import React from 'react'

export default function Error(props) {
  return (
    <>
        <div class="bg-red-100 text-center border-t border-b border-red-500 mt-4 animate__fadeInRight animate__animated text-red-500 px-4 py-3" role="alert">
            {props.error && (<p class="font-bold">{props.error}</p>)}
            <p class="text-sm">{props.message}</p>
        </div>
    </>
  )
}
