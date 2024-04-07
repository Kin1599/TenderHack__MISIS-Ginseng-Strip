import React, { useState } from 'react'

import './Description.css'
import '../../App.css'
import BtnEdit from '../../UI/BtnEdit/BtnEdit'

function Generation({description, descriptionGenerate}) {
  const {descriptionValue, setDescriptionValue} = description
  const {descriptionValueGenerate, setDescriptionValueGenerate} = descriptionGenerate
  const [visible, setVisible] = useState(false)

  return (
    <div>
        <div className='description-top'>
          <h2 className='text-title description__title'>Описание</h2>
          {
            descriptionValueGenerate.length > 0 && (
              <BtnEdit onClick={() => setVisible(!visible)}>Сгенерировать описание</BtnEdit>
            )} 
        </div>
        {visible
        ?
        <div>
          <textarea
            className='description'
            value={descriptionValueGenerate}
            onChange={e => setDescriptionValueGenerate(e.target.value)}
          />
          <div className='line'/>
        </div>
        : 
        <div>
          <textarea
            className='description'
            value={descriptionValue}
            onChange={e => setDescriptionValue(e.target.value)}
          />
          <div className='line'/>
        </div>
        }
        <div className='line'/>
    </div>
  )
}

export default Generation