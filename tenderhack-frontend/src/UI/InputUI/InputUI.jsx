import React from 'react'
import cl from "./InputUI.module.css"

function InputUI({placeHolder, width, setNameProduct}) {
  return (
    <textarea
      className={cl.input} 
      type='text'
      placeholder={placeHolder} 
      style={{width: width}} 
      onChange={e => setNameProduct(e.target.value)}
    />
  )
}

export default InputUI