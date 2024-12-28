import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputLabel from '../InputLabel';

const ProductList = ({ setProductList }) => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getProduct = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_NODE_BASE_URL}/api/product/listing`);
            if (res.status === 200) {
                setProductsList(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter products based on search term
    const filteredProducts = productsList.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white">
            {showScrollButton && (
                <div className="z-10 flex justify-end fixed bottom-12 right-4">
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="w-fit bg-gray-800 -rotate-90 text-white rounded-full py-2 border-l border-gray-200 hover:bg-blue-400 hover:text-white px-3"
                    >
                        <div className="flex flex-row align-middle">
                            <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </button>
                </div>
            )}
            <div className="py-10 sm:py-16 lg:mx-auto lg:max-w-7xl lg:px-8 px-4">
                <div className="flex items-center justify-between sm:px-6 lg:px-0">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setProductList(false)}
                            type="button"
                            className="w-fit bg-gray-800 text-white rounded-l-md py-2 border-l border-gray-200 hover:bg-blue-400 hover:text-white px-3"
                        >
                            <div className="flex flex-row align-middle">
                                <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                                </svg>
                                <span className="mr-2">Back To Form</span>
                            </div>
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Listed Products</h2>
                </div>
                <div className='mt-8 max-w-[500px]'>
                    <InputLabel
                        name='search'
                        placeholder='Product Search'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="relative mt-8">
                    <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                        <ul
                            role="list"
                            className="mx-4 sm:mx-6 lg:mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                        >
                            {filteredProducts.length > 0 ? (
                                filteredProducts.slice().reverse().map((product) => (
                                    <li key={product.id} className="flex flex-col text-center">
                                        <div className="group relative">
                                            <img
                                                alt="product"
                                                src={product.image}
                                                className="aspect-square w-full rounded-md bg-gray-200 object-cover"
                                            />
                                            <div className="mt-2">
                                                <h3 className="mt-1 text-left font-semibold text-gray-900 line-clamp-2">
                                                    {product.title}
                                                </h3>
                                                <div className="flex justify-between">
                                                    <p className="mt-1 text-gray-900 font-semibold">₹{product.price}</p>
                                                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2 py-1 text-base font-medium text-blue-700">
                                                        <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-blue-500">
                                                            <circle r={3} cx={3} cy={3} />
                                                        </svg>
                                                        {product.productCode}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-center text-gray-500">No products found</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
