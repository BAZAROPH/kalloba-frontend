import React, {useEffect, useState} from 'react'
import axios from 'axios'
import URLS from '../../../components/api/API';
import AddProduct from './create/AddProduct';
import toast, {Toaster} from 'react-hot-toast';

export default function Product() {
    const [categories, setCategories] = useState();
    const [createNewProduct, setCreateNewProduct] = useState(false);
    useEffect(()=>{
        axios.get(URLS.categoriesWithSubCategories)
        .then((response)=>{
            setCategories(response.data)
        })
    }, [])


    const newProductToggle = ()=>{
        setCreateNewProduct(!createNewProduct)
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

  return (
    <div className='p-1 md:grid md:grid-cols-8'>
        <Toaster position='top-right'/>
        <AddProduct display={createNewProduct} setDisplay={newProductToggle} notify={notify} />
        <div className='col-span-6'>

        </div>
        <div className='col-span-2'>
            <div className='text-right'>
                <button className='bg-green-600 p-2 text-white rounded-md font-bold hover:shadow-2xl hover:shadow-green-500 duration-300' onClick={()=>{newProductToggle()}}>Nouveau produit</button>
            </div>
            <div className='w-full bg-white mt-2 rounded-lg mb-10 shadow-2xl'>
                <div className='text-center m-2 p-2'>
                    <span className='text-lg uppercase'>Catégories</span>
                </div>
                <div className='mx-5'>
                    {
                        categories && (
                            categories.map((categorie, index)=>{
                                return(
                                    <div key={index} className='my-4 last:pb-4'>
                                        <div className='my-2'>
                                            <span className='capitalize'>{categorie.name}</span>
                                        </div>
                                        <div className='my-2'>
                                            <select name="men" className='w-full h-10 bg-white border border-gray-200 rounded px-2' id="">
                                                {
                                                    categorie.subcategories.map((subcategorie, index2)=>{
                                                        return (
                                                            <option key={index2} value="">{subcategorie.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

