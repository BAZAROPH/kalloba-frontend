import React, {useState, useRef} from 'react'
import { useEffect } from 'react';
import Receive from './message/Receive';
import Send from './message/Send';


export default function ChatBoxOne() {
    const [upChatBox, setUpChatBox] = useState(false);
    const [muted, setMuted] = useState(false);
    const [message, setMessage] = useState('');
    const chatBoxRef = useRef(null);
    const [messages, setMessages] = useState([
        {
            sender: 'Kalloba',
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis natus, repudiandae, ab alias, porro quod molestias minus ex vel reiciendis fugit cupiditate dolorem itaque dicta. At nemo harum iusto assumenda.',
            date: '12:40',
            receiver: 'Ma boutique',
            send: false,
        },
        {
            sender: 'Kalloba',
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis natus, repudiandae, ab alias, porro quod molestias minus ex vel reiciendis fugit cupiditate dolorem itaque dicta. At nemo harum iusto assumenda.',
            date: '12:40',
            receiver: 'Ma boutique',
            send: true,
        },
        {
            sender: 'Kalloba',
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis natus, repudiandae, ab alias, porro quod molestias minus ex vel reiciendis fugit cupiditate dolorem itaque dicta. At nemo harum iusto assumenda.',
            date: '12:40',
            receiver: 'Ma boutique',
            send: true,
        },
        {
            sender: 'Kalloba',
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis natus, repudiandae, ab alias, porro quod molestias minus ex vel reiciendis fugit cupiditate dolorem itaque dicta. At nemo harum iusto assumenda.',
            date: '12:40',
            receiver: 'Ma boutique',
            send: false,
        },
        {
            sender: 'Kalloba',
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis natus, repudiandae, ab alias, porro quod molestias minus ex vel reiciendis fugit cupiditate dolorem itaque dicta. At nemo harum iusto assumenda.',
            date: '12:40',
            receiver: 'Ma boutique',
            send: false,
        }
    ])

    // save user types
    const saveMessageValue = (e)=>{
        setMessage(e.target.value);
    }
    // manage notification mute 
    const mute = ()=>{
        setMuted(!muted)
    }

    const scrollToBottom = ()=>{
        chatBoxRef.current.scrollIntoView({block: "end"});
    }

    useEffect(()=>{
        scrollToBottom()
    },[upChatBox])

    // manage dashboard block
    const chatBoxDisplay = ()=>{
        setUpChatBox(!upChatBox);
    }

    // send message
    const sendMessage = ()=>{
        if(message){
            let middle = messages;
            const date = new Date();
            middle.push({
                sender: 'Ma boutique',
                content: message,
                date: date.getHours() + ':' + date.getMinutes(),
                receiver: 'Kalloba',
                send: true,
            })
            setMessages(middle);
            setMessage('');
        }
    }
    return (
        <div className={`bottom-0 fixed right-0 rounded-t duration-500 ${upChatBox ? 'w-96' : 'w-2/3 md:w-1/5'}`}>
            <div className='h-12 bg-kalloba flex items-center rounded-t justify-between text-white px-3'>
                <div>
                    <span className='text-sm'>Message</span>
                </div>
                <div>
                    <span className='text-sm'>
                        <i className={`bi ${muted ? 'bi-bell-slash-fill text-red-600' : 'bi-bell-fill'} hover:bg-white/[.2] px-2 py-[0.5em] duration-500 cursor-pointer rounded-full`} onClick={()=>{mute()}}></i>
                        <i className={`bi ${upChatBox ? 'bi-chevron-down' : 'bi-chevron-up' } ml-1 hover:bg-white/[.2] px-2 py-[0.5em] duration-500 cursor-pointer rounded-full`} onClick={()=>{chatBoxDisplay()}}></i>
                    </span>
                </div>
            </div>
            
            <div className={`bg-gray-100 duration-500 ${upChatBox ? 'h-96' : 'h-0'} z-50  w-full scrollbar-hide overflow-auto`}>
                <div className={!upChatBox ? 'hidden' : ''} ref={chatBoxRef}>
                    <div className='p-3'>
                        {
                            messages.map((elt, index)=>{
                                if(elt.send){
                                    return(
                                        <Send hour={elt.date} key={index} bgColor="bg-kalloba" addAuthor={(index-1 >= 0) ? !messages[index-1].send : true}>
                                            {elt.content}
                                        </Send>
                                    )
                                }else{
                                    return(
                                        <Receive hour={elt.date} key={index} bgColor="bg-red-600" addAuthor={(index-1 >= 0) ? messages[index-1].send : true}>
                                            {elt.content}
                                        </Receive>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className={!upChatBox ? 'hidden' : 'bg-gray-100 py-2 mx-3 justify-between flex items-center sticky bottom-0'}>
                    <textarea value={message} onInput={(e)=>{saveMessageValue(e)}} className='border border-kalloba rounded px-1 max-h-10 resize-none focus:outline-none' name="" id="" />
                    <button className='ml-2 p-1 rounded-md bg-kalloba text-white px-8 hover:bg-green-600 hover:scale-105 duration-500' onClick={()=>{ sendMessage() }}>
                        <i className='bi bi-send text-2xl'></i>
                    </button>
                </div>
            </div>
        </div>
    )
    }
