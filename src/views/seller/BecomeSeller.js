import React from 'react'
import { useNavigate } from 'react-router-dom'
import ScrollToTop from '../../components/scroll/ScrollToTop'
import ShopNavBar from '../../components/navbar/ShopNavBar'
import ShopFooter from '../../components/Footer.js/ShopFooter'
import sellerbg from '../../assets/img/sellerbg.jpg'
import Steps from '../../assets/img/Steps.png'
import Networking from '../../assets/icons/Networking.png'
import World from '../../assets/icons/World.png'
import Free from '../../assets/icons/Free.png'
import Support from '../../assets/icons/Support.png'
import Chat from '../../assets/icons/Chat.png'
import Help from '../../assets/icons/Help.png'
import BecomeSellerVideo from '../../assets/videos/BecomeSellerVideo.mp4'
import logo from '../../assets/img/logo.png'
import FUNCTIONS from '../../functions/functions';

export default function BecomeSeller() {
    const navigate = useNavigate();
    return (
        <>
            <ScrollToTop/>
            <ShopNavBar refresh={FUNCTIONS.disconnectUser}/>

            <div className='h-full bg-kalloba md:flex '>
                <img src={sellerbg} alt="become-kalloba-seller" className='md:w-3/5 md:mt-12' />
                <span className='text-red-500 md:text-4xl font-bold tracking-wide m-auto'>
                    <p className='text-center mt-9 md:mt-0'>
                        <span className='border border-red-500 rounded-md p-3 hover:text-white cursor-pointer hover:border-white hover:bg-red-600 transition-all ease-in duration-500' onClick={()=>{navigate('/seller/register')}}>
                            Devenir vendeur
                        </span>
                    </p>
                    <p className='m-auto text-lg md:text-2xl text-white text-center mt-5 mx-1 md:mx-0 md:mt-10 pb-2'>
                        Atteignez des millions d'acheteurs<br/> dans toute la Côte d'Ivoire <i className="bi bi-check-circle-fill text-red-600"></i>
                    </p>
                </span>
            </div>

            <div className=' bg-green-500 text-center '>
                <p className=' py-4 text-sm md:text-2xl text-white '>Commencez à vendre dès maintenant, c'est gratuit <i className="bi bi-emoji-sunglasses-fill text-white"></i></p>
            </div>

            {/* our avantages */}
            <div className='my-6 md:my-10 grid grid-cols-1 md:gap-10 md:grid-cols-3 mx-3 md:mx-6 '>
                <div>
                    <img src={Networking} alt="many-client" className='w-12 md:w-16'/>
                    <p className='text-md md:text-lg leading-light md:leading-light mt-1 font-bold text-kalloba'>
                        Connectez-vous avec des millions d'acheteurs
                    </p>
                    <p>
                        Kalloba est maintenant utilisé par des millions de boutiques à travers la Côte d'ivoire,
                        sautez sur l'occasion et montrer vos produits à toute la Côte d'ivoire et faites plus de bénéfice.
                    </p>
                </div>

                <div>
                    <img src={Free} alt="free-services" className='w-12 md:w-16 mt-8 md:mt-0'/>
                    <p className='text-md md:text-lg leading-light md:leading-light mt-1 font-bold text-kalloba'>
                        Des services gratuits à 100%
                    </p>
                    <p>
                        Vous gagnez ce que vous vendez. Kalloba ne prélève rien sur vos bénéfices et vous ne devez rien à kalloba.
                        Un service gratuit à 100% et au service de ses utilisateurs.
                    </p>
                </div>

                <div>
                    <img src={World} alt="world-accessibility" className='w-12 md:w-16 mt-8 md:mt-0'/>
                    <p className='text-md md:text-lg leading-light md:leading-light mt-1 font-bold text-kalloba'>
                        Accessible partout dans le monde
                    </p>
                    <p>
                        Gérez votre boutique, vos produits, vos ventes et vos commandes où que vous soyez sur la planète terre.
                        <br></br>Rapide, simple et efficace.
                    </p>
                </div>

                <div>
                    <img src={Chat} alt="chat-with-client" className='w-12 md:w-16 mt-8 md:mt-0'/>
                    <p className='text-md md:text-lg leading-light md:leading-light mt-1 font-bold text-kalloba'>
                        Discutez avec vos client
                    </p>
                    <p>
                        Profitez d'une messagerie sécurisée.<br></br>
                        Grâce au chat, échangez avec vos clients en temps réel. Mettez vous d'accord et concluez.
                    </p>
                </div>

                <div>
                    <img src={Help} alt="Assistance" className='w-12 md:w-16 mt-8 md:mt-0'/>
                    <p className='text-md md:text-lg leading-light md:leading-light mt-1 font-bold text-kalloba'>
                        Les facultés du e-commerce
                    </p>
                    <p>
                        Vous étes nouveau et avez besoin d'aide ? Aucune inquiétude, nous vous aidons à monter votre boutique, à créer vos produits
                        et à maximiser vos ventes. Vous deviendrez un As du domaine.
                    </p>
                </div>

                <div>
                    <img src={Support} alt="Assistance" className='w-12 md:w-16 mt-8 md:mt-0'/>
                    <p className='text-md md:text-lg leading-light md:leading-light mt-1 font-bold text-kalloba'>
                        Une assistance à votre disposition
                    </p>
                    <p>
                        Au moindre problème, kalloba avec son service de messagerie vous offre la possibilité de contacter le support.
                        Notre support est réactif, et efficace. Nous sommes paré à toute éventualité.
                    </p>
                </div>
            </div>

            {/* with what i can become seller on kalloba */}
            <div className='bg-kalloba text-white  text-center'>
                <p className='py-3 md:py-4 text-sm md:text-2xl text-white'>
                    Qu'est ce qu'il me faut pour commencer ? <i className="bi bi-emoji-smile-upside-down-fill"></i>
                </p>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-3 md:gap-7 bg-red-600 p-4 divide-y md:divide-none md:px-7'>
                <div className='my-3'>
                    <i className="bi bi-patch-check-fill text-white text-2xl md:text-4xl"></i> <span className='ml-1 text-white font-bold text-lg md:text-3xl'>Être honnête</span>
                    <p className='text-white mt-2 text-justify leading-7'>
                        La moralité est un facteur important chez kalloba. C'est notre réputation et la votre qui sont dans le
                        même panier, alors si vous n'êtes pas honnête nous supprimerons votre compte.
                    </p>
                </div>

                <div className='py-3'>
                    <i className="bi bi-cart-check-fill text-white text-2xl md:text-4xl"></i> <span className='ml-1 text-white font-bold text-lg md:text-3xl'>Produits originaux</span>
                    <p className='text-white mt-2 text-justify leading-7'>
                        Pour être un vendeur sur Kalloba, vous devez vendre uniquement des produits authentiques et neufs.
                        Nous n'acceptons pas les articles usagés ou contrefaits.
                    </p>
                </div>


                <div className='py-3'>
                    <i className="bi bi-geo-fill text-white text-2xl md:text-4xl"></i> <span className='ml-1 text-white font-bold text-lg md:text-3xl'>Étre basé en RCI</span>
                    <p className='text-white mt-2 text-justify leading-7'>
                        Pour être accepté, vous devez être basé en Côte d'Ivoire.
                    </p>
                </div>
            </div>

            {/* steps */}
            <div className='md:mt-10'>
                <div className='text-center text-3xl md:text-4xl text-kalloba mt-4 font-bold'>
                    <span className='border border-dashed px-2 rounded-md border-kalloba'>Comment ça marche ?</span>
                </div>
                <div className='m-8'>
                    <img src={Steps} alt="selling-steps" className='' />
                </div>
                <div className='mt-10 text-center mb-2'>
                    <button className='btn bg-kalloba font-bold p-2 md:p-4 text-sm md:text-lg rounded-lg text-white hover:bg-red-600 transition-all ease-in duration-350' onClick={()=>{navigate('/seller/register')}}>Commencer maintenant</button>
                </div>
            </div>

            {/* testimonial */}
            <div className='mt-8 md:mt-10 bg-gray-100 p-3'>
                <div className='text-center md:text-2xl  md:max-w-none font-bold'>
                    {/* <div className='text-sm md:text-lg text-gray-400 font-thin'>Découvrez les réussites d'autres vendeurs Kalloba</div> */}
                    Notre mission est d'aider les petites et moyennes entreprises à développer leurs activités
                </div>
            </div>
            <div>
                <div className='absolute text-white text-right mt-4 md:mt-6 mr-auto ml-2 md:ml-4'>
                    <img src={logo} alt="kalloba.com"  className='w-14 md:w-32'/>
                </div>
                <video src={BecomeSellerVideo} autoPlay muted loop={true}></video>
            </div>

            {/* Pourquoi nous ? */}
            <div className='bg-gray-100 p-3'>
                <div className='text-center md:text-2xl  md:max-w-none font-bold'>
                    Pourquoi vendre sur Kalloba ?
                </div>
                <div className='mt-3 text-center text-center md:text-center md:mx-40 md:text-xl'>
                    <span>
                        Avec kalloba, vous avez la possibilité de toucher des millions de clients à travers toute la Côte d'Ivoire.<br/> Nous offrons la possibilité aux entreprises d'obtenir un badge <i className="bi bi-patch-check-fill text-red-500"></i> afin d'être certifié après vérifications.<br/> Si les clients nous font confiance, c'est parce qu'ils vous font confiance, ensemble devenons plus grands.
                    </span>
                </div>
                <div className='text-center mt-2'>
                    <button className='bg-kalloba px-3 py-2 rounded-full text-white hover:bg-red-600 transition-all ease-in duration-350' onClick={()=>{navigate('/seller/register')}}>S'inscrire</button>
                </div>
            </div>


            <ShopFooter/>
        </>
    )
}
