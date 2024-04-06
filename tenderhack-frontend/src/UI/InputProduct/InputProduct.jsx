import React from 'react'

import cl from './InputProduct.module.css'
import '../../App.css'

function InputProduct({title}) {
  return (
    <div>
        <h3 className="gray-text__title">{title}</h3>
        <input className={cl.inputProduct}/>
    </div>
  )
}

export default InputProduct