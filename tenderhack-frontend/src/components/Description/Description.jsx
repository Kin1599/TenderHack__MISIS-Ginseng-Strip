import React, { useState } from 'react'

import './Description.css'
import '../../App.css'

function Generation({description}) {
  const {descriptionValue, setDescriptionValue} = description

  return (
    <div>
        <h2 className='text-title'>Описание</h2>
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