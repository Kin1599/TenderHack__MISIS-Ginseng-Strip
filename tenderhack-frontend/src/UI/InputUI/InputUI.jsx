import React, {useState} from 'react'
import cl from "./InputUI.module.css"
import Server from "../../api/Server"

function InputUI({placeHolder, width, setNameProduct, isFormat, setIsFormat}) {

  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    setNameProduct(event.target.value);
    event.target.style.height = 'auto'
    event.target.style.height = event.target.scrollHeight + 'px'
  }

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = (event) => {
    setIsFocused(false);
    // Проверяем, что в поле есть текст
    if (event.target.value.trim()) {
      console.log("Textarea contains text and is not in focus");
      const response = Server.preprocess(event.target.value); // Запрос на сервер
      console.log("AAA")
      console.log(response)
      console.log(response['value'])
      console.log(response.value)
      if(response === "Too short"){
        setIsFormat('short')
        console.log("SHOOOOOOOOOOOOOOOOORT")
      } else if (response === "Toxic text"){
        setIsFormat('toxic')
      }
    }
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
          onBlur={handleBlur}
          onFocus={handleFocus}
        />  
    </div>
    
  )
}

export default InputUI