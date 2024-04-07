import React, {useEffect, useState} from 'react';
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
import Server from '../../api/Server'

function MainPage() {

    const [nameProduct, setNameProduct] = useState('');
    const [category, setCategory] = useState(['']);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [type, setType] = useState('');
    const [modal, setModal] = useState(false)
    const [manufacturer, setManufacturer] = useState(['']);
    const [activeManufacturerIndex, setActiveManufacturerIndex] = useState(0)
    const [model, setModel] = useState(['']);
    const [activeModelIndex, setActiveModelIndex] = useState(0);
    const [characteristics, setCharacteristics] = useState([
      {'id': 0, 'title': 'Длина', 'value': '30', 'unit': 'см'},
      {'id': 1, 'title': 'Ширина', 'value': '30', 'unit': 'см'},
      {'id': 2, 'title': 'Материал', 'value': 'Железо', 'unit': ''},
      {'id': 3, 'title': 'Длина', 'value': '30', 'unit': 'см'},
      {'id': 4, 'title': 'Ширина', 'value': '30', 'unit': 'см'},
      {'id': 5, 'title': 'Материал', 'value': 'Железо', 'unit': ''},
      {'id': 6, 'title': 'Длина', 'value': '30', 'unit': 'см'},
      {'id': 7, 'title': 'Ширина', 'value': '30', 'unit': 'см'},
      {'id': 8, 'title': 'Материал', 'value': 'Железо', 'unit': ''},
      {'id': 9, 'title': 'Длина', 'value': '30', 'unit': 'см'},
      {'id': 10, 'title': 'Ширина', 'value': '30', 'unit': 'см'},
      {'id': 11, 'title': 'Материал', 'value': 'Железо', 'unit': ''},
    ])
    const [classifications, setClassifications] = useState([
      {'title': 'Гост', 'value': '30', 'unit': 'см'},
      {'title': 'Ширина', 'value': '30', 'unit': 'см'},
    ])
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [activeBtn, setActiveBtn] = useState(2);
    const [descriptionValue, setDescriptionValue] = useState('');
    const [descriptionValueGenerate, setDescriptionValueGenerate] = useState('');
    const [activeBtnNavigation, setActiveBtnNavigation] = useState(1);
    const [isFormat, setIsFormat] = useState('');

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      console.log({characteristics})
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleScroll = () => {
      const generalSection = document.getElementById('general');
      const descriptionSection = document.getElementById('description');
      const characteristicsSection = document.getElementById('characteristics');

      console.log("FIELDS")
      console.log(characteristics)

      const scrollPosition = window.scrollY;

      if (
        scrollPosition >= generalSection.offsetTop &&
        scrollPosition < descriptionSection.offsetTop
      ) {
        setActiveBtnNavigation(1);
      } else if (
        scrollPosition >= descriptionSection.offsetTop && 
        scrollPosition < characteristicsSection.offsetTop
      ) {
        setActiveBtnNavigation(2);
      } else if(scrollPosition >= characteristicsSection.offsetTop){
        setActiveBtnNavigation(3);
      }
    };

    // Функция для обновления характеристик в родительском компоненте
    const updateCharacteristics = (updatedCharacteristics) => {
      setCharacteristics([...updatedCharacteristics]);
    };

    const generateDescriptionAndUpdateState = async (item) => {
      try {
        const generatedDescription = await Server.generate_description(item);
        setDescriptionValueGenerate(generatedDescription);
      } catch (error) {
        console.error('Error generating description', error);
      }
    };

  return (
    <div className="_container">
      {/* <div className='navigation__btns'>
        <BtnNavigation href="#general" active={activeBtnNavigation === 1} onClick={() => setActiveBtnNavigation(1)}>Общие сведения</BtnNavigation>
        <BtnNavigation href="#description" active={activeBtnNavigation === 2} onClick={() => setActiveBtnNavigation(2)}>Описание</BtnNavigation>
        <BtnNavigation href="#characteristics" active={activeBtnNavigation === 3} onClick={() => setActiveBtnNavigation(3)}>Характеристики</BtnNavigation>
      </div> */}
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
                  <div className='main-info__model'>Модель: {model}</div>
                  <div className='main-info__producer'>Производитель: {manufacturer}</div>
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
                {Array.isArray(characteristics) ? (
                  characteristics.map((characteristic, index) => (
                    <div key={index}>
                      <CharacteristicItem characteristic={characteristic} />
                    </div>
                  ))
                ) : (
                  <div>Список характеристик не загружен</div>
                )}
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
        <InputNameForm 
        isFormat={isFormat} 
        setIsFormat={setIsFormat}
        setNameProduct={setNameProduct} 
        nameProduct={nameProduct}
        setItem={{setModel, setManufacturer, setType, setCategory, setCharacteristics, setDescriptionValueGenerate}}
        item = {{model, manufacturer, type, category}}
        attributes = {{model, manufacturer}}
        />
        <div id='general'>
          <ProductForm 
          uploaded={{uploadedFiles, setUploadedFiles}} 
          item={{model, manufacturer, category}} 
          activeCategory={{activeCategoryIndex, setActiveCategoryIndex}}
          activeModel={{activeModelIndex, setActiveModelIndex}}
          activeManufacturer={{activeManufacturerIndex, setActiveManufacturerIndex}}
          type={type}
          setType={setType}
          />
        </div>
        <div id='description'>
          <Description 
          description={{descriptionValue, setDescriptionValue}} 
          descriptionGenerate={{descriptionValueGenerate, setDescriptionValueGenerate}}/>
        </div>
        <div id='characteristics'>
          <CharacteristicsList 
          characteristics={characteristics}
          onUpdateCharacteristics={updateCharacteristics}
          />
        </div>
        <div className='btn' onClick={() => console.log(uploadedFiles)}>
          <BtnPreview onClick={() => setModal(true)}>Предварительный просмотр</BtnPreview>
        </div>
    </div>
  )
}

export default MainPage