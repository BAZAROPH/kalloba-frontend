import React, {useEffect, useRef } from "react";
import Avatar from '../../../assets/img/Avatar.jpg'

export default function Send(props) {
    const messageEndRef = useRef(null);
    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [props]); 
    return (
        <div className='mt-3'>
            {props.addAuthor &&
                <div className=''>
                    <img src={Avatar} className='h-8 rounded-full ml-auto' alt="" />
                </div>
            }
            <div className={`${props.bgColor} text-white mt-1 p-2 rounded-lg w-5/6 right-0  ml-auto`}>
                <p>
                    {props.children}
                </p>
                <div className='text-right'>
                    <span className='text-right text-xs rounded-md text-white font-thin p-1 bg-red-600'>{props.hour}</span>
                </div>
            </div>
            <div ref={messageEndRef} />
        </div>
    )
}
