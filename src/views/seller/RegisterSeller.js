import React, {useState, useEffect} from 'react'
import SimpleShopNavBar from '../../components/navbar/SimpleShopNavBar'
import SellerPage from '../../assets/img/SellerPage.png'
import RegisterSellerSuccess from '../../assets/img/RegisterSellerSuccess.png'
import toast, {Toaster} from 'react-hot-toast';
import validator from 'validator'
import axios from 'axios';
import URLS from '../../components/api/API';
import FUNCTIONS from '../../functions/functions';

export default function RegisterSeller() {
    const [steps, setSteps] = useState('resume');
    const [sellerInfosData, setSellerInfosData] = useState()
    const [storeData, setStoreData] = useState()
    const [disabled, setDisabled] = useState(false);
    const [userAuthenticated, setUserAuthenticated] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false);
    const [sellingConditionValue, setSellingConditionValue] = useState(false);
    const [usingConditionValue, setUsingConditionValue] = useState(false);
    const [sellingConditionError, setSellingConditionError] = useState(false);
    const [usingConditionError, setUsingConditionError] = useState(false);

    // seller infos block
    const [sellerNameValue, setSellerNameValue] = useState('');
    const saveSellerNameValue = (e)=>{
        setSellerNameValue(e.target.value);
    }
    const [sellerFirstNameValue, setSellerFirstNameValue] = useState('');
    const saveSellerFirstName = (e)=>{
        setSellerFirstNameValue(e.target.value)
    }

    const [sellerEmailValue, setSellerEmailValue] = useState('');
    const saveSellerEmailValue = (e)=>{
        setSellerEmailValue(e.target.value);
    }
    const [sellerContactValue, setSellerContactValue] = useState('');
    const saveContactValue = (e)=>{
        setSellerContactValue(e.target.value)
    }

    // validate seller info function
    const validateSellerInfo = ()=>{
        if(steps==='account'){
            if(!validator.isLength(sellerNameValue, {min: 2, max:255})){
                notify('error','Informations sur le vendeur', 'Vous devez saisir votre nom !');
                return 0;
            }
            if(!validator.isLength(sellerFirstNameValue, {min:2, max:255})){
                notify('error', 'Informations sur le vendeur', 'Vous devez saisir votre prénom');
                return 0;
            }
            if(!validator.isEmail(sellerEmailValue)){
                notify('error', 'Informations sur le vendeur', 'Vous devez saisir une adresse email valide');
                return 0;
            }
            if(!validator.isNumeric(sellerContactValue) || !validator.isLength(sellerContactValue, {min: 8, max:10})){
                notify('error', 'Informations sur le vendeur', 'Vous devez saisir');
                return 0;
            }
            setSellerInfosData(
                {
                    'seller_last_name': sellerNameValue,
                    'seller_first_name': sellerFirstNameValue,
                    'seller_email': sellerEmailValue,
                    'seller_contact': sellerContactValue,
                }
            )
            console.log(sellerInfosData);
            setSteps('store')
        }else if(steps==='store'){
            if(!validator.isLength(storeNameValue, {min:1})){
                notify('error', 'Informations sur la boutique', 'Vous devez renseigner le nom de votre boutique');
                return 0;
            }
            if(!validator.isEmail(storeEmailValue)){
                notify('error', 'Informations sur la boutique', 'Vous devez renseigner un email valide pour la boutique');
                return 0;
            }
            if(storeEmailValue !== storeEmailConfirmValue){
                notify('error', 'Informations sur la boutique', 'Les deux emails ne correspondent pas');
                return 0;
            }
            if(!validator.isNumeric(storeManagerContactValue) || !validator.isLength(storeManagerContactValue, {min:10, max:10})){
                notify('error', 'Informations sur la boutique', 'Vous devez renseigner un contact valide pour le gérant');
                return 0;
            }
            if(storeOtherContactValue){
                if(!validator.isNumeric(storeOtherContactValue) || !validator.isLength(storeOtherContactValue, {min:10, max:10})){
                    notify('error', 'Informations sur la boutique', 'Le second contact de la boutique n\'est pas valide');
                    return 0;
                }
            }
            if(!validator.isLength(storeLocationValue, {min:5, max:255})){
                notify('error', 'Informations sur la boutique', 'Vous devez renseigner une adresse valide');
                return 0;
            }
            if(storePasswordValue){
                if(!validator.isStrongPassword(storePasswordValue, {minLength:8})){
                    notify('warning', 'Informations sur la boutique', 'Votre mot de passe est faible. Vous devez utiliser des symboles, des majuscules, minuscules et des symboles');
                    return 0;
                }
            }else{
                notify('error', 'Informations sur la boutique', 'Vous devez créer un mot de passe');
                return 0;
            }
            if(storePasswordValue !== storePasswordConfirmValue){
                notify('error', 'Informations sur la boutique', 'Les deux mots de passe sont différents');
                return 0;
            }

            const checkData = {
                email: storeEmailValue,
                model: 'store'
            }
            axios.post(URLS.checkObjectExist, checkData)
            .then((response)=>{
                if(response.data.response){
                    notify('warning', 'Informations sur la boutique', 'Une boutique ayant le même email existe déjà');
                    return 0;
                }else{
                    setStoreData({
                        'store_name': storeNameValue,
                        'store_status': storeStatusValue,
                        'store_email': storeEmailValue,
                        'store_manager_contact': storeManagerContactValue,
                        'store_other_contact': storeOtherContactValue,
                        'store_address': storeLocationValue,
                        'seller_password': storePasswordValue,
                    });
        
                    setSteps('resume')
                }
            })
            .catch((error)=>{
                console.log(error)
            })

        }

    }

    // store data block
    const [storeNameValue, setStoreNameValue] = useState('');
    const saveStoreNameValue = (e)=>{
        setStoreNameValue(e.target.value);
    }

    const [storeStatusValue, setStoreStatusValue] = useState('company');

    const [storeEmailValue, setStoreEmailValue] = useState('');
    const saveStoreEmailValue = (e)=>{
        setStoreEmailValue(e.target.value)
    }

    const [storeEmailConfirmValue, setStoreEmailConfirmValue] = useState('');
    const saveStoreEmailConfirmValue = (e)=>{
        setStoreEmailConfirmValue(e.target.value);
    }

    const [storeManagerContactValue, setStoreManagerContactValue] = useState('');
    const saveStoreManagerContact = (e)=>{
        setStoreManagerContactValue(e.target.value);
    }

    const [storeOtherContactValue, setStoreOtherContactValue] = useState('');
    const saveStoreOtherContact = (e)=>{
        setStoreOtherContactValue(e.target.value);
    }

    const [storeLocationValue, setStoreLocationValue] = useState('');
    const saveStoreLocationValue = (e)=>{
        setStoreLocationValue(e.target.value)
    }

    const [storePasswordValue, setStorePasswordValue] = useState('');
    const saveStorePasswordValue = (e)=>{
        setStorePasswordValue(e.target.value);
    }
    
    const [storePasswordConfirmValue, setStorePasswordConfirmValue] = useState('');
    const savePasswordConfirmValue = (e)=>{
        setStorePasswordConfirmValue(e.target.value);
    }

    //toast
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    const notify = (state, subject, text) => toast.custom(
    <div className={`${state==='success' && 'bg-green-600'} ${state==='error' && 'bg-red-600'} ${state==='warning' && 'bg-orange-600'} shadow-lg w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`}>
        <div className={`${state==='success' && 'bg-green-600'} ${state==='error' && 'bg-red-600'} ${state==='warning' && 'bg-orange-600'} flex justify-between items-center py-2 px-3 bg-clip-padding border-b  rounded-t-lg`}>
            <p className="font-bold text-white flex items-center">
                {state==='success' && <i className="bi bi-check-circle-fill w-4 h-4 mr-2 text-white"></i> }
                {state==='error' && <i className="bi bi-x-circle-fill w-4 h-4 mr-2 text-white"></i> }
                {state==='warning' && <i className="bi bi-exclamation-triangle-fill w-4 h-4 mr-2 text-white"></i> }
                {subject}</p>
            <div className="flex items-center">
                <p className="text-white opacity-90 text-xs">{time}</p>
                <button type="button" className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" data-mdb-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
        <div className={`${state==='success' && 'bg-green-600'} ${state==='error' && 'bg-red-600'} ${state==='warning' && 'bg-orange-600'} p-3  rounded-b-lg break-words text-white`}>
            {text}
        </div>
    </div>
    );

    const saveSeller = ()=>{
        setDisabled(true)
        const data = {
            ...sellerInfosData,
            ...storeData,
        }

        // check checkbox condition
        if(!usingConditionValue && !sellingConditionValue){
            setSellingConditionError(true);
            setUsingConditionError(true);
            setDisabled(false);
            return 0;
        }
        if(!usingConditionValue){
            setUsingConditionError(true);
            setDisabled(false)
            return 0;
        }else{
            setUsingConditionError(false);
        }
        if(!sellingConditionValue){
            setSellingConditionError(true);
            setDisabled(false)
            return 0;
        }else{
            setSellingConditionError(false);
        }


        axios.post(URLS.registerSeller, data)
        .then((response)=>{
            if(response.data){
                notify('success', 'Devenir vendeur', 'Compte vendeur créé avec succès')
            }
            console.log(response.data);
            setSuccessMessage(true)
        })
        .catch((error)=>{
            console.log(error.status)
        })
    }

    useEffect(()=>{
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access')}`,
                },
            }
            axios.get(URLS.checkObjectExist, config)
            .then((response)=>{
                // if user is authenticated
                if(response.data.response){
                    axios.get(URLS.userInfo, config)
                    .then((responseData)=>{
                        setUserAuthenticated(true)
                        setSellerEmailValue(responseData.data.email)
                        setSellerContactValue(responseData.data.contact)
                        setSellerFirstNameValue(responseData.data.first_name)
                        setSellerNameValue(responseData.data.last_name)
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }, [])

    return (
        <>
            <SimpleShopNavBar/>
            <Toaster position='top-right'/>
            {!successMessage &&
                <div className='px-4 pt-2 bg-red-100 sticky top-16'>
                    <div className='flex justify-between items-center'>
                        <span className='text-kalloba font-bold text-xl md:text-3xl'>Devenir vendeur</span>
                        <img src={SellerPage} alt="" className='h-20' />
                    </div>
                </div>
            }
            {!successMessage ? (
                <>
                    {/* steps */}
                    <div className='max-w-sm md:max-w-xl mx-auto mt-3 md:mt-6'>
                        <ul className='flex justify-between items-center'>
                            <li>
                                <span className={`text-sm font-thin md:text-md md:p-1 px-1 md:px-2 ${steps==='account' ? 'bg-red-600' : 'bg-kalloba'} text-white rounded-full mr-2`}>1</span>
                                <span className={steps==='account' ? 'text-red-600' : 'text-kalloba'}>
                                    Compte 
                                </span>
                            </li>
                            <li>
                                <span><i className="bi bi-caret-right-fill text-kalloba"></i></span>
                            </li>
                            <li>
                                <span className={`text-sm font-thin md:text-md md:p-1 px-1 md:px-2 ${steps==='store' ? 'bg-red-600' : 'bg-kalloba'} text-white rounded-full mr-2`}>2</span>
                                <span className={steps==='store' ? 'text-red-600' : 'text-kalloba'}>
                                    Boutique
                                </span>
                            </li>
                            <li>
                                <span><i className="bi bi-caret-right-fill text-kalloba"></i></span>
                            </li>
                            <li>
                                <span className={`text-sm font-thin md:text-md md:p-1 px-1 md:px-2 ${steps==='resume' ? 'bg-red-600' : 'bg-kalloba'} text-white rounded-full mr-2`}>3</span>
                                <span className={steps==='resume' ? 'text-red-600' : 'text-kalloba'}>
                                    Résumé
                                </span>
                            </li>
                        </ul>
                    </div>
                    {/* body */}
                    <div className='mt-3 bg-gray-100 rounded-md max-w-sm md:max-w-4xl mx-auto'>
                        <div>
                            <div className='ml-3 font-bold text-md md:text-lg text-center pt-10'>
                                {steps==='account' &&  'Les informations sur le vendeur'}
                                {steps==='store' &&  'Les informations sur la boutique'}
                                {steps==='resume' &&  'Résumé des informations fournies'}
                            </div>

                            {/* Account place */}
                            {steps==='account' &&  
                                <div className='mx-3 md:mx-0 md:ml-3 mt-6 md:mt-3 pb-10 animate__animated animate__fadeIn'>
                                    <form action="" className='md:grid md:grid-cols-2'>
                                        <div className='flex items-center md:block justify-between md:mx-auto'>
                                            <div>
                                                <label htmlFor="lastName" className='text-sm md:text-md required'>Votre Nom</label>
                                            </div>
                                            <div>
                                                <input disabled={userAuthenticated} type="text" name="lastName" value={sellerNameValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveSellerNameValue(e)}}/>
                                            </div>
                                        </div>

                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4 md:mt-0'>
                                            <div>
                                                <label htmlFor="firstName" className='text-sm md:text-md required'>Votre Prénom</label>
                                            </div>
                                            <div>
                                                <input disabled={userAuthenticated} type="text" name="firstName" value={sellerFirstNameValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveSellerFirstName(e)}}/>
                                            </div>
                                        </div>
                                        
                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4'>
                                            <div>
                                                <label htmlFor="email" className='text-sm md:text-md required'>Votre email</label>
                                            </div>
                                            <div>
                                                <input disabled={userAuthenticated} type="email" name="email" value={sellerEmailValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveSellerEmailValue(e)}}/>
                                            </div>
                                        </div>
                                        
                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4'>
                                            <div>
                                                <label htmlFor="contact" className='text-sm md:text-md required'>Votre Contact</label>
                                            </div>
                                            <div>
                                                <input disabled={userAuthenticated} type="tel" name="contact" value={sellerContactValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveContactValue(e)}}/>
                                            </div>
                                        </div>
                                    </form>
                                    <div className='text-right mt-6 md:mr-24'>
                                        { userAuthenticated &&
                                            <button className='px-2 py-1 mr-3 rounded-md text-white bg-red-600 transition-all ease-in duration-350' onClick={()=>{FUNCTIONS.disconnectUser()}}>
                                                Déconnexion
                                            </button>
                                        }
                                        <button className='bg-kalloba px-2 py-1 rounded-md text-white hover:bg-green-600 transition-all ease-in duration-350' onClick={()=>{validateSellerInfo()}}>
                                            Continuer 
                                            <i className="bi bi-arrow-right-circle-fill text-white ml-1"></i>
                                        </button>
                                    </div>
                                    { userAuthenticated &&
                                        <div className='text-center'>
                                            <div className='bg-orange-500/[.5] text-kalloba md:mx-20 p-2 rounded-md font-bold mt-4'>
                                                Si ces informations sont incorrectes, veuillez à vous déconnecter avant de continuer.
                                            </div>
                                        </div>
                                    }
                                </div>
                            }

                            {/* store place */}
                            {steps==='store' &&  
                                <div className='mx-3 md:mx-0 md:ml-3 mt-6 md:mt-3 pb-10 animate__animated animate__fadeIn'>
                                    <form action="" className='md:grid md:grid-cols-2'>
                                        <div className='flex items-center md:block justify-between md:mx-auto'>
                                            <div>
                                                <label htmlFor="storeName" className='text-sm md:text-md required'>Nom de la boutique</label>
                                            </div>
                                            <div>
                                                <input type="text" name="storeName" value={storeNameValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveStoreNameValue(e)}}/>
                                            </div>
                                        </div>

                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4 md:mt-0'>
                                            <div className='text-center'>
                                                <label htmlFor="firstName" className='text-sm md:text-md required'>Je suis</label>
                                            </div>
                                            <div>
                                                {/* <input type="text" name="firstName" id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba'/> */}
                                                <label htmlFor="" className='text-sm md:text-md'>Une Entreprise</label>
                                                <input type="radio" name='status' value='company' checked className='ml-1 text-sm md:text-md md:cursor-pointer focus:bg-green-600' onChange={()=>{setStoreStatusValue('company')}}/>

                                                <label htmlFor="" className='ml-3 text-sm md:text-md'>Un particulier</label>
                                                <input type="radio" name='status' value='individual' className='ml-1 text-sm md:text-md md:cursor-pointer focus:bg-green-600' onChange={()=>{setStoreStatusValue('individual')}}/>
                                            </div>
                                        </div>
                                        
                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4'>
                                            <div>
                                                <label htmlFor="email" className='text-sm md:text-md required'>Email de la boutique</label>
                                            </div>
                                            <div>
                                                <input type="email" name="email" value={storeEmailValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveStoreEmailValue(e)}}/>
                                            </div>
                                        </div>
                                        
                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4'>
                                            <div>
                                                <label htmlFor="emailConfirm" className='text-sm md:text-md required'>Entrez à nouveau l'adresse email</label>
                                            </div>
                                            <div>
                                                <input type="email" name="emailconfirm" value={storeEmailConfirmValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveStoreEmailConfirmValue(e)}}/>
                                            </div>  
                                        </div>

                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4'>
                                            <div>
                                                <label htmlFor="email" className='text-sm md:text-md required'>Contact du gérant</label>
                                            </div>
                                            <div>
                                                <input type="tel" name="tel" value={storeManagerContactValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveStoreManagerContact(e)}}/>
                                            </div>
                                        </div>
                                        
                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4'>
                                            <div>
                                                <label htmlFor="contact" className='text-sm md:text-md'>Autre contact</label>
                                            </div>
                                            <div>
                                                <input type="tel" name="otherContact" value={storeOtherContactValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveStoreOtherContact(e)}}/>
                                            </div>  
                                        </div>

                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4'>
                                            <div>
                                                <label htmlFor="text" className='text-sm md:text-md required'>Adresse de la boutique</label>
                                            </div>
                                            <div>
                                                <input type="text" name="text" value={storeLocationValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveStoreLocationValue(e)}}/>
                                            </div>
                                        </div>
                                        

                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4'>
                                            <div>
                                                <label htmlFor="storePassword" className='text-sm md:text-md required'>Mot de passe</label>
                                            </div>
                                            <div>
                                                <input type="password" name="storePassword" value={storePasswordValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{saveStorePasswordValue(e)}}/>
                                            </div>
                                        </div>
                                        
                                        {/* empty block */}
                                        <div></div>
                                        
                                        <div className='flex items-center md:block justify-between md:mx-auto mt-4'>
                                            <div>
                                                <label htmlFor="passwordConfirm" className='text-sm md:text-md required'>Confirmer le mot de passe</label>
                                            </div>
                                            <div>
                                                <input type="password" name="passwordConfirm" value={storePasswordConfirmValue} id="" className='border text-kalloba rounded-md p-1 focus:outline-none focus:border-kalloba' onInput={(e)=>{savePasswordConfirmValue(e)}}/>
                                            </div>  
                                        </div>
                                    </form>
                                    {/* */}
                                    <div className= 'flex justify-between md:mx-20 mt-10' >
                                        <button className='bg-kalloba px-2 py-1 rounded-md text-white hover:bg-red-600 transition-all ease-in duration-350' onClick={()=>{setSteps('account')}}>
                                            <i className="bi bi-arrow-left-circle-fill text-white mr-1"></i>
                                            Précédent
                                        </button>
                                        <button className='bg-kalloba px-2 py-1 rounded-md text-white hover:bg-red-600 transition-all ease-in duration-350' onClick={()=>{validateSellerInfo()}}>
                                            Continuer 
                                            <i className="bi bi-arrow-right-circle-fill text-white ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            }

                            {/* resume place */}
                            {steps==='resume' &&  
                                <div className='mx-3 md:mx-0 md:ml-3 mt-6 md:mt-3 pb-10 animate__animated animate__fadeIn'>
                                    <div className='md:max-w-xl mx-auto'>
                                        {/* last name */}
                                        <div className='my-3'>
                                            <span className='text-lg text-red-600 border border-dashed p-1 rounded-md border-red-500 font-bold'>Informations sur le vendeur</span>
                                        </div>
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Nom du vendeur</span>
                                            </div>
                                            <div className='text-right'>
                                                <span className='font-bold'>{sellerNameValue}</span>
                                            </div>
                                        </div>
                                        {/* first name */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Prénom du vendeur</span>
                                            </div>
                                            <div className='text-right'>
                                                <span className='font-bold'>{sellerFirstNameValue}</span>
                                            </div>
                                        </div>
                            
                                        {/* Seller Email */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Email de connexion</span>
                                            </div>
                                            <div className='text-right truncate'>
                                                <span className='font-bold bg-kalloba text-white rounded-tl-lg rounded-br-lg p-1 px-2 text-sm'>{sellerEmailValue}</span>
                                            </div>
                                        </div>
                                        {/* Seller Password */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Mot de passe</span>
                                            </div>
                                            <div className='text-right truncate'>
                                                <span className='bg-red-600 text-white p-1 px-2 text-sm rounded-tl-lg rounded-br-lg'>Mot de passe saisi</span>
                                            </div>
                                        </div>

                                        {/* Seller Contact */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Contact du vendeur</span>
                                            </div>
                                            <div className='text-right'>
                                                <span className='font-bold'>+225 {sellerContactValue}</span>
                                            </div>
                                        </div>

                                        <hr className='border border-2 border-kalloba my-4 mb-5'/>

                                        {/* store info */}
                                        <div className='my-3'>
                                            <span className='text-lg text-red-600 border border-dashed p-1 rounded-md border-red-500 font-bold'>Informations sur la boutique</span>
                                        </div>

                                        {/* store name */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Nom de la boutique</span>
                                            </div>
                                            <div className='text-right'>
                                                <span className='font-bold'>{storeNameValue}</span>
                                            </div>
                                        </div>
                                        {/* first name */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Statut</span>
                                            </div>
                                            <div className='text-right'>
                                                <span className='font-bold'>{storeStatusValue==='company' ? 'Entreprise' : 'Particulier'}</span>
                                            </div>
                                        </div>

                                        {/* Store Email */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Email du de la boutique</span>
                                            </div>
                                            <div className='text-right truncate'>
                                                <span className='font-bold'>{storeEmailValue}</span>
                                            </div>
                                        </div>

                                        {/* Manager Contact */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Contact du gérant</span>
                                            </div>
                                            <div className='text-right'>
                                                <span className='font-bold'>+225 {storeManagerContactValue}</span>
                                            </div>
                                        </div>

                                        {/* Other Contact */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Autre contact</span>
                                            </div>
                                            <div className='text-right'>
                                                <span className='font-bold'>{storeOtherContactValue ? '+225 ' +storeOtherContactValue : '- - - - - - - - - - - - - -'}</span>
                                            </div>
                                        </div>

                                        {/* Other Contact */}
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='text-left'>
                                                <span>Adresse</span>
                                            </div>
                                            <div className='text-right'>
                                                <span className='font-bold'>{storeLocationValue}</span>
                                            </div>
                                        </div>

                                        {/* condition */}
                                        <div className='text-right'>
                                            <div>
                                                <label htmlFor="sellingConditions" className={`${sellingConditionError ? 'text-red-600 font-bold' : 'text-kalloba'} required mr-2 cursor-pointer`}>Conditions générales de vente</label>
                                                <input checked={sellingConditionValue} type="checkbox" className='accent-kalloba focus:outline-none rounded-full cursor-pointer' id='sellingConditions' onChange={()=>{setSellingConditionValue(!sellingConditionValue)}}/>
                                            </div>
                                            <div>
                                                <label htmlFor="usingConditions" className={`${usingConditionError ? 'text-red-600 font-bold' : 'text-kalloba'} required mr-2 cursor-pointer`}>Conditions générales d'utilisation</label>
                                                <input checked={usingConditionValue} type="checkbox" className='accent-kalloba focus:outline-none rounded-full cursor-pointer' id='usingConditions' onChange={()=>{setUsingConditionValue(!usingConditionValue)}}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className= 'flex justify-between md:mx-20 mt-10' >
                                        <button className='bg-kalloba px-2 py-1 rounded-md text-white hover:bg-red-600 transition-all ease-in duration-350' disabled={disabled} onClick={()=>{setSteps('store')}}>
                                            <i className="bi bi-arrow-left-circle-fill text-white mr-1"></i>
                                            Précédent
                                        </button>
                                        <button className={`bg-kalloba ${disabled ? 'px-12 py-1.5' : 'px-2 py-1 hover:bg-green-600 transition-all ease-in duration-350' } rounded-md text-white`} disabled={disabled} onClick={()=>{saveSeller()}}>
                                            {
                                                !disabled ? (
                                                    <>
                                                    Enregistrer 
                                                    <i className="bi bi-check-circle-fill text-white ml-1"></i>
                                                    </>
                                                ) : (
                                                    <div className='rounded-full border-2 border-t-transparent border-red-500 w-6 h-6 animate-spin'>

                                                    </div>
                                                )
                                            }
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </>
                ):
                <div className='mt-20'>
                     <div className='mt-3 rounded-md max-w-sm md:max-w-4xl mx-auto'>
                        <img src={RegisterSellerSuccess} className='h-28' alt="" />
                        <div className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700" role="alert">
                            <h4 className="text-2xl font-medium leading-tight mb-2">Bien joué !</h4>
                            <p className="mb-4 md:max-w-xl text-justify text-sm md:text-lg">
                                Nous vous disons merci et soyez la bienvenue<i className="bi bi-balloon-heart-fill text-green-600"></i>. <br /> Nous sommes ravis de vous compter parmis nos vendeurs, 
                                notez que vous pouvez dès à présent enregistrer, publier vos produits et recevoir vos premières commandes.
                            </p>
                            <hr className="border-green-600 opacity-30"/>
                            <p className="mt-4 mb-0 text-sm md:text-lg font-bold">
                                Ensemble nous deviendrons plus grands !
                            </p>
                        </div>
                        <div className='text-right'>
                            <button className='btn bg-green-500 py-2 px-3 text-sm md:text-lg rounded-md text-white animate-pulse'>Espace d'administration <i className="bi bi-gear-wide-connected"></i></button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
