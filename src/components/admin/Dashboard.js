import React, {useEffect, useState} from 'react'
import logoDark from '../../assets/img/logoDark.png'
import sideBarElements from '../navbar/SideBarElements'
import { motion } from "framer-motion";
import FUNCTIONS from '../../functions/functions';
import Avatar from '../../assets/img/Avatar.jpg'
import CONST from '../../const/Const'
import ChatBoxOne from '../chat/ChatBoxOne';

export default function Dashboard() {
    const [page, setPage] = useState(sideBarElements[0].name);
    const [displayChild, setDisplayChild] = useState(false);
    const [displayMenuToggle, setDisplayMenuToggle] = useState(false);
    const [searchBarToggle, setSearchBarToggle] = useState(false);
    const [view, setView] = useState();

    //get calendar date block
    const date = new Date();
    const today = {
        day: date.getDate(),
        name: CONST.DayAsName[date.getDay()],
        month: CONST.MonthAsName[date.getMonth()],
        years: date.getFullYear(),
    }

    //mobile menu displaying block
    const displayMobileMenu = ()=>{
        setDisplayMenuToggle(!displayMenuToggle);
    }

    //searchbar animation active block
    const displaySearchBar = ()=>{
        setSearchBarToggle(!searchBarToggle);
    }

    // manage dropdown action block 
    const [dropDown, setDropDown] = useState({
        'name':'',
        'value': false
    });
    const toggleDropDown = (name)=>{
        let middle;
        if(name!==dropDown.name){
             middle = {
                'name': name,
                'value': true
            }
        }else{
             middle = {
                'name': name,
                'value': !dropDown.value
            }
        }
        setDropDown(middle);
    }

    // order sidebar per view block 
    useEffect(()=>{
        setView(FUNCTIONS.filterSideBarElements(sideBarElements, page));
    }, [page])
    return (
        <div className='md:grid md:grid-cols-9 md:gap-2 select-none'>
            <div className={`${!displayMenuToggle && 'hidden'} md:block md:sticky md:top-0 md:w-full  md:col-span-2 h-screen bg-kalloba/[.1]`}>
            <div className='border-b-2 border-kalloba'>
                <div className='flex'>
                    <div className='text-center text-2xl p-2 absolute md:hidden animate__animated animate__fadeIn'>
                        <i className="bi bi-x-circle" onClick={()=>{displayMobileMenu()}}></i>
                    </div>
                    <img src={logoDark} alt="kalloba-logo" className='h-12 mx-auto py-2' />
                </div>
            </div>
            <div className={`${displayMenuToggle && 'animate__animated animate__fadeIn'} mt-6`}>
                <ul className='mx-6'>
                {
                    sideBarElements.map((elt, i)=>{
                    return (
                        <li key={i} onClick={
                        ()=>{
                            // check if element have chidren elements
                            if(!elt.children){
                                setPage(elt.name)
                                // hidden mobile menu
                                setDisplayMenuToggle(false);
                            }else{
                                // check if children is not display if yes hidden children
                                if(!displayChild){
                                    setDisplayChild(i)
                                }else{
                                    setDisplayChild(false);
                                    if(i!==displayChild){
                                        setDisplayChild(i);
                                    }
                                }
                            }
                        }
                        }>
                        <div className={`'w-full p-2 font-bold cursor-pointer rounded-lg my-3 transtion-all ease-in delay-100 duration-200 ${page===elt.name ? 'text-white bg-kalloba' : 'text-kalloba hover:text-white hover:bg-kalloba/[.8]'}`}>
                            <div className='flex justify-between items-center'>
                            <span className='md:pl-3'>
                                    <i className={elt.icon + ' pr-2'}></i>
                                    {elt.name}
                            </span>
                            {elt.children && (
                                <span className={`duration-500 ${(displayChild && i===displayChild) && 'rotate-180'}`}>
                                    <i className='bi bi-chevron-down text-right'></i>
                                </span>
                            )}
                            </div>
                        </div>
                            {displayChild && i===displayChild &&
                                <div className='border-l-2 border-kalloba ml-10'>
                                    <motion.ul initial={{y: -12}} animate={{y: 0}} transition={{ duration: 0.1 }} className='duration-500'>
                                                    {/* children block */}
                                        {
                                        elt.children.map((child, index)=>{
                                            return (
                                                <li className={`my-2 p-1 pl-3 ml-3 cursor-pointer rounded-lg hover:text-white duration-300 ${page===child.name ? 'text-white bg-kalloba' : 'text-kalloba hover:text-white hover:bg-kalloba/[.8]'}`} key={index} onClick={(e)=>{
                                                e.stopPropagation();
                                                setPage(child.name);
                                                // hidden mobile menu
                                                setDisplayMenuToggle(false);
                                                }}> 
                                                <span><i className={child.icon + ' pr-2'}></i></span>
                                                {child.name}
                                                </li>
                                            )
                                        })
                                        }
                                    </motion.ul>
                                </div>
                            }
                        </li>
                    )
                    })
                }
                </ul>
            </div>
            </div>

            <div className='md:col-span-7'>
            {/* mobile default header */}
                <div className='border-b-2 border-kalloba bg-kalloba/[.1] md:hidden flex items-center'>
                    <div className='ml-1 absolute'>
                    <i className="bi bi-list text-3xl" onClick={()=>{displayMobileMenu()}}></i>
                    </div>
                    <img src={logoDark} alt="kalloba-logo" className='h-12 mx-auto py-2' />
                </div>

                <div className='hidden md:flex sticky top-2 bg-white h-12 m-1 mx-2 rounded-lg shadow-xl mt-2 border border-gray-200 justify-between items-center'>
                    <div className='mx-4 m'>
                        <span className='font-bold'>Ma boutique</span>
                    </div>
                    <div className='flex items-center text-xl gap-2'>
                        {/* search bar block  */}
                        <div className='flex justify-between items-center'>
                            <i className='bi  bi-search cursor-pointer rounded-full px-2 py-1 duration-300' onClick={()=>{displaySearchBar()}}></i>
                            <input type="text" className={`focus:outline-none appearance-none text-sm pl-1 w-0 ${searchBarToggle && 'border-b border-kalloba w-[100%]'} duration-500`} />
                        </div>                        
                        <div className=''>
                            <i className='bi bi-box cursor-pointer text-orange-500  bg-orange-500/[.2]  hover:bg-orange-500 rounded-full hover:text-white px-2 py-[0.3em] duration-300' onClick={()=>{toggleDropDown('product')}}></i>
                            {/* products dropdown  */}
                            
                            <ul className={`absolute mt-3 text-kalloba bg-kalloba/[.2] rounded-md divide-y divide-kalloba ${(dropDown.name==='product' && dropDown.value) ? 'animate__animated animate__fadeInDown' : 'hidden'} text-sm`}>
                                <li className='cursor-pointer hover:text-white duration-200 hover:bg-kalloba py-2 px-4 rounded-t-md'>Produits récents</li>
                                <li className='cursor-pointer hover:text-white duration-200 hover:bg-kalloba py-2 px-4'>Produits Sponsosrisés</li>
                                <li className='cursor-pointer hover:text-white duration-200 hover:bg-kalloba py-2 px-4'>Produits les plus vendus</li>
                                <li className='cursor-pointer hover:text-white duration-200 hover:bg-red-600 py-2 px-4 rounded-b-md'>Corbeille</li>
                            </ul>


                            {/* calendar dropdown  */}
                            <div className={`absolute mt-4 text-kalloba bg-white shadow-xl rounded ${(dropDown.name==='calendar' && dropDown.value) ? 'animate__animated animate__fadeInDown' : 'hidden'} text-sm`}>
                                <div className='bg-red-500 text-white rounded-t py-2 px-10'>
                                    <span className='text-lg font-bold'>{ today.name }</span>
                                </div>
                                <div className='bg-white text-center p-3'>
                                    <span className='text-4xl font-bold'>{ today.day }</span>
                                </div>
                                <div className='flex items-center justify-between mx-2 mb-1 text-base font-bold'>
                                    <span>
                                        {today.month}
                                    </span>
                                    <span>
                                        {today.years}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div> 
                            <i className='bi bi-calendar-date cursor-pointer text-sky-500  bg-sky-500/[.2]  hover:bg-sky-500 rounded-full hover:text-white px-2 py-[0.3em] duration-300' onClick={()=>{toggleDropDown('calendar')}}></i>
                            
                            {/* profile dropdown  */}
                            <ul className={`absolute mt-3 text-kalloba bg-kalloba/[.2] rounded-md divide-y divide-kalloba ${(dropDown.name==='profile' && dropDown.value) ? 'animate__animated animate__fadeInDown' : 'hidden'} text-sm`}>
                                <li className='cursor-pointer hover:text-white duration-200 hover:bg-kalloba py-2 px-4 rounded-t-md'>Profile</li>
                                <li className='cursor-pointer hover:text-white duration-200 hover:bg-kalloba py-2 px-4'>Commandes récentes</li>
                                <li className='cursor-pointer hover:text-white duration-200 hover:bg-kalloba py-2 px-4'>Paramètre</li>
                                <li className='cursor-pointer hover:text-white duration-200 hover:bg-kalloba py-2 px-4 rounded-b-md'>Émettre une requête</li>
                            </ul>
                        </div>

                        {/* Message icon dropdown  */}
                        <i className='bi bi-envelope cursor-pointer bg-green-500/[.2] hover:bg-green-500 text-green-500 rounded-full hover:text-white px-2 py-1 duration-300'></i>
                        
                        {/* Notifications icon dropdown  */}
                        <i className='bi bi-bell cursor-pointer hover:bg-kalloba hover:rounded-full hover:text-white px-2 py-1 duration-300'></i>
                         
                        <div className='border-l border-gray-400'>
                            <img src={Avatar} className='h-10 rounded-full mx-2 cursor-pointer' alt="" onClick={()=>{toggleDropDown('profile')}}/>
                        </div>
                    </div>
                </div>

                <div className={`mx-2 ${displayMenuToggle && 'hidden'}`}>
                    <div className='my-5'>
                        <span className='font-bold mx-2 text-lg'>{page}</span>
                    </div>
                    <div className='border border-gray-100n rounded-md bg-white p-2 shadow-lg h-auto mb-1 bg-gray-100'>
                        {view}
                    </div>
                </div>
                <ChatBoxOne/>
            </div>
        </div>
    )
}
