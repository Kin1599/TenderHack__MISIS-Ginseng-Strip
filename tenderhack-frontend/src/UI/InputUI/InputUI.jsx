import React from 'react'
import cl from "./InputUI.module.css"

function InputUI({placeHolder, width, setNameProduct, isFormat}) {

  const handleChange = (event) => {
    setNameProduct(event.target.value);
    event.target.style.height = 'auto'
    event.target.style.height = event.target.scrollHeight + 'px'
  }

  const rootClasses = [cl.input]

  if(isFormat === "toxic"){
    rootClasses.push(cl.toxic);
  } else if(isFormat === "typo"){
    rootClasses.push(cl.typo);
  }

  return (
    <div className={cl.textarea_container}>
        <textarea
          className={rootClasses.join(' ')} 
          type='text'
          placeholder={placeHolder} 
          style={{width: width}} 
          onChange={handleChange}
        />  
    </div>
    
  )
}

export default InputUI