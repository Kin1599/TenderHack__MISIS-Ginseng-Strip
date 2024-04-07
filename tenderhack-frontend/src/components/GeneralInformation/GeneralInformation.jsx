import React from 'react'
import DragImg from '../../modules/DragImg/DragImg';
import InputProduct from '../../UI/InputProduct/InputProduct';

import './styles/GeneralInformation.css'
import '../../App.css'
import BtnCategory from '../../UI/BtnCategory/BtnCategory';

function GeneralInformation({uploaded, item}) {
  const {model, manufacturer, category} = item
  return (
    <div className='general-information__wrapper'>
        <h2 className='text-title'>Общие сведения</h2>
        <div className='general-information'>
            <div>
              <div className='general-information__category'>
                <div className='general-information-category__title gray-text__title'>
                  Категория продукции
                </div>
                <div className='general-information-category__categories'>
                  <BtnCategory active={true}>Товары</BtnCategory>
                  <BtnCategory>Работы</BtnCategory>
                  <BtnCategory>Услуги</BtnCategory>
                </div>
              </div>
              <div className='general-information__items'>
                  <InputProduct title="Вид продукции" important={true} value={category}/>
                  <InputProduct title="Наименование" important={true}/>
                  <InputProduct title="Модель" important={true} value={model}/>
                  <InputProduct title="Производитель" important={true} value={manufacturer}/>
                  <InputProduct title="Страна происхождения" important={true}/>
                  <div className='line'/>
              </div>
            </div>            
            <DragImg uploaded={uploaded}/>
        </div>
        
    </div>
  )
}

export default GeneralInformation