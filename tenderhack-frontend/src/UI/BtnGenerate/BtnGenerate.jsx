import React from 'react'
import cl from './BtnGenerate.module.css'

import Server from '../../api/Server'

function BtnGenerate({colorText, children, nameProduct, setCategory}) {

  const sendDataToServer = async () => {
    const response = await Server.sendDataToServer({nameItem: nameProduct})
    setCategory(response.nameItem)
  }

  return (
    <button disabled={!nameProduct || nameProduct.length === 0} onClick={() => sendDataToServer()} className={cl.btnGenerate} style={{color: colorText}}>{children}</button>
  )
}

export default BtnGenerate