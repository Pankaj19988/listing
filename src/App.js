import { useState } from 'react';
import './App.css';
import ButtonOutline from './component/common/ButtonOutline';
import ProductForm from './component/ProductForm';
import ProductList from './component/ProductList';
import InputLabel from './InputLabel';
import { ToastContainer } from 'react-toastify';

function App() {
  const [productList, setProductList] = useState(false)

  return (
    <>
    <ToastContainer/>
      {productList ?
        <ProductList setProductList={setProductList} /> :
        <ProductForm setProductList={setProductList} />
      }
    </>
  );
}

export default App;
