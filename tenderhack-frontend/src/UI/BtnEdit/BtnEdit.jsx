import React from 'react'

import cl from './BtnEdit.module.css'

function BtnEdit({children, width}) {
  return (
    <a style={{width: width}} className={cl.btnEdit}>{children}</a>
  )
}

export default BtnEdit