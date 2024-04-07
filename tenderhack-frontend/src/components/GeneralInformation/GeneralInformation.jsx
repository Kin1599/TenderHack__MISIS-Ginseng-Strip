import React from 'react';
import DragImg from '../../modules/DragImg/DragImg';
import InputProduct from '../../UI/InputProduct/InputProduct';
import BtnCategory from '../../UI/BtnCategory/BtnCategory';
import DropDownList from '../../UI/DropDownList/DropDownList';

import './styles/GeneralInformation.css';
import '../../App.css';

function GeneralInformation({ uploaded, item, activeCategory, activeModel, activeManufacturer, setType, type }) {
  const { model, manufacturer, category } = item;
  const { activeCategoryIndex, setActiveCategoryIndex } = activeCategory;
  const { activeModelIndex, setActiveModelIndex } = activeModel;
  const { activeManufacturerIndex, setActiveManufacturerIndex } = activeManufacturer;

  return (
    <div className='general-information__wrapper'>
      <h2 className='text-title'>Общие сведения</h2>
      <div className='general-information'>
        <div>
          <div className='general-information__category'>
            <div className='general-information-category__title gray-text__title'>Категория продукции</div>
            <div className='general-information-category__categories'>
              <BtnCategory onClick={() => setType("Товар")} active={type === "Товар"}>Товары</BtnCategory>
              <BtnCategory onClick={() => setType("Работа")} active={type === "Работа"}>Работы</BtnCategory>
              <BtnCategory onClick={() => setType("Услуга")} active={type === "Услуга"}>Услуги</BtnCategory>
            </div>
          </div>
          <div className='general-information__items'>
            <div>
              {category.length > 1 ? (
                <DropDownList activeCategory={{ activeCategoryIndex, setActiveCategoryIndex }} category={category} title='Вид продукции' important={true} />
              ) : (
                <InputProduct title="Вид продукции" important={true} value={category[activeCategoryIndex]} />
              )}
            </div>
            <div>
              {model.length > 1 ? (
                <DropDownList activeCategoryIndex={activeModelIndex} setActiveCategoryIndex={setActiveModelIndex} category={model} title='Модель' important={true} />
              ) : (
                <InputProduct title="Модель" important={true} value={model} />
              )}
            </div>
            <div>
              {manufacturer.length > 1 ? (
                <DropDownList activeCategoryIndex={activeManufacturerIndex} setActiveCategoryIndex={setActiveManufacturerIndex} category={manufacturer} title='Производитель' important={true} />
              ) : (
                <InputProduct title="Производитель" important={true} value={manufacturer} />
              )}
            </div>
            <div className='line' />
          </div>
        </div>
        <DragImg uploaded={uploaded} />
      </div>
    </div>
  );
}

export default GeneralInformation;
