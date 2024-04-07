import React, { useState } from 'react'

import './Description.css'
import '../../App.css'
import BtnEdit from '../../UI/BtnEdit/BtnEdit'

function Generation({description}) {
  const {descriptionValue, setDescriptionValue} = description

  return (
    <div>
        <div className='description-top'>
          <h2 className='text-title description__title'>Описание</h2>
          <BtnEdit>Сгенерировать описание</BtnEdit>
        </div>
        <textarea
          className='description'
          value={descriptionValue}
          onChange={e => setDescriptionValue(e.target.value)}
        />
        <div className='line'/>
    </div>
  )
}

export default Generation