import React from 'react'
import cl from "./BtnPreview.module.css"
function BtnPreview({children, ...props}) {
  return (
    <a {...props} className={cl.btnPreview}>{children}</a>
  )
}

export default BtnPreview