import React, { useState } from 'react'
import InputUI from '../../UI/InputUI/InputUI';
import BtnGenerate from '../../UI/BtnGenerate/BtnGenerate';
import question from "../../assets/question.svg"

import './styles/InputNameForm.css'

import Yandex from '../../api/Yandex'

function InputNameForm({setNameProduct, isFormat, setIsFormat, nameProduct, setItem, attributes}) {

  const [isHovered, setIsHovered] = useState(false);
  const textMessage = ""

  function addText(){
    if(attributes['manufacturer'].length < 1 && attributes['model'].length < 1){
      textMessage += "Не указаны модель и производитель"
    }else if(attributes['manufacturer'].length < 1){
      textMessage += "Возможно, вы забыли указать производителя"
    } else if(attributes['model'].length < 1){
      textMessage += "Возможно, вы забыли указать производителя"
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className='form'>
        <InputUI 
        isFormat={isFormat} 
        setIsFormat={setIsFormat}
        width="100%" 
        placeHolder="Введите наименование товара..." 
        setNameProduct={setNameProduct}
        addText={addText}
        />
        {isFormat === "typo" && (
          <div className='typoFormat'>
            <p className='typoFormat__title'>Возможно вы имели ввиду:</p>
            <div className='typoFormat__text'>хороший телевизор</div>
          </div>
        )}
        <div className='format' >
            <p className='format__text'>Предпочтительный формат ввода</p>
            <img src={question} alt="question" className='format__icon' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
            {isHovered && 
              <div className='format__window'>
                Какой-то формат
              </div>
            }
        </div>
        {
          textMessage.length > 0 && (
          <div className='warningFormat'>{textMessage}</div>
        )}
        {isFormat === 'toxic' && (
          <div className='toxicFormat'>Возможно, ваше сообщение не является наименованием товара! Попробуйте ввести другой текст или нажмите “Автозаполнение”, если хотите продолжить заполнение карточки товара.</div>
        )}
        {isFormat === 'short' && (
          <div className='warningFormat'>Возможно, ваше наименование товара недостаточно полное! Попробуйте дополнить или нажмите “Автозаполнение”, если 
          хотите всё равно продолжить заполнение карточки товара.</div>
        )}
        <div className='form__btn'>
            <BtnGenerate nameProduct={nameProduct} setItem={setItem}>Автозаполнение</BtnGenerate>
        </div>
      </div>
  )
}

export default InputNameForm