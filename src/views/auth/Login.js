import React, {useState, useRef} from 'react'
import validator from 'validator'
import axios from 'axios';
import SimpleShopNavBar from '../../components/navbar/SimpleShopNavBar'
import URLS from '../../components/api/API';
import toast, {Toaster} from 'react-hot-toast';
import Error from '../../components/alert/Error';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
var CryptoJS = require("crypto-js");


export default function Login() {
	const [loginToggle, setLoginToggle] = useState(true);
    const [loginFirstLoad, setLoginFirstLoad] = useState(false);
    const [registerFirstLoad, setRegisterFirstLoad] = useState(false);
    const [eye, setEye] = useState(false);
    const [registerEye, setRegisterEye] = useState(false);
	const [loaderState, setLoaderState] = useState(false);
	const [registerLoaderState, setRegisterLoaderState] = useState(false);
	const formRef = useRef();
	const [loginError, setLoginError] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();
    const [usingConditionValue, setUsingConditionValue] = useState(false);
    const [usingConditionError, setUsingConditionError] = useState(false);


	// login validation init
	const [loginEmailToggle, setLoginEmailToggle] = useState(false);
	const [loginPasswordToggle, setLoginPasswordToggle] = useState(false);

	//register validation init
	const [nameToggle, setNameToggle] = useState(false);
	const [firstNameToggle, setFirstNameToggle] = useState(false);
	const [emailToggle, setEmailToggle] = useState(false);
	const [passwordToggle, setPasswordToggle] = useState(false);
	const [contactToggle, setContactToggle] = useState(false);

	// forms validation init
	const [loginFormToggle, setLoginFormToggle] = useState(false);
	const [registerFormToggle, setRegisterFormToggle] = useState(false);

	// data init 
	const [registerData, setRegisterData] = useState({
		last_name: '',
		first_name: '',
		email: '',
		contact: '',
		password: '',
	})
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})
	
	//change eye function
	const changeEye = ()=>{
		setEye(!eye);
	}
	const changeRegisterEye = ()=>{
		setRegisterEye(!registerEye);
	}


	// ---------------------------------------------------------------------------------------------------------------------
	//tabs toogle functions
	const loginState = () =>{
		setLoginToggle(true);
	}

	const registerState = () =>{
		setLoginToggle(false);
	}

	// ---------------------------------------------------------------------------------------------------------------------
//validations functions
	//login form email
	const loginEmailValidation = (e)=>{
		if(!validator.isEmail(e.target.value)){
			setLoginEmailToggle(false);
		}else{
			setLoginEmailToggle(true);
			const middle = {...loginData};
			middle.email = e.target.value
			setLoginData(middle)
		}
	}

	//login form password
	const loginPasswordValidation = (e)=>{
		if(!validator.isLength(e.target.value, {min:2, max:255})){
			setLoginPasswordToggle(false);
		}else{
			setLoginPasswordToggle(true);
			const middle = {...loginData};
			middle.password = e.target.value;
			setLoginData(middle);
		}
	}

	// login form
	const loginFormValidation = (e)=>{
		e.preventDefault();
		setLoaderState(true);
		setLoginFirstLoad(true);
		if(!loginEmailToggle || !loginPasswordToggle){
			setLoginFormToggle(false);
			setLoaderState(false)
		}else{
			setLoginFormToggle(true);
			axios.post(URLS.login, loginData)
			.then((response) => {
				console.log(response);
				setLoaderState(false);
				setLoginError(false);

				//stock access token and refresh token
				localStorage.setItem('access', response.data.access);
				localStorage.setItem('refresh', response.data.access);

                axios.get(URLS.userInfo, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('access')}`,
                    }
                })
                .then((response)=>{
                    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response.data), 
                    'my-secret-key@12VJHQw#n6AT!ks=^&qgG?W*Z^HhxBEcBQjZ+m2m8SbUy--Whj&KN7Y%LaJJ9!#aP&RW!e+R@#aMPn--5HgcbnqaS?6=w%H!+sv+5=+qyLm6_vhp%C%j%7rcMA+qNYRdXrZ=pt!@79CRx=WPY+UvEx6S$&pTH*LzhK%&bZZyssuYdn5@wa5!WEmBBJY&9mL%sBXDRuqFA#dN7bLLw+Lcux--sjxQVGeZ6!%#V^hWs=x4UA%bLjbjRfT9RD%NPcdd@K5fu4PB%z@9@TU&Amh56@c+!XyW-3bc+BAhJ+PHz&pa_YMaz#Uvu3m?C7E3yfyEMZ32MLr83+9?C_n34N#K=P%Ujcxj@Nf+F7zda3rmQ_bjU3+p@f9!HyvjW@uCczcH!uZpBuaR@#?+-N6RPG+Za+KGfUGqX%fyT9gJHTvPZSqYgWKx_#dKdvLqhrjZCum^wUwf_Ka@PAGFDmx2SxNY^^C#Ye!PwRAFZV8+94q*WNAMK8WWTyDjHTZFk#vHK#Rty3fzS^5c?Z82_xgCbtMN6F5KTSMLM5!fEvRFeACEs2@EFTj2&k8Zwgbj%AA4+KQ7BcQZdN-=kVCxqRevwa*?z7!L?ynF!%7h6NgpYYS^FCR*PH^M#7N%v8YL?aQxQ-7zmssv39rv^Ry8ku3Q@kk7V7pXvAmH@c+*NspKnBXwP54K_gAtLWCx*GE8^FRg=x_bu^=T7B#QSCMwj$VWByL4FtANPsp+EV#U9t6auexhJDkUbP?PjJJa2QFy8De939KUbeqr_aHt%83kjaXF?LPv7a5b58JE_pQmSEGvxH#7QCYkPyp%ZxK$yrwC6zJfkMvaYmX35k#MG_XKWs72s8=S+3mcmtBL7r?g^_wk^Vcm63F3xNrm5eWzfA4AVRkM4y^!px#XrC*%qtBe-t9e+^2ew7TU#VKK!ewYAN+@C#NDS3=V5wZYrfNucxk8R7A$pj2bCJu^7VkKc!RMy$@=?HDZvPRNmpXuC#?+k75smAH^dFUuH_qsExQ*qrhtQ-xSB_=UURBzn6pkQ4pNu9+Zdky!7w^LmK24gYQKvHFJMX+7yvY-+3rkm$RBALJMye4%^A?F?MC5b?pjtJUmeJf3wuD7Qv@U#UJnef#gJ5nPZqf55RKG8tjrv#gxG9^ZjhVAqHV*h$Ck_$+vCQUz#hXC%bdGVc5&3#u!BCvrEf6qfKH@Xsp6vv3=Hu=yWyYm2gzhT^2m#Nk*5Wa!7GNu4UP^tN+dj?#nk3ZT4P=+ah%Av^mf!@cv75PXEndp8YYRUSUTKpz%#M4U@yC_d3=?D7Q$%p--=^DpApdPVpy?^Srrkfb*tQ&FF2%FhWBKSuWUE$?xjfNaNmZ=jkFC7?Qc*F*Cmum&&ag-gXecKGcH%PEdX4DtUj5d9EGKxrg?KQBd4vTF@Ugg&DSEMj#CKk%e#P@RhujKM9KFP$-X+wKQ7#2!rHkx!=hLMcP@#xb^=kkAXnRFcuvcbXt6$rjZN?Kz=E5N$4Uk$D@_2St#yCs&D-TaXmsvbnhEx4%_?KwEV%jvNccYbNrYZKDYRmrJTY?g57e7bxv%H^b^S3Qry6LBCEzcm46ZZX+Jp@ZRe!57FAp+X@73E3b?f*qYbYKwR=Wp7Be4h4$qUeqXuggReRccs$nawEyJxy*jR?vH^P@fw6m8TK@3QfDr#?_S*ZB5Dx$&S+GqNQLBVsK?CyhcNgYsbcu$VJbFd3XcRdwT*fDhvHhwN@_6GBLWmjyrYFMUXpFsKhf*CARtJ%B@7uQZKxmg2k#2UE5KK#9Ngv$=WZ+tDyp$9y3uhej@kBbSz$P^mrn9_j-7UMAwcRGfRcNsj%yf+A8u=ezSPLbj7M$M_h3pmy$c4^U3tXA^NB2E#su3f9ZxUQgKsG@cp@wy&NK#qYhJM-U3hgRt*6Xvk$!kP&UF*RAFk7WtvH4yEgBS^pnMhYZvE6PR_SB-=NmFukbveg*EQpz+QsRu7fpTkvs9Yd+yrCGzrb^%^jeZGa52+dm28_d#mLKG6g28MTPbV6K4sL^5w^$ndvrfUD-g3Ja8prW$d!kjH=kqqw9dLS3').toString();
                    localStorage.setItem('data', ciphertext)
                })

				//log user in log reducer
				dispatch({
					type: 'LOGIN'
				})
				navigate('/');
			})
			.catch((error)=>{
				setLoaderState(false);
				setLoginError(error.response.data.error)
			});
		}
	}
	// ------------------------------------------------------------------------------
	//Register form
	const nameToggleValidation = (e)=>{
		if(!validator.isLength(e.target.value, {min:1, max:255})){
			setNameToggle(false);
		}else{
			setNameToggle(true);
			const middle = {...registerData};
			middle.last_name = e.target.value
			setRegisterData(middle)
		}
	}

	const firstnameToggleValidation = (e)=>{
		if(!validator.isLength(e.target.value, {min:1, max:255})){
			setFirstNameToggle(false);
		}else{
			setFirstNameToggle(true);
			const middle = {...registerData};
			middle.first_name = e.target.value
			setRegisterData(middle)
		}
	}

	const emailToggleValidation = (e)=>{
		if(!validator.isEmail(e.target.value)){
			setEmailToggle(false);
		}else{
			setEmailToggle(true);
			const middle = {...registerData};
			middle.email = e.target.value
			setRegisterData(middle)
		}
		console.log('login')
	}

	const passwordToggleValidation = (e)=>{
		if(!validator.isLength(e.target.value, {min:1, max:255})){
			setPasswordToggle(false);
		}else{
			setPasswordToggle(true);
			const middle = {...registerData};
			middle.password = e.target.value
			setRegisterData(middle)
		}
	}

	const contactToggleValidation = (e)=>{
		if(!validator.isNumeric(e.target.value) || !validator.isLength(e.target.value, {min:10, max:10})){
			setContactToggle(false);
		}else{
			setContactToggle(true);
			const middle = {...registerData};
			middle.contact = e.target.value
			setRegisterData(middle)
		}
	}

	const registerFormValidation = (e)=>{
		e.preventDefault();
		setRegisterLoaderState(true);
		setRegisterFirstLoad(true);
		if(!nameToggle || !firstNameToggle || !emailToggle || !contactToggle || !passwordToggle || !usingConditionValue){
			if(!usingConditionValue){
				setUsingConditionError(true);
			}else{
				setUsingConditionError(false)
			}
			setRegisterFormToggle(false);
			setRegisterLoaderState(false);
		}else{
			setRegisterFormToggle(true);
			axios.post(URLS.register, registerData)
			.then((response)=>{
				console.log((response));
				setRegisterLoaderState(false);
				resgisterSuccessNotify();
				formRef.current.reset();
			})
			.catch((error)=>{
				setRegisterLoaderState(false);
				console.log(error);
			});
		}
	}

	//register success toast
	const date = new Date();
	const time = `${date.getHours()}:${date.getMinutes()}`;
	const resgisterSuccessNotify = () => toast.custom(
		<div className="bg-green-500 shadow-lg w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3">
			<div className="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
			<p className="font-bold text-white flex items-center">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
				</svg>
				Création de compte</p>
			<div className="flex items-center">
				<p className="text-white opacity-90 text-xs">{time}</p>
				<button type="button" className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" data-mdb-dismiss="toast" aria-label="Close"></button>
			</div>
			</div>
			<div className="p-3 bg-green-500 rounded-b-lg break-words text-white">
				Votre compte kalloba a été créé avec succès
			</div>
		</div>
	);
  return (
    <div className='grid grid-cols-1'>
		<Toaster position="top-right" reverseOrder={false} />

        <div className=''>
            <SimpleShopNavBar/>
            <div className='mt-7 font-ubuntu max-w-xs md:max-w-xl mx-auto grid grid-cols-2 border-b border-kalloba/[.4] text-white'>
              <div className={loginToggle ? 'mx-auto bg-kalloba md:pb-1 cursor-pointer px-3 md:px-8 pt-2 rounded-t text-xl animate__animated animate__fadeIn' : 'mx-auto text-kalloba px-3 pt-2 rounded-t text-xl cursor-pointer'} onClick={loginState}>Connexion</div>
              <div className={!loginToggle ? 'mx-auto md:pb-1 bg-kalloba md:px-8 px-3 pt-2 rounded-t text-xl animate__animated animate__fadeIn cursor-pointer' : 'mx-auto text-kalloba px-3 pt-2 rounded-t text-xl cursor-pointer'} onClick={registerState}>Inscription</div>
            </div>

			{/* error block */}
			{loginError && loginToggle && <Error error={loginError} message="Veuillez verifier vos informations"/>}

            {loginToggle ? (
                <div className='mt-7 max-w-xs md:max-w-sm mx-auto font-ubuntu animate__animated animate__fadeIn'>
                  <form action="" onSubmit={(e)=>loginFormValidation(e)}>
					{/* email */}
                    <div className='grid grid-rows-2'>
                      <label htmlFor="email" className='my-auto font-bold text-kalloba'>Email</label>
                      <input type="text" id='email' placeholder='Entrer votre email' onInput={(e)=>loginEmailValidation(e)} className='form-control border border-gray-400 text-kalloba p-2 rounded focus:outline-none focus:border-kalloba'/>
					  {(!loginFormToggle && !loginEmailToggle && loginFirstLoad) && <small className='text-red-500 text-sm font-bold'>Vous devez saisir votre email</small>}
                    </div>

					{/* password */}
                    <div className='grid grid-rows-2 mt-5'>
                      <label htmlFor="password" className='my-auto font-bold text-kalloba'>Mot de passe</label>
                      <span className='flex'>
						<input type={eye ? "text" : "password"} id='password' placeholder='Entrer votre mot de passe' onInput={(e)=>loginPasswordValidation(e)} className='form-control border w-full border-gray-400 text-kalloba p-2 rounded focus:outline-none focus:border-kalloba'/>
						{eye ? <i className="bi bi-eye-fill cursor-pointer text-kalloba px-2 border border-kalloba px-auto ml-2 rounded-full my-auto" onClick={()=>changeEye()}></i> : <i className="bi bi-eye-slash cursor-pointer text-gray-400 px-2 border border-gray-400 px-auto ml-2 rounded-full my-auto" onClick={()=>changeEye()}></i> }
					  </span>
					  {!loginFormToggle && !loginPasswordToggle && loginFirstLoad && <small className='text-red-500 text-sm font-bold'>Vous devez saisir votre mot de passe</small>}
					</div>
					
					{/* submit button */}
					<div className='justify-center flex mt-5'>
						<button className='btn bg-kalloba text-white px-3 py-2 rounded' disabled={loaderState}>
							{!loaderState ? 'Se connecter' : <div className="border-t-transparent border-b-opacity-60 mx-9 w-6 h-6 border-2 border-red-500 border-solid rounded-full animate-spin"></div>}
						</button>
					</div>
                  </form>
                </div>
				):(
					<div className='mt-7 md:mt-2 max-w-xs md:max-w-sm mx-auto font-ubuntu animate__animated animate__fadeIn mb-5'>
						<form ref={formRef} onSubmit={(e)=>registerFormValidation(e)}>
							{/* name */}
							<div className='grid grid-rows-2'>
								<label htmlFor="name" className='my-auto font-bold text-kalloba required'>Nom</label>
								<input type="text" id='name' placeholder='Entrer votre nom' className='form-control border border-gray-400 text-kalloba p-2 rounded focus:outline-none focus:border-kalloba' onInput={(e)=>nameToggleValidation(e)}/>
								{!nameToggle && !registerFormToggle && registerFirstLoad && <small className='text-red-500 text-sm font-bold'>Vous devez saisir votre nom</small>}
							</div>

							{/* first name */}
							<div className='grid grid-rows-2'>
								<label htmlFor="firstName" className='my-auto font-bold text-kalloba required'>Prénom</label>
								<input type="text" id='firstName' placeholder='Entrer votre prénom' className='form-control border border-gray-400 text-kalloba p-2 rounded focus:outline-none focus:border-kalloba' onInput={(e)=>{firstnameToggleValidation(e)}}/>
								{!firstNameToggle && !registerFormToggle && registerFirstLoad && <small className='text-red-500 text-sm font-bold'>Vous devez saisir votre prénom</small>}
							</div>

							{/* email */}
							<div className='grid grid-rows-2'>
								<label htmlFor="email" className='my-auto font-bold text-kalloba required'>Email</label>
								<input type="text" id='email' placeholder='Entrer votre email' className='form-control border border-gray-400 text-kalloba p-2 rounded focus:outline-none focus:border-kalloba' onInput={(e)=>emailToggleValidation(e)}/>
								{!emailToggle && !registerFormToggle && registerFirstLoad && <small className='text-red-500 text-sm font-bold'>Vous devez saisir votre email</small>}
							</div>

							{/* Contact */}
							<div className='grid grid-rows-2'>
								<label htmlFor="contact" className='my-auto font-bold text-kalloba required'>Contact</label>
								<span className='flex'>
									<span className='my-auto mx-2'>+225</span>
									<input type="tel" id='contact' placeholder='Entrer votre contact' className='form-control border border-gray-400 text-kalloba p-2 md:w-full rounded focus:outline-none focus:border-kalloba' onInput={(e)=>{contactToggleValidation(e)}}/>
								</span>
								{!contactToggle && !registerFormToggle && registerFirstLoad && <small className='text-red-500 text-sm font-bold'>Vous devez saisir votre contact</small>}
							</div>

							{/* password */}
							<div className='grid grid-rows-2'>
								<label htmlFor="password" className='my-auto font-bold text-kalloba required'>Mot de passe</label>
								<span className='flex'>
									<input type={registerEye ? "text" : "password"} id='password' placeholder='Entrer votre mot de passe' onInput={(e)=>passwordToggleValidation(e)} className='form-control border w-full border-gray-400 text-kalloba p-2 rounded focus:outline-none focus:border-kalloba'/>
									{registerEye ? <i className="bi bi-eye-fill cursor-pointer text-kalloba px-2 border border-kalloba px-auto ml-2 rounded-full my-auto" onClick={()=>changeRegisterEye()}></i> : <i className="bi bi-eye-slash cursor-pointer text-gray-400 px-2 border border-gray-400 px-auto ml-2 rounded-full my-auto" onClick={()=>changeRegisterEye()}></i> }
								</span>
								{!passwordToggle && !registerFormToggle && registerFirstLoad && <small className='text-red-500 text-sm font-bold'>Vous devez saisir votre mot de passe</small>}
							</div>

							<div className='mt-3'>
								<label htmlFor="sellingConditions" className={`${usingConditionError ? 'text-red-500 font-bold' : 'text-kalloba'} required mr-2 cursor-pointer`}>Conditions générales d'utilisation</label>
								<input checked={usingConditionValue} type="checkbox" className='accent-kalloba focus:outline-none rounded-full cursor-pointer' id='sellingConditions' onChange={()=>{setUsingConditionValue(!usingConditionValue)}}/>
							</div>

							{/* submit button */}
							<div className='justify-center flex mt-5'>
								<button className='btn bg-kalloba text-white px-3 py-2 md:px-10 rounded ' disabled={registerLoaderState}>
									{!registerLoaderState ? 'Enregistrer' : <div className="border-t-transparent border-b-opacity-60 mx-8 w-6 h-6 border-2 border-red-500 border-solid rounded-full animate-spin"></div>}
								</button>
							</div>
						</form>
					</div>
				)
            }
        </div>
    </div>
  )
}
