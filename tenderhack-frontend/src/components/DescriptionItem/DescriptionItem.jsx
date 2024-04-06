import React from 'react'

import './DescriptionItem.css'

function DescriptionItem({descriptionValue}) {
  return (
    <div className='descriptionItem'>
        <textarea 
            value={descriptionValue}
            className='descriptionItem__textArea'
            readOnly
        />
    </div>
  )
}

export default DescriptionItem