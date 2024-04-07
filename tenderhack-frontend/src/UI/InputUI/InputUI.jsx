import React, { useState, useEffect } from 'react';
import cl from "./InputUI.module.css";
import Server from "../../api/Server";

function InputUI({ placeHolder, width, setNameProduct, isFormat, setIsFormat, addText }) {

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      const handleBlur = (event) => {
        // Проверяем, что в поле есть текст
        if (event.target.value) {
          console.log("Textarea contains text and is not in focus");
          addText();
          Server.preprocess(event.target.value) // Запрос на сервер
            .then((response) => {
              console.log(response['text']);
              if (response['text'] === "Too short") {
                setIsFormat('short');
              } else if (response['text'] === "Toxic text") {
                setIsFormat('toxic');
              }
            })
            .catch((error) => {
              // Handle errors here
              console.error("Error:", error);
            });
        }
      };

      document.addEventListener('click', handleBlur);

      return () => {
        document.removeEventListener('click', handleBlur);
      };
    }
  }, [isFocused, setIsFormat, addText]);

  useEffect(() => {
    const rootClasses = [cl.input];

    if (isFormat === "toxic") {
      rootClasses.push(cl.toxic);
    } else if (isFormat === "typo") {
      rootClasses.push(cl.typo);
    } else if (isFormat === "short") {
      rootClasses.push(cl.warning);
    }

    // Update root classes based on isFormat
    // This effect will run whenever isFormat changes
    // and update the styling accordingly.
    // You can add more logic here if needed.
    // Example: changing background color, border color, etc.

    document.querySelector('textarea').className = rootClasses.join(' ');

  }, [isFormat]);

  const handleChange = (event) => {
    setNameProduct(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={cl.textarea_container}>
      <textarea
        className={cl.input}
        type='text'
        placeholder={placeHolder}
        style={{ width: width }}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </div>
  );
}

export default InputUI;
