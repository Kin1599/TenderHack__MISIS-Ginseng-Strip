import React from 'react'
import cl from './BtnGenerate.module.css'

import Server from '../../api/Server'

function BtnGenerate({colorText, children, nameProduct}) {

  return (
    <button disabled={!nameProduct || nameProduct.length === 0} onClick={() => Server.sendDataToServer(nameProduct)} className={cl.btnGenerate} style={{color: colorText}}>{children}</button>
  )
}

export default BtnGenerate