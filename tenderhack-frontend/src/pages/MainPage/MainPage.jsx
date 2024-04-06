import React, {useState} from 'react';
import './styles/MainPage.css'
import InputNameForm from '../../modules/InputNameForm/InputNameForm';
import ProductForm from '../../modules/ProductForm/ProductForm';
import Description from '../../components/Generation/Generation';

function MainPage() {

    const [nameProduct, setNameProduct] = useState('');
    const [category, setCategory] = useState('');

  return (
    <div className="_container">
        <InputNameForm setNameProduct={setNameProduct}/>
        <ProductForm/>
        <Description/>
        <h3>{category}</h3>
    </div>
  )
}

export default MainPage