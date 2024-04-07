import React from 'react'

import cl from './InputProduct.module.css'
import '../../App.css'

function InputProduct({title, important, value}) {

  const rootClasses = ['gray-text__title']
  if (important){
    rootClasses.push('important')
  }

  return (
    <div>
        <h3 className={rootClasses.join(' ')}>{title}</h3>
        <input className={cl.inputProduct} value={value}/>
    </div>
  )
}

export default InputProduct