import React, {useState} from 'react';
import './styles/MainPage.css'
import InputNameForm from '../../modules/InputNameForm/InputNameForm';
import ProductForm from '../../modules/ProductForm/ProductForm';
import Description from '../../components/Generation/Generation';
import ModalProduct from '../../UI/ModalProduct/ModalProduct';
import BtnPreview from '../../UI/BtnPreview/BtnPreview';

function MainPage() {

    const [nameProduct, setNameProduct] = useState('');
    const [category, setCategory] = useState('');
    const [modal, setModal] = useState(false)

  return (
    <div className="_container">
        <ModalProduct visible={modal} setVisible={setModal}>
          <div>
            HAHAAHAH
          </div>
        </ModalProduct>
        <InputNameForm setNameProduct={setNameProduct}/>
        <ProductForm/>
        <Description/>
        <div className='btn'>
          <BtnPreview onClick={() => setModal(true)}>Предварительный просмотр</BtnPreview>
        </div>
        <h3>{category}</h3>
    </div>
  )
}

export default MainPage