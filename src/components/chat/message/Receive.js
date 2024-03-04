import React, {useEffect, useRef } from "react";
import logoDark from '../../../assets/img/logoDark.png'

export default function Receive(props) {
    const messageEndRef = useRef(null);
    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [props]);
    return(
        <div className='mt-3'>
            {props.addAuthor &&
                <div className='flex items-center'>
                    <img src={logoDark} className='h-4 ml-1' alt="" />
                </div>
            }
            <div className={`${props.bgColor} text-white p-2 mt-1 rounded-lg w-5/6`}>
                <p>
                    {props.children}
                </p>
                <div className='text-right'>
                    <span className='text-right text-xs rounded-md text-white font-thin p-1 bg-kalloba'>{props.hour}</span>
                </div>
            </div>
            <div ref={messageEndRef}/>
        </div>
    )
}
