import React from 'react'
import DragImg from '../../modules/DragImg/DragImg';
import InputProduct from '../../UI/InputProduct/InputProduct';

import './styles/GeneralInformationWork.css'
import '../../App.css'
import BtnCategory from '../../UI/BtnCategory/BtnCategory';
import DropDownList from '../../UI/DropDownList/DropDownList';

function GeneralInformationWork({type, setType}) {
  return (
    <div className='general-information-work__wrapper'>
        <h2 className='text-title'>Общие сведения</h2>
        <div className='general-information-work'>
            <div className='general-information__hz'>
              <div className='general-information-work__category'>
                <div className='general-information-work-category__title gray-text__title'>
                  Категория продукции
                </div>
                <div className='general-information-work-category__categories'>
                  <BtnCategory onClick={() => setType("Товар")} active={type === "Товар"}>Товары</BtnCategory>
                  <BtnCategory onClick={() => setType("Работа")}active={type === "Работа"}>Работы</BtnCategory>
                  <BtnCategory onClick={() => setType("Услуга")}active={type === "Услуга"}>Услуги</BtnCategory>
                </div>
              </div>
              <div className='general-information-work__items'>
                <InputProduct title="Вид продукции" important={true}/>
                <InputProduct title="Классификации ГОСТ/ТУ" important={true}/>
                <div className='line'/>
              </div>
            </div>            
        </div>
        
    </div>
  )
}

export default GeneralInformationWork