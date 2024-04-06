import React, {useState} from 'react';
import './styles/MainPage.css'
import InputNameForm from '../../modules/InputNameForm/InputNameForm';
import ProductForm from '../../modules/ProductForm/ProductForm';
import Description from '../../components/Description/Description';
import ModalProduct from '../../UI/ModalProduct/ModalProduct';
import BtnPreview from '../../UI/BtnPreview/BtnPreview';
import ImgSlider from '../../components/ImgSlider/ImgSlider';
import ChoicePreview from '../../components/ChoicePreview/ChoicePreview';
import CharacteristicItem from '../../components/CharacteristicItem/CharacteristicItem';
import CharacteristicsList from '../../modules/CharacteristicsList/CharacteristicsList';
import DescriptionItem from '../../components/DescriptionItem/DescriptionItem';
import BtnNavigation from '../../UI/BtnNavigation/BtnNavigation';

function MainPage() {

    const [nameProduct, setNameProduct] = useState('');
    const [category, setCategory] = useState('');
    const [modal, setModal] = useState(false)
    const [characteristics, setCharacteristics] = useState([
      {'title': 'Длина', 'value': '30 см'},
      {'title': 'Ширина', 'value': '30 см'},
      {'title': 'Материал', 'value': 'железо'},
      {'title': 'Длина', 'value': '30 см'},
      {'title': 'Ширина', 'value': '30 см'},
      {'title': 'Материал', 'value': 'железо'},
      {'title': 'Длина', 'value': '30 см'},
      {'title': 'Ширина', 'value': '30 см'},
      {'title': 'Материал', 'value': 'железо'},
      {'title': 'Длина', 'value': '30 см'},
      {'title': 'Ширина', 'value': '30 см'},
      {'title': 'Материал', 'value': 'железо'},
    ])
    const [classifications, setClassifications] = useState([
      {'title': 'ГОСТ', 'value': '30 см'},
      {'title': 'Ширина', 'value': '30 см'},
    ])
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [activeBtn, setActiveBtn] = useState(2);
    const [descriptionValue, setDescriptionValue] = useState('');
    const [activeBtnNavigation, setActiveBtnNavigation] = useState(1);


  return (
    <div className="_container">
      <div className='navigation__btns'>
        <BtnNavigation href="#general" active={activeBtnNavigation === 1} onClick={() => setActiveBtnNavigation(1)}>Общие сведения</BtnNavigation>
        <BtnNavigation href="#description" active={activeBtnNavigation === 2} onClick={() => setActiveBtnNavigation(2)}>Описание</BtnNavigation>
        <BtnNavigation href="#characteristics" active={activeBtnNavigation === 3} onClick={() => setActiveBtnNavigation(3)}>Характеристики</BtnNavigation>
      </div>
        <ModalProduct visible={modal} setVisible={setModal}>
          <div className='main-info__wrapper'>
            <div className='main-info'>
              <ImgSlider uploaded={{uploadedFiles, setUploadedFiles}}/>
              <div className='main-info__text'>
                <div>
                  {
                    nameProduct 
                    ? <div className='main-info__title'>{nameProduct}</div>
                    : <div className='main-info__title'>Название товара</div>
                  }
                  <div className='main-info__model'>Модель: </div>
                  <div className='main-info__producer'>Производитель: </div>
                </div>
              </div>
            </div>
            <div className='choices'>
              <ChoicePreview active={{activeBtn, setActiveBtn}}/>
              {activeBtn === 1 && (
                <div className='choices__characteristics'>
                {classifications.map((classification, index) => (
                  <div>
                    <CharacteristicItem key={index} characteristic={classification} />
                  </div>
                ))}
              </div>
              )}
              {activeBtn === 2 && (
                <div className='choices__characteristics'>
                  {characteristics.map((characteristic, index) => (
                    <div>
                      <CharacteristicItem key={index} characteristic={characteristic} />
                    </div>
                  ))}
                </div>
              )}
              {activeBtn === 3 && (
                <div>
                  <DescriptionItem descriptionValue={descriptionValue}/>
                </div>
              )}
            </div>
          </div>
        </ModalProduct>
        <InputNameForm setNameProduct={setNameProduct}/>
        <div id='general'>
          <ProductForm uploaded={{uploadedFiles, setUploadedFiles}}/>
        </div>
        <div id='description'>
          <Description description={{descriptionValue, setDescriptionValue}}/>
        </div>
        <div id='characteristics'>
          <CharacteristicsList characteristics={characteristics}/>
        </div>
        <div className='btn' onClick={() => console.log(uploadedFiles)}>
          <BtnPreview onClick={() => setModal(true)}>Предварительный просмотр</BtnPreview>
        </div>
        <h3>{category}</h3>
    </div>
  )
}

export default MainPage