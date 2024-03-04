import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import oumaru from '../../assets/img/oumaru.png'
import logo from '../../assets/img/logo.png'
import axios from 'axios'
import URLS from '../api/API';
import FUNCTIONS from '../../functions/functions';

export default function ShopNavBar(props) {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [mobileFirstLoad, setMobileBarFirstLoad] = useState(false);
    const [dropDownFirstLoad, setDropDownBarFirstLoad] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [dropDownToggle, setDropDownToggle] = useState(false);

    //change drop down state
    const dropDown = ()=>{
        setDropDownBarFirstLoad(true);
        setDropDownToggle(!dropDownToggle);
    }


    // check user is authenticated and get infos
    useEffect(()=>{
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access')}`,
                },
            };
            axios.get(URLS.userInfo, config)
            .then((response)=>{
                setUserInfo(response.data);
            })
        }
    }, [])

    const changeToggle = ()=>{
        setToggle(!toggle);
        setMobileBarFirstLoad(true);
    }
    if(toggle){
        document.body.className = 'bg-gray-200'
    }else{
        document.body.classList.remove('bg-gray-200')

    }

  return (
    <>
        <div className="h-20 md:h-16 bg-kalloba w-full shadow-xl sticky top-0 font-ubuntu z-50">
            <ul className='hidden md:flex max-w-6xl justify-between mx-auto w-full items-center h-full text-white text-sm'>
                <li>
                    <Link to={'/'}>
                        <img src={logo} className='h-8' alt="kalloba" />
                    </Link>
                </li>
                <li className='p-0'>
                    <span className='bg-white/[.4] p-3 mr-2 rounded-md'>
                        <button className='rounded-left px-2'><i className='bi bi-search text-xl'></i></button>
                        <input type="text" className='form-control bg-transparent focus:outline-none text-white placeholder-white form-floating pr-10 ' placeholder='Que recherchez-vous ?' />
                    </span>
                    <button className='btn btn-success bg-red-600 hover:bg-white/[.4] uppercase font-bold shadow-lg p-3 px-4 rounded-md'>Rechercher</button>
                </li>
                <li>
                    {userInfo ? (
                            <div>
                                <span className='hover:cursor-pointer' onClick={()=>dropDown()}>
                                    <span>
                                        <i className="bi bi-person-check text-red-500 text-2xl pr-2"></i>
                                    </span>
                                    <span className='font-bold text-lg capitalize'>
                                        <span className='font-thin'>Akwaba,</span>{userInfo && ` ${FUNCTIONS.truncateString(`${userInfo.last_name} ${userInfo.first_name}`, 14)}`}
                                        <i className={`bi ml-1 ${dropDownToggle ? 'bi bi-chevron-up' : 'bi bi-chevron-down'}`}></i>
                                    </span>
                                </span>
                                <ul className={!dropDownFirstLoad ? 'hidden' : `absolute items-center divide-y text-xl bg-white shadow-lg text-red-600 font-bold rounded-md text-center mt-3 ${dropDownToggle ? 'animate__animated animate__zoomIn' : 'animate__animated animate__zoomOut'}`}>
                                    <Link to={'/profile'}>
                                        <li className='py-2 px-14 hover:bg-red-100 hover:rounded-t-md'>
                                            Mon Compte
                                        </li>
                                    </Link>
                                    <li className='py-2 px-14  hover:bg-red-100 '>Ma liste d'envies</li>
                                    <li className='text-center py-2 px-14 border-0'>
                                        <button className='btn text-white p-2 px-5 rounded-md bg-kalloba hover:bg-red-600' onClick={()=>{localStorage.clear();props.refresh()}}>Déconnexion</button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to={'/login'}>
                                <span className='hover:text-red-500  hover:cursor-pointer px-2'>
                                    <span className=' pr-3 text-xl'>
                                        Se connecter
                                    </span>
                                    <span>
                                        <i className="bi bi-person-circle text-lg"></i>
                                    </span>
                                </span>
                            </Link>
                        )
                    }
                </li>
                <li className='hover:cursor-pointer'>
                    <i className="bi bi-basket text-xl font-bold"></i>
                    <span className='font-bold text-lg'> Panier</span>
                </li>
            </ul>

            {/* mobile navbar */}
            <ul className='md:hidden text-white'>
                <div className="grid grid-cols-2">
                    <ul className='flex'>
                        <li onClick={changeToggle} className='mr-4 hover:cursor-pointer'>
                            <i className={ toggle ? "bi text-red-600  bi-x-lg font-bold text-2xl p-[2px] mr-[2px] animate__animated animate__fadeIn" : "bi bi-list font-bold text-3xl "}></i>
                        </li>
                        <li className='py-auto mt-1'>
                            <span className=''>
                                <img src={logo} className='h-6' alt="kalloba" />
                            </span>
                        </li>
                    </ul>
                    <ul className='text-white w-full h-full'>
                        <li className='hover:cursor-pointer mt-1  float-right h-full my-auto mr-2'>
                            <i className="bi bi-basket text-xl font-bold"></i>
                        </li>

                        <li className='float-right pr-4 mt-1'>
                            <span>
                                {userInfo ? 
                                    <Link to={'/profile'}>
                                        <i className="bi bi-person-check text-red-500 text-xl"></i>
                                    </Link>
                                :
                                    <Link to={'/login'}>
                                        <i className="bi bi-person-circle text-xl"></i>
                                    </Link>
                                }
                            </span>
                        </li>
                        
                    </ul>
                </div>
                <div className='h-full w-full flex'>
                    <span className='bg-white/[.4] mx-auto rounded-md'>
                        <input type="text" className='form-control bg-transparent pl-2 focus:outline-none text-white placeholder-white form-floating pr-10 ' placeholder='Que recherchez-vous ?' />
                        <button className='btn py-2 px-3 btn-success bg-red-600 hover:bg-white/[.4] uppercase font-bold hover:text-red shadow-lg rounded-md'><i className='bi bi-search text-sm'></i></button>
                    </span>
                </div>
            </ul>
        </div>
        {/* mobile menu */}
        <span className='md:hidden font-ubuntu'>
            <div className={toggle ? 'bg-white h-full max-w-3/4 w-full fixed border-r-4 border-red-400/25 animate__animated animate__fadeInLeft' : mobileFirstLoad ? 'bg-white h-full max-w-3/4 w-full fixed border-r-4 border-red-400/25 animate__animated animate__fadeOutLeft' : 'hidden'}>
                <ul className='divide-y-4 divide-red-400/25 ml-3'>
                    <li className="py-3 font-semibold text-md text-red-500 hover:cursor-pointer">Compte Kalloba <i className="ml-3 bi bi-person-badge"></i></li>
                    <li className='py-3'>
                        <ul>
                            <li className='py-2'><i className="mr-3 bi bi-box-seam"></i>Mes Commandes</li>
                            <li className='py-2'><i className="mr-3 bi bi-envelope-check-fill"></i>Messagerie</li>
                            <li className='py-2'><i className="mr-3 bi bi-cash-coin"></i>Vos Coupons</li>
                            <li className='py-2'><i className="mr-3 bi bi-clipboard-heart"></i>Liste de Souhaits</li>
                        </ul>
                    </li>
                    <li className='py-3'>
                        <span className='py-3 font-semibold text-md text-red-500'>Nos services</span>
                        <ul>
                            <li className='py-2' onClick={()=>navigate('/seller/become-seller')}><i className="mr-3 bi bi-shop"></i>Devenir vendeur</li>
                            <li className='py-2 flex items-center'><img src={oumaru} className="h-5 mr-2" alt='oumaru.com'/>Oumaru.com</li>
                        </ul>
                    </li>
                    <li className='py-3'>
                        <ul>
                            <li className='py-2'><i className="mr-3 bi bi-info-circle"></i>Aide de FAQ</li>
                            <li className='py-2'><i className="mr-3 bi bi-person-rolodex"></i>Nous-contacter</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </span>
    </>
  )
}