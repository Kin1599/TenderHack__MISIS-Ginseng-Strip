import React from 'react'
import InputUI from '../../UI/InputUI/InputUI';
import BtnGenerate from '../../UI/BtnGenerate/BtnGenerate';
import question from "../../assets/question.svg"

import './styles/InputNameForm.css'

function InputNameForm({setNameProduct}) {
  return (
    <div className='form'>
        <InputUI width="100%" placeHolder="Введите наименование товара" setNameProduct={setNameProduct}/>
        <div className='format'>
            <p className='format__text'>Формат ввода</p>
            <img src={question} alt="question" className='format__icon'/>
        </div>
        <div className='form__btn'>
            <BtnGenerate>Автозаполнение</BtnGenerate>
        </div>
    </div>
  )
}

export default InputNameForm