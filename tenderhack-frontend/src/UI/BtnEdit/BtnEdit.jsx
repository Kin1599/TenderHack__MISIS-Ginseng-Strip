import React from 'react'

import cl from './BtnEdit.module.css'

function BtnEdit({children, width, onClick}) {
  return (
    <a style={{width: width}} className={cl.btnEdit} onClick={onClick}>{children}</a>
  )
}

export default BtnEdit