import React from 'react'
import cl from "./InputUI.module.css"

function InputUI({placeHolder, width, setNameProduct}) {

  const handleChange = (event) => {
    setNameProduct(event.target.value);
    event.target.style.height = 'auto'
    event.target.style.height = event.target.scrollHeight + 'px'
  }

  return (
    <div className={cl.textarea_container}>
        <textarea
          className={cl.input} 
          type='text'
          placeholder={placeHolder} 
          style={{width: width}} 
          onChange={handleChange}
        />  
    </div>
    
  )
}

export default InputUI