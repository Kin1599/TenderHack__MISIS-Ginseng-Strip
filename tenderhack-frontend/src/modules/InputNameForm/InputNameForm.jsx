import React, { useState } from 'react'
import InputUI from '../../UI/InputUI/InputUI';
import BtnGenerate from '../../UI/BtnGenerate/BtnGenerate';
import question from "../../assets/question.svg"

import './styles/InputNameForm.css'

function InputNameForm({setNameProduct, isFormat}) {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <div className='form'>
        <InputUI isFormat={isFormat} width="100%" placeHolder="Введите наименование товара..." setNameProduct={setNameProduct}/>
        {isFormat === "typo" && (
          <div className='typoFormat'>
            <p className='typoFormat__title'>Возможно вы имели ввиду:</p>
            <div className='typoFormat__text'>хороший телевизор</div>
          </div>
        )}
        <div className='format'>
            <p className='format__text'>Предпочтительный формат ввода</p>
            <img src={question} alt="question" className='format__icon' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
            {isHovered && 
              <div className='format__window'>
                Какой-то формат
              </div>
            }
        </div>
        {isFormat === 'toxic' && (
          <div className='toxicFormat'>Кажется ваше сообщение не является полным наименованием товара! Попробуйте ввести другой текст.</div>
        )}
        <div className='form__btn'>
            <BtnGenerate>Автозаполнение</BtnGenerate>
        </div>
      </div>
  )
}

export default InputNameForm