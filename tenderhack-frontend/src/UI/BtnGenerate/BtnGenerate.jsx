import React from 'react'
import cl from './BtnGenerate.module.css'

import Server from '../../api/Server'

function BtnGenerate({colorText, children, nameProduct, setItem}) {
  const {setModel, setManufacturer, setType, setCategory, setCharacteristics, setDescriptionValueGenerate} = setItem 

  const sendDataToServer = async () => {
    const response = await Server.predictType(nameProduct);
    setType(response['type'])
    setModel(response['model'])
    setManufacturer(response['manufacturer'])
    const category = await Server.predictCategory(nameProduct);
    setCategory(category)
    const field = await Server.getField(nameProduct);
    console.log("ААААА")
    console.log(field)
    setCharacteristics(field);
    console.log(response);
    const description = await Server.generate_description(nameProduct)
    setDescriptionValueGenerate(description['text'])
  }

  return (
    <button disabled={!nameProduct || nameProduct.length === 0} onClick={() => sendDataToServer()} className={cl.btnGenerate} style={{color: colorText}}>{children}</button>
  )
}

export default BtnGenerate