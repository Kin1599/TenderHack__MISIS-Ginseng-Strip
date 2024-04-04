import React from 'react'
import cl from './BtnGenerate.module.css'

import SendServer from '../../api/SendServer'

function BtnGenerate({colorText, children, nameProduct}) {

  return (
    <button disabled={!nameProduct || nameProduct.length === 0} onClick={() => SendServer.sendDataToServer(nameProduct)} className={cl.btnGenerate} style={{color: colorText}}>{children}</button>
  )
}

export default BtnGenerate