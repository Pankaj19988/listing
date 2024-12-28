import React, { useState } from 'react';
import ButtonOutline from './common/ButtonOutline';
import InputLabel from '../InputLabel';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductForm = ({ setProductList }) => {
    const [productDetails, setProductDetails] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_NODE_BASE_URL}/api/product/listing`, productDetails);
            if (res.status === 200) {
                setProductDetails({ image: "", title: "", price: "" });
                toast.success(res.data);
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex justify-center items-center w-full mt-16 sm:mt-32'>
            <div className='flex flex-col gap-4 w-full max-w-md p-4 sm:p-6 lg:max-w-lg'>
                <div className='flex justify-between items-center'>
                    <div className='font-semibold text-xl sm:text-2xl lg:text-3xl underline underline-offset-4'>Drop Your Product</div>
                    <div className='flex justify-end'>
                        <button 
                            onClick={() => setProductList(true)} 
                            type="button" 
                            className="w-fit bg-gray-800 text-sm sm:text-base lg:text-lg text-white rounded-md py-2 border-l border-gray-200 hover:bg-blue-400 hover:text-white px-3"
                        >
                            <div className="flex flex-row align-middle">
                                <span className="mr-2">Go to Product</span>
                                <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                <InputLabel
                    name='image'
                    placeholder='Image Url'
                    value={productDetails.image}
                    onChange={handleChange}
                />
                <InputLabel
                    name='title'
                    placeholder='Title'
                    value={productDetails.title}
                    onChange={handleChange}
                />
                <InputLabel
                    type='number'
                    name='price'
                    placeholder='Price'
                    value={productDetails.price}
                    onChange={handleChange}
                />

                <ButtonOutline 
                    onClick={handleSubmit} 
                    className="text-sm sm:text-base lg:text-lg px-4 py-2"
                >
                    Submit
                </ButtonOutline>
            </div>
        </div>
    );
};

export default ProductForm;
