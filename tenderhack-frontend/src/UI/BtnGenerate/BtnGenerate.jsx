import React from 'react'
import cl from './BtnGenerate.module.css'

import Server from '../../api/Server'

function BtnGenerate({colorText, children, nameProduct, item, setFields}) {
  const {setModel, setManufacturer, setType, setCategory} = item 

  const sendDataToServer = async () => {
    const response = await Server.predictType(nameProduct);
    const category = await Server.predictCategory(nameProduct);;
    const fields = await Server.getField(category[0]);
    setFields(fields);
    // setCategory(response)
    console.log(response);
  }

  return (
    <button disabled={!nameProduct || nameProduct.length === 0} onClick={() => sendDataToServer()} className={cl.btnGenerate} style={{color: colorText}}>{children}</button>
  )
}

export default BtnGenerate