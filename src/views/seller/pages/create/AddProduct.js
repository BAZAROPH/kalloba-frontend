import { motion } from "framer-motion";
import React, {useState, useRef} from "react";
import validator from "validator";
import axios from 'axios'
import URLS from '../../../../components/api/API';
import { useSelector } from "react-redux";


export default function AddProduct(props) {
    const [categories, setCategories] = useState();
    const [subCategoriesOptions, setSubCategoriesOptions] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [stockValue, setStockValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [subCategoryValue, setSubCategoryValue] = useState('');
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [img3, setImg3] = useState(null);
    const [img4, setImg4] = useState(null);
    const [nameIsValid, setNameIsValid] = useState(true)
    const [priceIsValid, setPriceIsValid] = useState(true)
    const [stockIsValid, setStockIsValid] = useState(true)
    const [imageIsValid, setImageIsValid] = useState(true)    
    const [userData, setUserData] = useState()
    const [load, setLoad] = useState(false);
    const formRef = useRef(null)
    const {data} = useSelector(state => ({
        ...state.dataReducer
    }))
    useState(()=>{
        setUserData(data)
        axios.get(URLS.categoriesWithSubCategories)
        .then((response)=>{
            setCategories(response.data)
            setCategoryValue(0)
            setSubCategoryValue(0)
            let subList = response.data[0].subcategories.map((subCategory, index)=>{
                return (
                    <option key={index} value={index}>{subCategory.name}</option>
                )
            })
            setSubCategoriesOptions(subList)
        })
        
    }, [])

    // function that sorts the sub-catgeories according to the subcategories
    const sortSubCatgeories = (parent)=>{
        let subList = parent.subcategories.map((subCategory, index)=>{
            return (
                <option key={index} value={index}>{subCategory.name}</option>
            )
        })
        setSubCategoriesOptions(subList)
    }


    const saveNameValue = (e)=>{
        setNameValue(e.target.value);
        setNameIsValid(true)
    }

    const savePriceValue = (e)=>{
        setPriceValue(e.target.value)
        setPriceIsValid(true)
    }

    const saveStockValue = (e)=>{
        setStockValue(e.target.value)
    }

    const saveCategoryValue = (e)=>{
        let parent = categories[e.target.value]
        sortSubCatgeories(parent)
        setCategoryValue(e.target.value)
    }

    const saveSubCategoryValue = (e)=>{
        setSubCategoryValue(e.target.value)
        console.log(subCategoryValue);
        console.log(e.target.value);
    }

    const handleImgChange = (e, variable)=>{
        switch (variable) {
            case 'img1':
                setImg1({
                    file: e.target.files[0],
                    previewLink: URL.createObjectURL(e.target.files[0])
                })
                setImageIsValid(true)
                break;
            case 'img2':
                setImg2({
                    file: e.target.files[0],
                    previewLink: URL.createObjectURL(e.target.files[0])
                })
                setImageIsValid(true)
                break;
            case 'img3':
                setImg3({
                    file: e.target.files[0],
                    previewLink: URL.createObjectURL(e.target.files[0])
                })
                setImageIsValid(true)
                break;
            case 'img4':
                setImg4({
                    file: e.target.files[0],
                    previewLink: URL.createObjectURL(e.target.files[0])
                })
                setImageIsValid(true)
                break;
        
            default:
                break;
        }
    }

    const dropImage = (variable)=>{
        switch (variable) {
            case 'img1':
                setImg1(false)
                break;
            case 'img2':
                setImg2(false)
                break;
            case 'img3':
                setImg3(false)
                break;
            case 'img4':
                setImg4(false)
                break;
        
            default:
                break;
        }
    }

    const validateName = ()=>{
        if(!nameValue){
            setNameIsValid(false)
        }else{
            setNameIsValid(true)
        }
    }
    const validatePrice = ()=>{
        if(!validator.isNumeric(priceValue)){
            setPriceIsValid(false)
        }else{
            setPriceIsValid(true)
        }
    }

    const validateStock = ()=>{
        if(!validator.isNumeric(stockValue)){
            setStockIsValid(false)
        }else{
            setStockIsValid(true)
        }
    }

    const validateImages = ()=>{
        if(!img1 && !img2 && !img3 && !img4){
            setImageIsValid(false)
        }else{
            setImageIsValid(true)
        }
    }

    const saveProduct = (e)=>{
        e.preventDefault()
        validateName()
        validatePrice()
        validateStock()
        validateImages()
        if(nameIsValid && priceIsValid && stockIsValid && imageIsValid){
            setLoad(true)
            const data = new FormData()
            data.append('seller', userData.id)
            data.append('name', nameValue)
            data.append('price', parseInt(priceValue))
            data.append('stock', parseInt(stockValue))
            data.append('category', categories[parseInt(categoryValue)].id)

            if((subCategoryValue || subCategoryValue===0) && subCategoriesOptions.length !== 0){
                data.append('subcategory', categories[parseInt(categoryValue)].subcategories[parseInt(subCategoryValue)].id)
            }
            img1 && data.append('image_one', img1.file)
            img2 && data.append('image_two', img2.file)
            img3 && data.append('image_three', img3.file)
            img4 && data.append('image_four', img4.file)
            
            axios.post(URLS.createProduct, data, { headers: { "content-type": "multipart/form-data" } })
            .then((response)=>{
                setNameValue('');
                setPriceValue('');
                setStockValue('');
                setImg1(null);
                setImg2(null);
                setImg3(null);
                setImg4(null);
                setNameIsValid(true)
                setPriceIsValid(true)
                setStockIsValid(true)
                setImageIsValid(true)
                props.notify('success', 'Enregistrement effectué', 'Votre produit a été enregistré avec succès!')
                setLoad(false)
            })
            .catch((error)=>{
                // console.log(error);
                props.notify('error', 'Erreur', 'Une erreur est survenue, veuillez réessayer!')
                setLoad(false)
            })

        }
    }

    return (
        <motion.div animate={props.display ? {x:0} : "hidden"} exit={{x: "100%"}} initial={{x:"100%"}} transition={{duration:0.5}}  className='overflow-auto fixed z-10 w-full md:w-1/3 right-0 bg-white h-screen rounded-tl bg-kalloba text-white'>
            <div className='text-center border-b border-white pb-3 bg-kalloba sticky top-0 p-2'>
                <span className='text-xl'>Créer un nouveau produit</span>
                <i className="bi bi-x-square-fill absolute right-3 md:right-6 text-2xl cursor-pointer hover:text-red-600 duration-300 hover:scale-125" onClick={()=>{props.setDisplay()}}></i>
            </div>
            <div className='mt-2 h-screen z-10'>
                <form ref={formRef} action="" encType="multipart/form-data" onSubmit={(e)=>{saveProduct(e)}}>
                    <div className="md:px-5 px-3 text-left">
                        <div className="mt-7 grid grid-cols-5">
                            <label className="col-span-2 required" htmlFor="productName">Nom </label>
                            <div className="col-span-3">
                                <input type="text" id="productName" value={nameValue} className="focus:outline-none px-2 focus:bg-gray-300 duration-300 rounded py-1 text-kalloba" onInput={(e)=>{saveNameValue(e)}} />
                                {!nameIsValid && <small className="text-red-300">Vous devez renseigner le nom du produit</small>}
                            </div>
                        </div>

                        <div className=" mt-7 grid grid-cols-5">
                            <label className="col-span-2 required" htmlFor="price">Prix </label>
                            <div className="col-span-3">
                                <input type="text" id="price" value={priceValue} className=" col-span-3 w-full focus:outline-none px-2 focus:bg-gray-300 duration-300 rounded py-1 text-kalloba" onInput={(e)=>{savePriceValue(e)}}/>
                                {!priceIsValid && <small className="text-red-300">Vous devez renseigner un prix valide</small>}
                            </div>
                        </div>

                        <div className=" mt-7 grid grid-cols-5">
                            <label className="col-span-2 required" htmlFor="stock">Stock</label>
                            <div className="col-span-3">
                                <input type="number" id="stock" value={stockValue} className="col-span-3 w-full focus:outline-none px-2 focus:bg-gray-300 duration-300 rounded py-1 text-kalloba" onInput={(e)=>{saveStockValue(e)}} />
                                {!stockIsValid && <small className="text-red-300">Vous devez renseigner une quantité de stock valide</small>}
                            </div>
                        </div>

                        <div className=" mt-7 grid grid-cols-5">
                            <label className="col-span-2 required" htmlFor="category">Catégorie</label>
                            <select name="" id="" className="py-2 rounded pl-1 bg-white text-kalloba col-span-3 w-full " onChange={(e)=>{saveCategoryValue(e)}}>
                                {
                                    categories &&
                                    categories.map((category, index)=>{
                                        return(
                                            <option key={index} value={index}>{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className=" mt-7 grid grid-cols-5">
                            <label className="col-span-2" htmlFor="subCategory">Sous catégorie</label>
                            <select name="" id="" className={`py-2 rounded pl-1 ${!subCategoriesOptions || subCategoriesOptions.length !== 0 ? ' bg-white' : 'bg-gray-500' } text-kalloba col-span-3 w-full `} disabled={!subCategoriesOptions || subCategoriesOptions.length === 0 } onChange={(e)=>{saveSubCategoryValue(e)}}>
                                {subCategoriesOptions}
                            </select>
                        </div>
                        
                        {
                            !imageIsValid && (
                            <div className="flex-none text-center mt-8 mb-2">
                                <span className="text-sm text-red-300">Vous devez renseigner au moins une image pour le produit</span>
                            </div>
                            )
                        }
                        <div className={`flex items-center justify-between gap-1 text-center ${imageIsValid ? 'my-10' :'mb-5' } `}>
                            {
                                !img1 ? (
                                    <label className="w-24 h-22 flex flex-col items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg tracking-wide border border-white hover:border-kalloba cursor-pointer hover:bg-blue hover:text-kalloba duration-300">
                                        <i className="bi bi-cloud-arrow-up-fill text-3xl"></i>
                                        <span className=" text-md">Image 01</span>
                                        <input type='file' className="hidden" onChange={(e)=>{handleImgChange(e, 'img1')}}/>
                                    </label>
                                ) : (
                                    <div className="animate__animated animate__fadeIn">
                                        <img src={img1.previewLink} alt="" className="h-28 border border-white w-24 md:w-28 rounded-md" />
                                        <i className="bi bi-trash rounded-full px-[0.1em] font-bold mt-1 cursor-pointer hover:scale-125" onClick={()=>{dropImage('img1')}}></i>
                                    </div>
                                )
                            }

                            {
                                !img2 ? (
                                    <label className="w-24 h-22 flex flex-col items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg tracking-wide border border-white hover:border-kalloba cursor-pointer hover:bg-blue hover:text-kalloba duration-300">
                                        <i className="bi bi-cloud-arrow-up-fill text-3xl"></i>
                                        <span className=" text-md">Image 02</span>
                                        <input type='file' className="hidden" onChange={(e)=>{handleImgChange(e, 'img2')}}/>
                                    </label>
                                ) : (
                                    <div className="animate__animated animate__fadeIn">
                                        <img src={img2.previewLink} alt="" className="h-28 border border-white w-24 md:w-28 rounded-md" />
                                        <i className="bi bi-trash rounded-full px-[0.1em] font-bold mt-1 cursor-pointer" onClick={()=>{dropImage('img2')}}></i>
                                    </div>
                                )
                            }
                            {
                                !img3 ? (
                                    <label className="w-24 h-22 flex flex-col items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg tracking-wide border border-white hover:border-kalloba cursor-pointer hover:bg-blue hover:text-kalloba duration-300">
                                        <i className="bi bi-cloud-arrow-up-fill text-3xl"></i>
                                        <span className=" text-md">Image 03</span>
                                        <input type='file' className="hidden" onChange={(e)=>{handleImgChange(e, 'img3')}}/>
                                    </label>
                                ) : (
                                    <div className="animate__animated animate__fadeIn">
                                        <img src={img3.previewLink} alt="" className="h-28 border border-white w-24 md:w-28 rounded-md" />
                                        <i className="bi bi-trash rounded-full px-[0.1em] font-bold mt-1 cursor-pointer" onClick={()=>{dropImage('img3')}}></i>
                                    </div>
                                )
                            }

                            {
                                !img4 ? (
                                <label className="w-24 h-22 flex flex-col items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg tracking-wide border border-white hover:border-kalloba cursor-pointer hover:bg-blue hover:text-kalloba duration-300">
                                    <i className="bi bi-cloud-arrow-up-fill text-3xl"></i>
                                    <span className=" text-md">Image 04</span>
                                    <input type='file' className="hidden" onChange={(e)=>{handleImgChange(e, 'img4')}}/>
                                </label>
                            ) : (
                                <div className="animate__animated animate__fadeIn">
                                    <img src={img4.previewLink} alt="" className="h-28 border border-white w-24 md:w-28 rounded-md" />
                                    <i className="bi bi-trash rounded-full px-[0.1em] font-bold mt-1 cursor-pointer" onClick={()=>{dropImage('img4')}}></i>
                                </div>
                                )
                            }
                        </div>

                        <div className="my-2 bottom-0 text-right">
                            <button className="rounded px-3 py-1 bg-red-600 hover:scale-105 duration-300 hover:shadow-lg hover:shadow-red-300">Annuler</button>
                            <input type="submit" disabled={load} className="rounded px-3 py-1 bg-green-600 ml-3 hover:scale-105 duration-300 hover:shadow-lg hover:shadow-green-300 cursor-pointer"  value={load ? 'Enregistrement...' : 'Enregistrer'}/>
                        </div>
                    </div>
                </form>
            </div>

        </motion.div>
    )
    
}
