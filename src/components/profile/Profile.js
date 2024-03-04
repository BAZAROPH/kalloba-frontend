import ShopNavBar from '../navbar/ShopNavBar'
import { useState, useEffect, useRef} from 'react'
import axios from 'axios'
import URLS from '../api/API';
import ShopFooter from '../Footer.js/ShopFooter';
import FUNCTIONS from '../../functions/functions';
import validator from 'validator'
import toast, {Toaster} from 'react-hot-toast';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import FullPageLoader from '../loader/FullPageLoader';
var CryptoJS = require("crypto-js");


export default function Profile() {
    const [userInfo, setUserInfo] = useState();
    const [mdSwitch, setMdSwitch] = useState('PERSONAL_INFO');
    const [smSwitch, setSmSwitch] = useState(false);
    const [loadToggle, setLoadToggle] = useState(false);
    const [refreshUserInfo, setRefreshUserInfo] = useState([])

    const switcher = (choice)=>{
        switch(choice){
            case 'UPDATE_PASSWORD': {
                setMdSwitch('UPDATE_PASSWORD');
                setSmSwitch('UPDATE_PASSWORD');
                break;
            }
            case 'MESSENGING': {
                setMdSwitch('MESSENGING');
                setSmSwitch('MESSENGING');
                break;
            }
            case 'WISH_LIST': {
                setMdSwitch('WISH_LIST');
                setSmSwitch('WISH_LIST');
                break;
            }
            case 'VIEW_RECENTLY': {
                setMdSwitch('VIEW_RECENTLY');
                setSmSwitch('VIEW_RECENTLY');
                break;
            }
            case 'PAYMENT_METHOD': {
                setMdSwitch('PAYMENT_METHOD');
                setSmSwitch('PAYMENT_METHOD');
                break;
            }
            case 'DISCOUNT_CODE': {
                setMdSwitch('DISCOUNT_CODE');
                setSmSwitch('DISCOUNT_CODE');
                break;
            }
            case 'ADDRESS': {
                setMdSwitch('ADDRESS');
                setSmSwitch('ADDRESS');
                break;
            }
            case 'HELP': {
                setMdSwitch('HELP');
                setSmSwitch('HELP');
                break;
            }
            default: {
                setMdSwitch('PERSONAL_INFO');
                setSmSwitch('PERSONAL_INFO');
                break;
            }
        }
    }
    
    // check user is authenticated and get infos
    useEffect(()=>{
        if(localStorage.getItem('access')){
            axios.get(URLS.userInfo, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access')}`,
                },
            })
            .then((response)=>{
                setUserInfo(response.data);
                let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response.data), 
                'my-secret-key@12VJHQw#n6AT!ks=^&qgG?W*Z^HhxBEcBQjZ+m2m8SbUy--Whj&KN7Y%LaJJ9!#aP&RW!e+R@#aMPn--5HgcbnqaS?6=w%H!+sv+5=+qyLm6_vhp%C%j%7rcMA+qNYRdXrZ=pt!@79CRx=WPY+UvEx6S$&pTH*LzhK%&bZZyssuYdn5@wa5!WEmBBJY&9mL%sBXDRuqFA#dN7bLLw+Lcux--sjxQVGeZ6!%#V^hWs=x4UA%bLjbjRfT9RD%NPcdd@K5fu4PB%z@9@TU&Amh56@c+!XyW-3bc+BAhJ+PHz&pa_YMaz#Uvu3m?C7E3yfyEMZ32MLr83+9?C_n34N#K=P%Ujcxj@Nf+F7zda3rmQ_bjU3+p@f9!HyvjW@uCczcH!uZpBuaR@#?+-N6RPG+Za+KGfUGqX%fyT9gJHTvPZSqYgWKx_#dKdvLqhrjZCum^wUwf_Ka@PAGFDmx2SxNY^^C#Ye!PwRAFZV8+94q*WNAMK8WWTyDjHTZFk#vHK#Rty3fzS^5c?Z82_xgCbtMN6F5KTSMLM5!fEvRFeACEs2@EFTj2&k8Zwgbj%AA4+KQ7BcQZdN-=kVCxqRevwa*?z7!L?ynF!%7h6NgpYYS^FCR*PH^M#7N%v8YL?aQxQ-7zmssv39rv^Ry8ku3Q@kk7V7pXvAmH@c+*NspKnBXwP54K_gAtLWCx*GE8^FRg=x_bu^=T7B#QSCMwj$VWByL4FtANPsp+EV#U9t6auexhJDkUbP?PjJJa2QFy8De939KUbeqr_aHt%83kjaXF?LPv7a5b58JE_pQmSEGvxH#7QCYkPyp%ZxK$yrwC6zJfkMvaYmX35k#MG_XKWs72s8=S+3mcmtBL7r?g^_wk^Vcm63F3xNrm5eWzfA4AVRkM4y^!px#XrC*%qtBe-t9e+^2ew7TU#VKK!ewYAN+@C#NDS3=V5wZYrfNucxk8R7A$pj2bCJu^7VkKc!RMy$@=?HDZvPRNmpXuC#?+k75smAH^dFUuH_qsExQ*qrhtQ-xSB_=UURBzn6pkQ4pNu9+Zdky!7w^LmK24gYQKvHFJMX+7yvY-+3rkm$RBALJMye4%^A?F?MC5b?pjtJUmeJf3wuD7Qv@U#UJnef#gJ5nPZqf55RKG8tjrv#gxG9^ZjhVAqHV*h$Ck_$+vCQUz#hXC%bdGVc5&3#u!BCvrEf6qfKH@Xsp6vv3=Hu=yWyYm2gzhT^2m#Nk*5Wa!7GNu4UP^tN+dj?#nk3ZT4P=+ah%Av^mf!@cv75PXEndp8YYRUSUTKpz%#M4U@yC_d3=?D7Q$%p--=^DpApdPVpy?^Srrkfb*tQ&FF2%FhWBKSuWUE$?xjfNaNmZ=jkFC7?Qc*F*Cmum&&ag-gXecKGcH%PEdX4DtUj5d9EGKxrg?KQBd4vTF@Ugg&DSEMj#CKk%e#P@RhujKM9KFP$-X+wKQ7#2!rHkx!=hLMcP@#xb^=kkAXnRFcuvcbXt6$rjZN?Kz=E5N$4Uk$D@_2St#yCs&D-TaXmsvbnhEx4%_?KwEV%jvNccYbNrYZKDYRmrJTY?g57e7bxv%H^b^S3Qry6LBCEzcm46ZZX+Jp@ZRe!57FAp+X@73E3b?f*qYbYKwR=Wp7Be4h4$qUeqXuggReRccs$nawEyJxy*jR?vH^P@fw6m8TK@3QfDr#?_S*ZB5Dx$&S+GqNQLBVsK?CyhcNgYsbcu$VJbFd3XcRdwT*fDhvHhwN@_6GBLWmjyrYFMUXpFsKhf*CARtJ%B@7uQZKxmg2k#2UE5KK#9Ngv$=WZ+tDyp$9y3uhej@kBbSz$P^mrn9_j-7UMAwcRGfRcNsj%yf+A8u=ezSPLbj7M$M_h3pmy$c4^U3tXA^NB2E#su3f9ZxUQgKsG@cp@wy&NK#qYhJM-U3hgRt*6Xvk$!kP&UF*RAFk7WtvH4yEgBS^pnMhYZvE6PR_SB-=NmFukbveg*EQpz+QsRu7fpTkvs9Yd+yrCGzrb^%^jeZGa52+dm28_d#mLKG6g28MTPbV6K4sL^5w^$ndvrfUD-g3Ja8prW$d!kjH=kqqw9dLS3').toString();
                localStorage.setItem('data', ciphertext)
            })
        }
    }, [refreshUserInfo])

    // function used for update user
    async function update(data, loadPage=true, formRef=false){
        // begin loader
        if(loadPage){
            setLoadToggle(true);
        }
        await axios.patch(URLS.updateUser, data, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access')}`,
                },
            })
            .then((response)=>{
                //success notification
                updateNotify('success', response.data.success ? response.data.success : 'Modifications enregistrées avec succès')

                //refresh api
                setRefreshUserInfo(response.data)
                //stop loader
                setLoadToggle(false);

                // reset form
                if(formRef){
                    formRef.current.reset();
                }
            })
            .catch((error)=>{
                if(loadPage){
                    setLoadToggle(false);
                }
                if(error.response.data.error){
                    updateNotify('error', error.response.data.error)
                }else{
                    updateNotify('warning', 'Une erreur s\'est produite veuillez réessayer plus tard')
                }
            })
    }


    // update names and bith date variable
    const [updateNamesToggle, setUpdateNamesToggle] = useState(false);
    const updateNames = ()=>{
        setUpdateNamesToggle(!updateNamesToggle);
        setUpdateFirstNameValue(userInfo.first_name);
        setUpdateLastNameValue(userInfo.last_name);
        setUpdateBirthDateValue(userInfo.birth_date)
    }
    const [updateFirstNameValue, setUpdateFirstNameValue] = useState();
    const saveUpdateFirstNameValue = (e)=>{
        setUpdateFirstNameValue(e.target.value);
    }
    const [updateLastNameValue, setUpdateLastNameValue] = useState();
    const saveUpdateLastNameValue = (e)=>{
        setUpdateLastNameValue(e.target.value)
    }
    const [updateBithDateValue, setUpdateBirthDateValue] = useState();
    const saveUpdateBirthDateValue = (e)=>{
        setUpdateBirthDateValue(e.target.value)
    }
    //Names validation variable and send
    const saveUpdateNames = ()=>{
        if(!validator.isLength(updateFirstNameValue, {min:2, max:200})){
            updateNotify('error', 'Vous devez saisir un prénom valide')
        }
        if(!validator.isLength(updateLastNameValue, {min:2, max:200})){
            updateNotify('error', 'Vous devez saisir un nom valide')
        }

        if(validator.isLength(updateFirstNameValue, {min:2, max:200}) && validator.isLength(updateLastNameValue, {min:2, max:200})){
            if(userInfo.first_name!==updateFirstNameValue || userInfo.last_name!==updateLastNameValue || userInfo.birth_date!==updateBithDateValue){
                const data = {
                    'first_name': updateFirstNameValue,
                    'last_name': updateLastNameValue,
                    'birth_date': updateBithDateValue,
                }
                update(data);
            }
            setUpdateNamesToggle(!updateNamesToggle);

        }
    }


    //update address
    const [updateAddressToggle, setUpdateAddressToggle] = useState(false);
    const updateAddress = ()=>{
        setUpdateAddressToggle(!updateAddressToggle);
        if(userInfo.address){
            setUpdateAddressValue(userInfo.address)
        }else{
            setUpdateAddressValue('')
        }
    }
    const [updateAddressValue, setUpdateAddressValue] = useState();
    const saveUpdateAdressValue = (e)=>{
        setUpdateAddressValue(e.target.value);
    }

    //address validation variable and send
    const saveAddressUpdate = ()=>{
        if(validator.isLength(updateAddressValue, {min:2, max:255})){
            if(userInfo.address!==updateAddressValue){
                const data = {
                    'address': updateAddressValue
                }
                update(data);
            }
            setUpdateAddressToggle(!updateAddressToggle)
        }else{
            updateNotify('error', 'Vous devez saisir une adresse valide')
        }
    }

    // update contact 
    const [updateContactToggle, setUpdateContactToggle] = useState(false);
    const updateContact = ()=>{
        setUpdateContactToggle(!updateContactToggle);
        setUpdateContactValue(userInfo.contact)
    }
    const [updateContactValue, setUpdateContactValue] = useState();
    const saveUpdateContactValue = (e)=>{
        setUpdateContactValue(e.target.value);
    }
    const saveUpdateContact = ()=>{
        if(validator.isNumeric(updateContactValue) && validator.isLength(updateContactValue, {min:10, max:10})){
            if(userInfo.contact!==updateContactValue){
                const data = {
                    'contact': updateContactValue,
                }
                update(data);
            }
            setUpdateContactToggle(!updateContactToggle);
        }else{
            updateNotify('error', 'Vous devez saisir un contact valide')
        }
    }

    //toast
	const date = new Date();
	const time = `${date.getHours()}:${date.getMinutes()}`;
	const updateNotify = (state, text) => toast.custom(
		<div className={`${state==='success' && 'bg-green-500'} ${state==='error' && 'bg-red-500'} ${state==='warning' && 'bg-orange-500'} shadow-lg w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`}>
			<div className={`${state==='success' && 'bg-green-500'} ${state==='error' && 'bg-red-500'} ${state==='warning' && 'bg-orange-500'} flex justify-between items-center py-2 px-3 bg-clip-padding border-b  rounded-t-lg`}>
                <p className="font-bold text-white flex items-center">
                    {state==='success' && <i className="bi bi-check-circle-fill w-4 h-4 mr-2 text-white"></i> }
                    {state==='error' && <i className="bi bi-x-circle-fill w-4 h-4 mr-2 text-white"></i> }
                    {state==='warning' && <i className="bi bi-exclamation-triangle-fill w-4 h-4 mr-2 text-white"></i> }
                    Modification des informations personelles</p>
                <div className="flex items-center">
                    <p className="text-white opacity-90 text-xs">{time}</p>
                    <button type="button" className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" data-mdb-dismiss="toast" aria-label="Close"></button>
                </div>
			</div>
			<div className={`${state==='success' && 'bg-green-500'} ${state==='error' && 'bg-red-500'} ${state==='warning' && 'bg-orange-500'} p-3  rounded-b-lg break-words text-white`}>
				{text}
			</div>
		</div>
	);


    // Update PASSWORD BLOCK
    const [oldPasswordValue, setOldPasswordValue] = useState('');
    const saveOldPasswordValue = (e)=>{
        setOldPasswordValue(e.target.value);
    }

    const [newPasswordValue, setNewPasswordValue] = useState('');
    const saveNewPasswordValue = (e)=>{
        setNewPasswordValue(e.target.value)
    }
    const [newPasswordEye, setNewPasswordEye] = useState(false)
    const changeNewPasswordEye = ()=>{
        setNewPasswordEye(!newPasswordEye)
    }
    const [passwordLoader, setPasswordLoader] = useState(false)
	const resetPasswordFormRef = useRef();

    const updatePassword = (e)=>{
        e.preventDefault();
        setPasswordLoader(true)

        if(validator.isLength(newPasswordValue, {min:8, max:200})){
            const data = {
                old_password: oldPasswordValue,
                new_password: newPasswordValue
            }
            update(data, false, resetPasswordFormRef)
        }else{
            updateNotify('error', 'Vous devez saisir une mot de passe d\'au moins 8 caractères')
        }

        if(!validator.isLength(oldPasswordValue, {min:8, max:200})){
            updateNotify('error', 'Vous devez saisir votre actuel mot de passe')

        }
        setPasswordLoader(false)
    }
    return (
        <div className={`bg-slate-200 h-screen font-ubuntu grid grid-cols-1 snap-always ${loadToggle && 'overflow-hidden'}`}>
            {loadToggle && 
                <FullPageLoader></FullPageLoader>
            }

            <ShopNavBar refresh={FUNCTIONS.disconnectUser}/>
            <Toaster position="top-right" reverseOrder={true}/>


            {/* mobile profile */}
            <div className='bg-red-500 md:hidden py-2'>
                <div className='max-w-sm h-full mx-auto py-auto grid grid-rows-2 grid-cols-1'>
                    <div className='text-white font-medium text-sm'>
                        {userInfo && `${userInfo.last_name}, ${userInfo.first_name}`}
                    </div>
                    <div className='text-white text-thin text-sm'>
                        {userInfo && `${userInfo.email}`}
                    </div>
                </div>
            </div>

            <div className={`mt-2 ${ smSwitch===false && 'px-2'} md:hidden bg-slate-200 mb-4`}>
            {smSwitch===false &&
                <>
                    <div className='text-xl text-gay-300 pb-1 animate__animated animate__fadeIn'>
                        { smSwitch==='PERSONAL_INFO' | smSwitch===false && 'Mon Compte'}
                        { smSwitch==='UPDATE_PASSWORD' && 'Modifier le mot de passe'}
                        { smSwitch==='MESSENGING' && 'Mes messages'}
                        { smSwitch==='WISH_LIST' && 'Ma liste de souhait'}
                        { smSwitch==='VIEW_RECENTLY' && 'Les produits consultés récemment'}
                        { smSwitch==='PAYMENT_METHOD' && 'Mes moyens de paiement'}
                        { smSwitch==='DISCOUNT_CODE' && 'Mes codes promo'}
                        { smSwitch==='ADDRESS' && 'Mes adresses de livraison'}
                        { smSwitch==='HELP' && 'Demander de l\'aide'}
                    </div>
                    <div className='bg-white rounded-lg animate__animated animate__fadeIn'>
                        <ul className='divide-y-2'>
                            <li className='p-2' onClick={()=>switcher('PERSONAL_INFO')}><i className="bi bi-person-workspace pr-1"></i> Mes Informations Personnelles</li>
                            <li className='p-2' onClick={()=>switcher('UPDATE_PASSWORD')}><i className="bi bi-unlock pr-1"></i> Modifier le mot de passe</li>
                            <li className='p-2' onClick={()=>switcher('MESSENGING')}><i className="bi bi-envelope pr-1"></i> Messagerie</li>
                            <li className='p-2' onClick={()=>switcher('WISH_LIST')}><i className="bi bi-clipboard-heart pr-1"></i> Votre liste d'envies</li>
                            <li className='p-2' onClick={()=>switcher('VIEW_RECENTLY')}><i className="bi bi-clock-history pr-1"></i> Vue Récemment</li>
                        </ul>
                    </div>

                    <div className='text-md text-gay-300 pt-3 pb-2 animate__animated animate__fadeIn'>Adresses de Livraison & Vendeurs préférés </div>
                    <div className='bg-white rounded-lg animate__animated animate__fadeIn'>
                        <ul className='divide-y-2'>
                            <li className='p-2'><i className="bi bi-credit-card-2-back-fill pr-1"></i>Mes moyens de paiement</li>
                            <li className='p-2'><i className="bi bi-cash-coin pr-1"></i> Code promo</li>
                            <li className='p-2'><i className="bi bi-question-circle-fill pr-1"></i> Demander de l'aide</li>
                        </ul>
                    </div>
                </>
            }

            {smSwitch!==false &&
                <div className='m-1 ml-2 text-kalloba' onClick={()=>setSmSwitch(false)}>
                    <i class="bi bi-house-fill text-xl"></i>
                    <span className='ml-1'>Profil</span>
                </div>
            }
            {smSwitch==='PERSONAL_INFO' &&
                <div className="grid grid-cols-1 animate__animated animate__fadeIn">
                    {/* name and email block */}
                    <div className='border border-gray-300 shadow-lg  m-2 bg-white rounded-md'>
                        <ul className='divide-y'>
                            <li className='p-2'>
                                <div className='grid grid-cols-3'>
                                    <div className='col-span-2'>
                                        Informations Personnelles
                                    </div>
                                    <div className='text-right'>
                                        {!updateNamesToggle ? (
                                            <i className="bi bi-pen px-3 py-2 rounded-full hover:bg-green-500/[.2] hover:text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateNames()}></i>
                                        ):(
                                            <div>
                                                <i className="bi bi bi-check-circle px-3 py-2 rounded-full hover:bg-green-500/[.2] text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>saveUpdateNames()}></i>
                                                <i className="bi bi-x-circle px-3 py-2 rounded-full hover:bg-red-500/[.2] text-red-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateNames()}></i>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li className='p-2'>
                                {!updateNamesToggle ? (
                                    <>
                                        <div className='mb-2 text-kalloba font-semibold'>
                                            {userInfo && userInfo.first_name +' '+ userInfo.last_name}
                                        </div>
                                        <div>
                                            <span>Date de naissance: </span>
                                            <span className={`text-kalloba ${userInfo && userInfo.birth_date ? 'font-bold' : 'ml-2'}`}>
                                                {userInfo && userInfo.birth_date ? moment(userInfo.birth_date).format('DD - MM - YYYY') : 'Aucune date enregistrée'}
                                            </span>
                                        </div>
                                    </>

                                ) : (
                                    <>
                                        {/* update first_name and last_name */}
                                        <div className=' items-center flex mb-2 animate__animated animate__fadeIn'>
                                            <input type="text" value={updateFirstNameValue} onInput={(e)=>saveUpdateFirstNameValue(e)} className='form-control border border-gray-400 text-kalloba pl-1 rounded focus:outline-none focus:border-kalloba w-2/3 ' />

                                            <input type="text" value={updateLastNameValue} onInput={(e)=>saveUpdateLastNameValue(e)} className='form-control border border-gray-400 text-kalloba pl-1 rounded focus:outline-none focus:border-kalloba w-1/2 ml-2' />
                                        </div>
                                        <div className='animate__animated animate__fadeIn'>
                                            <input type="date" value={updateBithDateValue ? updateBithDateValue : ''} className='form-control border border-gray-400 w-[14em] pl-2 cursor-pointer text-kalloba rounded focus:outline-none focus:border-kalloba' onInput={(e)=>saveUpdateBirthDateValue(e)}/>
                                        </div>
                                    </>
                                )}

                                <div className='mt-4 text-sm float-right p-2'>
                                    <button className='uppercase p-2 bg-orange-500/[.2]  hover:bg-green-500/[.2] rounded-md hover:text-green-500 text-orange-500 transition-all ease-in-out duration-500 cursor-pointer' onClick={()=>switcher('UPDATE_PASSWORD')}>
                                        Modifier mon mot de passe
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    {/* address block  */}
                    <div className='border border-gray-300 m-2 rounded-md bg-white shadow-lg'>
                        <ul className='divide-y'>
                            <li className='p-2'>
                                <div className='grid grid-cols-3'>
                                    <div className='col-span-2'>
                                        Adresses
                                    </div>
                                    <div className='text-right'>
                                    {!updateAddressToggle ? (
                                        <i className="bi bi-pen px-3 py-2 rounded-full hover:bg-green-500/[.2] hover:text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateAddress()}></i>
                                        ):(
                                            <div>
                                                <i className="bi bi bi-check-circle px-3 py-2 rounded-full hover:bg-green-500/[.2] text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>saveAddressUpdate()}></i>
                                                <i className="bi bi-x-circle px-3 py-2 rounded-full hover:bg-red-500/[.2] text-red-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateAddress()}></i>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li className='p-2'>
                                <div className='mb-2 text-kalloba font-semibold'>
                                    Adresse principale :
                                </div>
                                <div className='font-thin text-xs text-gray-500'>
                                {!updateAddressToggle ? (
                                    userInfo && userInfo.address ? userInfo.address : 'Aucune adresse enregistrée'
                                    ) : (
                                        <textarea className='form-control animate__animated animate__fadeIn border border-gray-400 text-kalloba w-full h-[5rem] p-2 rounded focus:outline-none focus:border-kalloba' value={updateAddressValue} onInput={(e)=>{saveUpdateAdressValue(e)}}></textarea>
                                    )
                                }
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='border border-gray-300 bg-white m-2 rounded-md'>
                        <ul className='divide-y'>
                            <li className='p-2'>
                                <div className='grid grid-cols-2'>
                                    <div>
                                        Contacts
                                    </div>
                                    <div className='text-right'>
                                        {!updateContactToggle ? (
                                            <i className="bi bi-pen px-3 py-2 rounded-full hover:bg-green-500/[.2] hover:text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateContact()}></i>
                                        ):(
                                            <div>
                                                <i className="bi bi bi-check-circle px-3 py-2 rounded-full hover:bg-green-500/[.2] text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>saveUpdateContact()}></i>
                                                <i className="bi bi-x-circle px-3 py-2 rounded-full hover:bg-red-500/[.2] text-red-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateContact()}></i>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li className='p-2'>
                                {!updateContactToggle ? (
                                    <div className='mb-2 text-kalloba font-semibold'>
                                        +225 {userInfo && userInfo.contact ? <NumberFormat value={userInfo.contact} displayType='text' type='tel' prefix={'+225 '} format="## ### ### ##" /> : 'Aucun contact enregistré'}
                                    </div> 
                                    ):
                                    <input type="text" value={updateContactValue} className='form-control mb-2 animate__animated animate__fadeIn border border-gray-400 w-[14em] pl-2 text-kalloba rounded focus:outline-none focus:border-kalloba' onInput={(e)=>saveUpdateContactValue(e)}/>
                                }
                                <div className='text-kalloba font-bold'>
                                    {userInfo && userInfo.email}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            }

            {/* UPDATE__PASSWORD */}
            {smSwitch==='UPDATE_PASSWORD' &&
                <div className='my-20'>
                    <form ref={resetPasswordFormRef} action="">
                        <div className='border border-gray rounded-md mt-10 mx-auto'>
                            <div className="grid grid-rows-2 m-5">
                                {/* old password */}
                                <div className="grid grid-cols-1 w-3/4 mx-auto my-3">
                                    <label htmlFor="">Mot de passe actuel</label>
                                    <span className='flex'>
                                        <input type="password" id='password' className='form-control border py-1 w-full border-gray-400 text-kalloba pl-2 rounded focus:outline-none focus:border-kalloba' onInput={(e)=>saveOldPasswordValue(e)}/>
                                    </span>
                                </div>

                                {/* new password */}
                                <div className="grid grid-cols-1 w-3/4 mx-auto my-3">
                                    <label htmlFor="">Nouveau mot de passe</label>
                                    <span className='flex'>
                                        <input type={newPasswordEye ? "text" : "password"} id='password' className='form-control py-1 border w-full border-gray-400 text-kalloba pl-2 rounded focus:outline-none focus:border-kalloba' onInput={(e)=>saveNewPasswordValue(e)}/>
                                        {newPasswordEye ? <i className="bi bi-eye-fill cursor-pointer text-kalloba px-2 border border-kalloba px-auto ml-2 rounded-full my-auto" onClick={()=>changeNewPasswordEye()}></i> : <i className="bi bi-eye-slash cursor-pointer text-gray-400 px-2 border border-gray-400 px-auto ml-2 rounded-full my-auto" onClick={()=>changeNewPasswordEye()}></i> }
                                    </span>
                                </div>
                            </div>
                            <div className='text-center mb-3'>
                                <button className='btn bg-kalloba px-4 py-2 rounded-md text-white' onClick={(e)=>updatePassword(e)}>
                                    {passwordLoader ? <div className="border-t-transparent border-b-opacity-60 mx-8 w-6 h-6 border-2 border-red-500 border-solid rounded-full animate-spin"></div> : 'Modifier' }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }

            {smSwitch==='MESSENGING' &&
                'lol'
            }

            {smSwitch==='WISH_LIST' &&
                'lol'
            }

            {smSwitch==='VIEW_RECENTLY' &&
                'lol'
            }
            </div>


            <div className='text-xl text-red-500 text-center pb-3 md:hidden'>
                <button className='btn p-2 bg-red-500/[.2] border-red-500 border rounded-md focus:bg-red-500 focus:text-white' onClick={FUNCTIONS.disconnectUser}>
                    DECONNEXION
                </button>
            </div>



{/* -------------------------------------------------------------------------------------------------------------------------------- */}

            
            {/* computer profile */}
            <div className='hidden md:grid grid-cols-4 gap-4 m-6'>
                {/* menu block  */}
                <div className="col bg-white rounded-lg">
                    <ul className='divide-y-2 py-auto'>
                        <li className={`p-3 cursor-pointer rounded-t-lg ${mdSwitch==='PERSONAL_INFO' && 'bg-red-500 text-white  transition-all ease-in duration-300'}`} onClick={()=>switcher('PERSONAL_INFO')}><i className="bi bi-person-workspace pr-2"></i> Mes Informations Personnelles</li>
                        <li className={`p-3 cursor-pointer ${mdSwitch==='UPDATE_PASSWORD' && 'bg-red-500 text-white  transition-all ease-in duration-300'}`} onClick={()=>switcher('UPDATE_PASSWORD')}><i className="bi bi-unlock pr-2"></i> Modifier le mot de passe</li>
                        <li className={`p-3 cursor-pointer ${mdSwitch==='ADDRESS' && 'bg-red-500 text-white  transition-all ease-in duration-300'}`} onClick={()=>switcher('ADDRESS')}><i className="bi bi-geo-alt pr-2"></i>Adresses de livraison</li>
                        <li className={`p-3 cursor-pointer ${mdSwitch==='MESSENGING' && 'bg-red-500 text-white  transition-all ease-in duration-300'}`} onClick={()=>switcher('MESSENGING')}><i className="bi bi-envelope pr-2"></i> Messagerie</li>
                        <li className={`p-3 cursor-pointer ${mdSwitch==='WISH_LIST' && 'bg-red-500 text-white  transition-all ease-in duration-300'}`} onClick={()=>switcher('WISH_LIST')}><i className="bi bi-clipboard-heart pr-2"></i> Votre liste d'envies</li>
                        <li className={`p-3 cursor-pointer ${mdSwitch==='VIEW_RECENTLY' && 'bg-red-500 text-white  transition-all ease-in duration-300'}`} onClick={()=>switcher('VIEW_RECENTLY')}><i className="bi bi-clock-history pr-2"></i> Vue Récemment</li>
                        <li className={`p-3 cursor-pointer ${mdSwitch==='PAYMENT_METHOD' && 'bg-red-500 text-white  transition-all ease-in duration-300'}`} onClick={()=>switcher('PAYMENT_METHOD')}><i className="bi bi-credit-card-2-back-fill pr-2"></i>Moyens de paiement</li>
                        <li className={`p-3 cursor-pointer ${mdSwitch==='DISCOUNT_CODE' && 'bg-red-500 text-white  transition-all ease-in duration-300'}`} onClick={()=>switcher('DISCOUNT_CODE')}><i className="bi bi-cash pr-2"></i>Codes Promo</li>
                        <li className={`p-3 cursor-pointer rounded-b-lg ${mdSwitch==='HELP' && 'bg-red-500 text-white  transition-all ease-in duration-300'}`} onClick={()=>switcher('HELP')}><i className="bi bi-question-circle-fill pr-2"></i>Demander de l'aide</li>
                    </ul>
                </div>
                {/* edit or information block  */}
                <div className='col-span-3 bg-white rounded-lg'>
                    <ul className='divide-y-2'>
                        <li className='p-3 rounded-t-lg pl-3 font-bold text-white bg-kalloba text-center'>
                            { mdSwitch==='PERSONAL_INFO' && 'Mon Compte'}
                            { mdSwitch==='UPDATE_PASSWORD' && 'Modifier le mot de passe'}
                            { mdSwitch==='MESSENGING' && 'Mes messages'}
                            { mdSwitch==='WISH_LIST' && 'Ma liste de souhait'}
                            { mdSwitch==='VIEW_RECENTLY' && 'Les produits consultés récemment'}
                            { mdSwitch==='PAYMENT_METHOD' && 'Mes moyens de paiement'}
                            { mdSwitch==='DISCOUNT_CODE' && 'Mes codes promo'}
                            { mdSwitch==='ADDRESS' && 'Mes adresses de livraison'}
                            { mdSwitch==='HELP' && 'Demander de l\'aide'}
                        </li>


                        {/* PERSONAL_INFO */}
                        { mdSwitch==='PERSONAL_INFO' &&
                            <>
                                <li className=''>
                                    <div className="grid grid-cols-2 gap-2">
                                        {/* name and email block */}
                                        <div className='border boder-gray m-5 rounded-md'>
                                            <ul className='divide-y'>
                                                <li className='p-2'>
                                                    <div className='grid grid-cols-2'>
                                                        <div>
                                                            Informations Personnelles
                                                        </div>
                                                        <div className='text-right'>
                                                            {!updateNamesToggle ? (
                                                                <i className="bi bi-pen px-3 py-2 rounded-full hover:bg-green-500/[.2] hover:text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateNames()}></i>
                                                            ):(
                                                                <div>
                                                                    <i className="bi bi bi-check-circle px-3 py-2 rounded-full hover:bg-green-500/[.2] text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>saveUpdateNames()}></i>
                                                                    <i className="bi bi-x-circle px-3 py-2 rounded-full hover:bg-red-500/[.2] text-red-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateNames()}></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='p-2'>
                                                    {!updateNamesToggle ? (
                                                        <>
                                                            <div className='mb-2 text-kalloba font-semibold'>
                                                                {userInfo && userInfo.first_name +' '+ userInfo.last_name}
                                                            </div>
                                                            <div>
                                                                <span>Date de naissance: </span>
                                                                <span className={`text-kalloba ${userInfo && userInfo.birth_date ? 'font-bold' : 'ml-2'}`}>
                                                                    {userInfo && userInfo.birth_date ? moment(userInfo.birth_date).format('DD - MM - YYYY') : 'Aucune date enregistrée'}
                                                                </span>
                                                            </div>
                                                        </>

                                                    ) : (
                                                        <>
                                                            {/* update first_name and last_name */}
                                                            <div className=' items-center flex mb-2 animate__animated animate__fadeIn'>
                                                                <input type="text" value={updateFirstNameValue} onInput={(e)=>saveUpdateFirstNameValue(e)} className='form-control border border-gray-400 text-kalloba pl-1 rounded focus:outline-none focus:border-kalloba w-2/3 ' />

                                                                <input type="text" value={updateLastNameValue} onInput={(e)=>saveUpdateLastNameValue(e)} className='form-control border border-gray-400 text-kalloba pl-1 rounded focus:outline-none focus:border-kalloba w-1/2 ml-2' />
                                                            </div>
                                                            <div className='animate__animated animate__fadeIn'>
                                                                <input type="date" value={updateBithDateValue ? updateBithDateValue : ''} className='form-control border border-gray-400 w-[14em] pl-2 cursor-pointer text-kalloba rounded focus:outline-none focus:border-kalloba' onInput={(e)=>saveUpdateBirthDateValue(e)}/>
                                                            </div>
                                                        </>
                                                    )}

                                                    <div className='mt-4 text-sm float-right p-2'>
                                                        <button className='uppercase p-2 bg-orange-500/[.2]  hover:bg-green-500/[.2] rounded-md hover:text-green-500 text-orange-500 transition-all ease-in-out duration-500 cursor-pointer' onClick={()=>switcher('UPDATE_PASSWORD')}>
                                                            Modifier mon mot de passe
                                                        </button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        {/* address block  */}
                                        <div className='border boder-gray m-5 rounded-md'>
                                            <ul className='divide-y'>
                                                <li className='p-2'>
                                                    <div className='grid grid-cols-2'>
                                                        <div>
                                                            Adresses
                                                        </div>
                                                        <div className='text-right'>
                                                        {!updateAddressToggle ? (
                                                            <i className="bi bi-pen px-3 py-2 rounded-full hover:bg-green-500/[.2] hover:text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateAddress()}></i>
                                                            ):(
                                                                <div>
                                                                    <i className="bi bi bi-check-circle px-3 py-2 rounded-full hover:bg-green-500/[.2] text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>saveAddressUpdate()}></i>
                                                                    <i className="bi bi-x-circle px-3 py-2 rounded-full hover:bg-red-500/[.2] text-red-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateAddress()}></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='p-2'>
                                                    <div className='mb-2 text-kalloba font-semibold'>
                                                        Adresse principale :
                                                    </div>
                                                    <div className='font-thin text-xs text-gray-500'>
                                                    {!updateAddressToggle ? (
                                                        userInfo && userInfo.address ? userInfo.address : 'Aucune adresse enregistrée'
                                                        ) : (
                                                            <textarea className='form-control animate__animated animate__fadeIn border border-gray-400 text-kalloba w-full h-[5rem] p-2 rounded focus:outline-none focus:border-kalloba' value={updateAddressValue} onInput={(e)=>{saveUpdateAdressValue(e)}}></textarea>
                                                        )
                                                    }
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className='p-2'>
                                <div className="grid grid-cols-2 gap-2">
                                        {/* payment method block */}
                                        <div className='border boder-gray m-5 rounded-md'>
                                            <ul className='divide-y'>
                                                <li className='p-2'>
                                                    <div className='grid grid-cols-2'>
                                                        <div>
                                                            Mes vendeurs préférés
                                                        </div>
                                                        <div className='text-right'>
                                                            <i className="bi bi-plus-circle px-3 py-2 rounded-full hover:bg-green-500/[.2] hover:text-green-500 transition-all ease-in-out duration-500 cursor-pointer"></i>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='p-2'>
                                                    <div className='mb-2 text-kalloba font-semibold'>

                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        {/* second block  */}
                                        <div className='border boder-gray m-5 rounded-md'>
                                            <ul className='divide-y'>
                                                <li className='p-2'>
                                                    <div className='grid grid-cols-2'>
                                                        <div>
                                                            Contacts
                                                        </div>
                                                        <div className='text-right'>
                                                            {!updateContactToggle ? (
                                                                <i className="bi bi-pen px-3 py-2 rounded-full hover:bg-green-500/[.2] hover:text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateContact()}></i>
                                                            ):(
                                                                <div>
                                                                    <i className="bi bi bi-check-circle px-3 py-2 rounded-full hover:bg-green-500/[.2] text-green-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>saveUpdateContact()}></i>
                                                                    <i className="bi bi-x-circle px-3 py-2 rounded-full hover:bg-red-500/[.2] text-red-500 transition-all ease-in-out duration-500 cursor-pointer" onClick={()=>updateContact()}></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='p-2'>
                                                    {!updateContactToggle ? (
                                                        <div className='mb-2 text-kalloba font-semibold'>
                                                            +225 {userInfo && userInfo.contact ? <NumberFormat value={userInfo.contact} displayType='text' type='tel' prefix={'+225 '} format="## ### ### ##" /> : 'Aucun contact enregistré'}
                                                        </div> 
                                                        ):
                                                        <input type="text" value={updateContactValue} className='form-control mb-2 animate__animated animate__fadeIn border border-gray-400 w-[14em] pl-2 text-kalloba rounded focus:outline-none focus:border-kalloba' onInput={(e)=>saveUpdateContactValue(e)}/>
                                                    }
                                                    <div className='text-kalloba font-bold'>
                                                        {userInfo && userInfo.email}
                                                    </div>
                                                </li>
                                            </ul>
                                            
                                        </div>
                                    </div>
                                </li>
                            </>
                        }

                        {/* UPDATE__PASSWORD */}
                        { mdSwitch==='UPDATE_PASSWORD' &&
                            <>
                                <li>
                                    <form ref={resetPasswordFormRef} action="">
                                        <div className='border border-gray w-1/2 rounded-md mt-10 mx-auto'>
                                            <div className="grid grid-rows-2 m-5">
                                                {/* old password */}
                                                <div className="grid grid-cols-1 w-3/4 mx-auto my-3">
                                                    <label htmlFor="">Mot de passe actuel</label>
                                                    <span className='flex'>
                                                        <input type="password" id='password' className='form-control border py-1 w-full border-gray-400 text-kalloba pl-2 rounded focus:outline-none focus:border-kalloba' onInput={(e)=>saveOldPasswordValue(e)}/>
                                                    </span>
                                                </div>

                                                {/* new password */}
                                                <div className="grid grid-cols-1 w-3/4 mx-auto my-3">
                                                    <label htmlFor="">Nouveau mot de passe</label>
                                                    <span className='flex'>
                                                        <input type={newPasswordEye ? "text" : "password"} id='password' className='form-control py-1 border w-full border-gray-400 text-kalloba pl-2 rounded focus:outline-none focus:border-kalloba' onInput={(e)=>saveNewPasswordValue(e)}/>
                                                        {newPasswordEye ? <i className="bi bi-eye-fill cursor-pointer text-kalloba px-2 border border-kalloba px-auto ml-2 rounded-full my-auto" onClick={()=>changeNewPasswordEye()}></i> : <i className="bi bi-eye-slash cursor-pointer text-gray-400 px-2 border border-gray-400 px-auto ml-2 rounded-full my-auto" onClick={()=>changeNewPasswordEye()}></i> }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='text-center mb-3'>
                                                <button className='btn bg-kalloba px-4 py-2 rounded-md text-white' onClick={(e)=>updatePassword(e)}>
                                                    {passwordLoader ? <div className="border-t-transparent border-b-opacity-60 mx-8 w-6 h-6 border-2 border-red-500 border-solid rounded-full animate-spin"></div> : 'Modifier' }
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </li>
                            </>
                        }
                    </ul>
                </div>
                
            </div>
            <ShopFooter/>
        </div>
    )
}
