import React, {useState} from 'react'
import BtnChoice from '../../UI/BtnChoice/BtnChoice'
import './ChoicePreview.css'

function ChoicePreview({active}) {
    const {activeBtn, setActiveBtn} = active
  return (
    <div className='choicePreview-wrapper'>
        <div className='choicePreview'>
             <BtnChoice active={activeBtn === 1} onClick={() => setActiveBtn(1)}>Классификация</BtnChoice>
             <BtnChoice active={activeBtn === 2} onClick={() => setActiveBtn(2)}>Характеристики</BtnChoice>
             <BtnChoice active={activeBtn === 3} onClick={() => setActiveBtn(3)}>Описание</BtnChoice>
        </div>
    </div>
  )
}

export default ChoicePreview